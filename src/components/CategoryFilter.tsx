import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategories: string[];
  onToggleCategory: (categoryId: string) => void;
  onClearFilters: () => void;
}

const CategoryFilter = ({
  categories,
  selectedCategories,
  onToggleCategory,
  onClearFilters,
}: CategoryFilterProps) => {
  const getIcon = (iconName: string): LucideIcon => {
    return (Icons[iconName as keyof typeof Icons] as LucideIcon) || Icons.Tag;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-foreground">Filter nach Kategorie:</span>
        {categories.map((category) => {
          const Icon = getIcon(category.icon);
          const isSelected = selectedCategories.includes(category.id);
          
          return (
            <Badge
              key={category.id}
              variant={isSelected ? "default" : "outline"}
              className={`cursor-pointer px-4 py-2 transition-all hover:scale-105 ${
                isSelected 
                  ? "bg-gradient-primary border-0 shadow-md" 
                  : "hover:bg-secondary"
              }`}
              onClick={() => onToggleCategory(category.id)}
            >
              <Icon className="mr-2 h-4 w-4" />
              {category.name}
            </Badge>
          );
        })}
        
        {selectedCategories.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Alle Filter löschen
          </Button>
        )}
      </div>
      
      {selectedCategories.length > 0 && (
        <p className="text-sm text-muted-foreground">
          {selectedCategories.length} {selectedCategories.length === 1 ? "Kategorie" : "Kategorien"} ausgewählt
        </p>
      )}
    </div>
  );
};

export default CategoryFilter;
