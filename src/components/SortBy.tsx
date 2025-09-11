import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SortByProps {
  value: string;
  onChange: (value: string) => void;
}

export const SortBy = ({ value, onChange }: SortByProps) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select sort order" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="rank">Top</SelectItem>
          <SelectItem value="members">Most members</SelectItem>
          <SelectItem value="price_asc">Price: Low to High</SelectItem>
          <SelectItem value="price_desc">Price: High to Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};