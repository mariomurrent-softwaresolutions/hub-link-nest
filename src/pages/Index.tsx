import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import LinkCard from "@/components/LinkCard";
import linksData from "@/data/links.json";
import { useTheme } from "@/hooks/useTheme";

interface Link {
  id: string;
  title: string;
  description: string;
  url: string;
  image: string;
  categories: string[];
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

const Index = () => {
  useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories: Category[] = linksData.categories;
  const allLinks: Link[] = linksData.links;

  const filteredLinks = useMemo(() => {
    return allLinks.filter((link) => {
      const matchesSearch =
        searchQuery === "" ||
        link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        link.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.some((categoryId) =>
          link.categories.includes(categoryId)
        );

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategories, allLinks]);

  const handleToggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
            Schnellzugriff auf alle wichtigen Tools
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Finden Sie schnell die richtigen Anwendungen und Ressourcen für Ihre tägliche Arbeit
          </p>
          
          <div className="flex justify-center">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        </section>

        {/* Category Filter */}
        <section className="mb-8">
          <CategoryFilter
            categories={categories}
            selectedCategories={selectedCategories}
            onToggleCategory={handleToggleCategory}
            onClearFilters={handleClearFilters}
          />
        </section>

        {/* Links Grid */}
        <section>
          {filteredLinks.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredLinks.map((link) => (
                <LinkCard
                  key={link.id}
                  title={link.title}
                  description={link.description}
                  url={link.url}
                  image={link.image}
                />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-xl text-muted-foreground">
                Keine Links gefunden. Versuchen Sie einen anderen Suchbegriff oder Filter.
              </p>
            </div>
          )}
        </section>

        {/* Results Count */}
        {filteredLinks.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              {filteredLinks.length} {filteredLinks.length === 1 ? "Link" : "Links"} gefunden
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
