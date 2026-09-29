import { formatCategory } from "../utils/format";

interface CategoryFilterProps {
  categories: string[];
  value: string;
  onChange: (value: string) => void;
}

export function CategoryFilter({ categories, value, onChange }: CategoryFilterProps) {
  return (
    <div className="aisle-list">
      <button
        type="button"
        className={`aisle-option${value === "all" ? " is-selected" : ""}`}
        aria-pressed={value === "all"}
        onClick={() => onChange("all")}
      >
        All groceries
      </button>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`aisle-option${value === category ? " is-selected" : ""}`}
          aria-pressed={value === category}
          onClick={() => onChange(category)}
        >
          {formatCategory(category)}
        </button>
      ))}
    </div>
  );
}
