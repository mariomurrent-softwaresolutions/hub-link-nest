import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative w-full max-w-2xl">
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Nach Links suchen..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-14 pl-12 pr-4 text-base shadow-md transition-shadow focus:shadow-lg"
      />
    </div>
  );
};

export default SearchBar;
