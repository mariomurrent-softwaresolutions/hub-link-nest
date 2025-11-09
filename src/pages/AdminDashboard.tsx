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
import { Plus, Trash2, Save } from "lucide-react";

const AdminDashboard = () => {
  const { configData } = useConfig();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [config, setConfig] = useState(configData?.config);
  const [categories, setCategories] = useState(configData?.categories || []);
  const [links, setLinks] = useState(configData?.links || []);

  useEffect(() => {
    if (!configData?.config.adminEnabled) {
      navigate("/admin");
    }
  }, [configData, navigate]);

  const handleSaveConfig = async () => {
    try {
      // TODO: Implement save to database via edge function
      toast({
        title: "Backend Required",
        description: "Enable Lovable Cloud to save configuration changes",
        variant: "destructive",
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Could not save configuration",
        variant: "destructive",
      });
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
            <Button onClick={handleSaveConfig} className="gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
            <Button variant="outline" onClick={() => navigate("/")}>
              View Site
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
