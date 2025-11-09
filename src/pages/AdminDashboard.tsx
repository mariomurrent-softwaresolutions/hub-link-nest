import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useConfig } from "@/contexts/ConfigContext";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Save, LogOut } from "lucide-react";

const AdminDashboard = () => {
  const { configData, refetch } = useConfig();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin, isLoading: authLoading, logout } = useAdminAuth();
  const [config, setConfig] = useState(configData?.config);
  const [categories, setCategories] = useState(configData?.categories || []);
  const [links, setLinks] = useState(configData?.links || []);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!configData?.config.adminEnabled) {
      navigate("/admin");
      return;
    }
    
    if (!authLoading && !isAdmin) {
      navigate("/admin");
    }
  }, [configData, authLoading, isAdmin, navigate]);

  useEffect(() => {
    const loadData = async () => {
      if (!isAdmin) return;

      try {
        const { data: siteConfig } = await supabase
          .from("site_config")
          .select("*")
          .single();

        if (siteConfig) {
          setConfig({
            adminEnabled: configData?.config.adminEnabled,
            companyName: siteConfig.company_name,
            companyTagline: siteConfig.company_tagline,
            welcomeMessage: siteConfig.welcome_message,
            logo: siteConfig.logo,
            theme: siteConfig.theme as any,
          });
        }

        const { data: categoriesData } = await supabase
          .from("categories")
          .select("*")
          .order("sort_order");

        if (categoriesData) {
          setCategories(categoriesData.map(cat => ({
            id: cat.id,
            name: cat.name,
            icon: cat.icon,
          })));
        }

        const { data: linksData } = await supabase
          .from("links")
          .select(`
            *,
            link_categories(category_id)
          `);

        if (linksData) {
          setLinks(linksData.map(link => ({
            id: link.id,
            title: link.title,
            description: link.description,
            url: link.url,
            image: link.image,
            categories: (link as any).link_categories?.map((lc: any) => lc.category_id) || [],
          })));
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, [isAdmin, configData]);

  const handleSaveConfig = async () => {
    if (!config) return;
    
    setIsSaving(true);
    try {
      const { data: existing } = await supabase
        .from("site_config")
        .select("id")
        .single();

      const configPayload = {
        company_name: config.companyName,
        company_tagline: config.companyTagline,
        welcome_message: config.welcomeMessage,
        logo: config.logo,
        theme: config.theme,
      };

      if (existing) {
        await supabase
          .from("site_config")
          .update(configPayload)
          .eq("id", existing.id);
      } else {
        await supabase
          .from("site_config")
          .insert(configPayload);
      }

      await supabase.from("categories").delete().neq("id", "00000000-0000-0000-0000-000000000000");
      
      for (let i = 0; i < categories.length; i++) {
        await supabase.from("categories").insert({
          id: categories[i].id,
          name: categories[i].name,
          icon: categories[i].icon,
          sort_order: i,
        });
      }

      await supabase.from("link_categories").delete().neq("link_id", "00000000-0000-0000-0000-000000000000");
      await supabase.from("links").delete().neq("id", "00000000-0000-0000-0000-000000000000");

      for (const link of links) {
        await supabase.from("links").insert({
          id: link.id,
          title: link.title,
          description: link.description,
          url: link.url,
          image: link.image,
        });

        if (link.categories && link.categories.length > 0) {
          const linkCategories = link.categories.map(catId => ({
            link_id: link.id,
            category_id: catId,
          }));
          await supabase.from("link_categories").insert(linkCategories);
        }
      }

      await refetch();
      
      toast({
        title: "Saved",
        description: "Configuration saved successfully",
      });
    } catch (error: any) {
      console.error("Save error:", error);
      toast({
        title: "Save Failed",
        description: error.message || "Could not save configuration",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddCategory = () => {
    const newCategory = {
      id: `cat-${Date.now()}`,
      name: "New Category",
      icon: "Folder",
    };
    setCategories([...categories, newCategory]);
  };

  const handleRemoveCategory = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  const handleUpdateCategory = (id: string, field: string, value: string) => {
    setCategories(
      categories.map((cat) =>
        cat.id === id ? { ...cat, [field]: value } : cat
      )
    );
  };

  const handleAddLink = () => {
    const newLink = {
      id: `link-${Date.now()}`,
      title: "New Link",
      description: "Description",
      url: "https://example.com",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=250&fit=crop",
      categories: [],
    };
    setLinks([...links, newLink]);
  };

  const handleRemoveLink = (id: string) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  const handleUpdateLink = (id: string, field: string, value: any) => {
    setLinks(
      links.map((link) =>
        link.id === id ? { ...link, [field]: value } : link
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-2">
            <Button onClick={handleSaveConfig} className="gap-2" disabled={isSaving}>
              <Save className="h-4 w-4" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
            <Button variant="outline" onClick={() => navigate("/")}>
              View Site
            </Button>
            <Button variant="outline" onClick={logout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="links">Links</TabsTrigger>
            <TabsTrigger value="theme">Theme</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure basic intranet information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={config?.companyName}
                    onChange={(e) =>
                      setConfig({ ...config!, companyName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyTagline">Company Tagline</Label>
                  <Input
                    id="companyTagline"
                    value={config?.companyTagline}
                    onChange={(e) =>
                      setConfig({ ...config!, companyTagline: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="welcomeMessage">Welcome Message</Label>
                  <Input
                    id="welcomeMessage"
                    value={config?.welcomeMessage}
                    onChange={(e) =>
                      setConfig({ ...config!, welcomeMessage: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logo">Logo Icon</Label>
                  <Input
                    id="logo"
                    value={config?.logo}
                    onChange={(e) =>
                      setConfig({ ...config!, logo: e.target.value })
                    }
                    placeholder="Lucide icon name (e.g., Building2)"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Categories</h2>
              <Button onClick={handleAddCategory} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Category
              </Button>
            </div>
            <div className="grid gap-4">
              {categories.map((category) => (
                <Card key={category.id}>
                  <CardContent className="pt-6">
                    <div className="flex gap-4 items-end">
                      <div className="flex-1 space-y-2">
                        <Label>Name</Label>
                        <Input
                          value={category.name}
                          onChange={(e) =>
                            handleUpdateCategory(
                              category.id,
                              "name",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <Label>Icon</Label>
                        <Input
                          value={category.icon}
                          onChange={(e) =>
                            handleUpdateCategory(
                              category.id,
                              "icon",
                              e.target.value
                            )
                          }
                          placeholder="Lucide icon name"
                        />
                      </div>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleRemoveCategory(category.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="links" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Links</h2>
              <Button onClick={handleAddLink} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Link
              </Button>
            </div>
            <div className="grid gap-4">
              {links.map((link) => (
                <Card key={link.id}>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Title</Label>
                          <Input
                            value={link.title}
                            onChange={(e) =>
                              handleUpdateLink(link.id, "title", e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>URL</Label>
                          <Input
                            value={link.url}
                            onChange={(e) =>
                              handleUpdateLink(link.id, "url", e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={link.description}
                          onChange={(e) =>
                            handleUpdateLink(
                              link.id,
                              "description",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Image URL</Label>
                        <Input
                          value={link.image}
                          onChange={(e) =>
                            handleUpdateLink(link.id, "image", e.target.value)
                          }
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemoveLink(link.id)}
                          className="gap-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          Remove Link
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="theme" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Theme Colors</CardTitle>
                <CardDescription>
                  Configure your intranet's color scheme (HSL format)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Primary</Label>
                    <Input
                      value={config?.theme.primary}
                      onChange={(e) =>
                        setConfig({
                          ...config!,
                          theme: { ...config!.theme, primary: e.target.value },
                        })
                      }
                      placeholder="217 91% 60%"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Accent</Label>
                    <Input
                      value={config?.theme.accent}
                      onChange={(e) =>
                        setConfig({
                          ...config!,
                          theme: { ...config!.theme, accent: e.target.value },
                        })
                      }
                      placeholder="189 94% 43%"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
