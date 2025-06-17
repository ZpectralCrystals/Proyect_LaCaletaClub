import { Input } from "@/components/ui/input";

interface ProductSearchBarProps {
  search: string;
  setSearch: (value: string) => void;
}

export function ProductSearchBar({ search, setSearch }: ProductSearchBarProps) {
  return (
    <div className="mb-4">
      <Input
        type="text"
        placeholder="Buscar producto por nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}