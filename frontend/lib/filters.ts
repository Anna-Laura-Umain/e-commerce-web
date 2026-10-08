import { getProductLevel } from "@/lib/utils";
import type { Product } from "@/types/product";

export type SearchParams = Record<string, string | string[] | undefined>;
export type FilterField = "origin" | "level" | "inStock";
export type FilterSetting = { field: FilterField; label: string }; // One group as the editor set it up in Studio

export type FilterOption = {
  label: string;
  value: string;
};

// One group, ready to be shown by ProductFilters
export type FilterGroup = {
  key: string; // name in the URL, e.g. "origin"
  label: string; // heading set by the editor in Studio
  options: FilterOption[];
};

// What the visitor selected, read from the URL
export type SelectedFilters = {
  origins: string[];
  levels: string[];
  inStockOnly: boolean;
};

const knownFields: FilterField[] = ["origin", "level", "inStock"];

// A URL value can be missing, a single string, or several strings
function toArray(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

// Unique non-empty values as filter options, A-Z sorted
function toOptions(values: (string | null | undefined)[]): FilterOption[] {
  const filled = values.filter((value): value is string => Boolean(value));
  const uniqueSorted = [...new Set(filled)].sort();
  return uniqueSorted.map((value) => ({ label: value, value }));
}

// deafault data for filters (if nothing added via Sanity)
// Keep in sync with studio/scripts/seed-shop-filters.ts
function getFallbackSettings(isCoffee: boolean): FilterSetting[] {
  return [
    { field: "inStock", label: "Availability" },
    { field: "origin", label: "Origin" },
    { field: "level", label: isCoffee ? "Roast level" : "Oxidation level" },
  ];
}

// Groups from Studio, skipping half-filled or unknown rows. Falls back to the defaults.
export function getFilterSettings(
  saved: { field?: string | null; label?: string | null }[] | null | undefined,
  isCoffee: boolean
): FilterSetting[] {
  const valid = (saved ?? []).filter(
    (setting): setting is FilterSetting =>
      Boolean(setting.label) &&
      knownFields.includes(setting.field as FilterField)
  );
  return valid.length > 0 ? valid : getFallbackSettings(isCoffee);
}

// Adds options to each group. Options always come from the products.
export function buildFilterGroups(
  products: Product[],
  settings: FilterSetting[]
): FilterGroup[] {
  const optionsByField: Record<FilterField, FilterOption[]> = {
    origin: toOptions(products.map((p) => p.origin)),
    level: toOptions(products.map(getProductLevel)),
    inStock: [{ label: "In stock only", value: "true" }],
  };

  return settings.map((setting) => ({
    key: setting.field,
    label: setting.label,
    options: optionsByField[setting.field],
  }));
}

// Reads the selected filters from the URL
export function readFilters(searchParams: SearchParams): SelectedFilters {
  return {
    origins: toArray(searchParams.origin),
    levels: toArray(searchParams.level),
    inStockOnly: searchParams.inStock === "true",
  };
}

// Inside one filter: any selected value matches. Between filters: all must match.
export function filterProducts(
  products: Product[],
  selected: SelectedFilters
): Product[] {
  const { origins, levels, inStockOnly } = selected;

  return products.filter(
    (p) =>
      (origins.length === 0 || origins.includes(p.origin)) &&
      (levels.length === 0 || levels.includes(getProductLevel(p))) &&
      (!inStockOnly || p.available)
  );
}
