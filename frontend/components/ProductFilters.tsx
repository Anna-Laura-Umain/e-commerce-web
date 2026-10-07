'use client'

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"


export type FilterOption = [
    label: string,
    value: string
]

export type FilterGroup = {
  key: string // name in the URL, e.g. "origin"
  label: string // heading above the checkboxes, e.g. "Origin"
  options: FilterOption[]
}

// Selected values per filter 
export type ActiveFilters = Record<string, string[]> 

export type ProductFiltersProps = {
    groups: FilterGroup[],
    active: ActiveFilters
} 
