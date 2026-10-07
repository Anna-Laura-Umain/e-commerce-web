'use client'

import {useRouter, useSearchParams} from 'next/navigation'
import {Checkbox} from '@/components/ui/checkbox'
import {Label} from '@/components/ui/label'

type FilterCheckboxProps = {
  id: string
  label: string
  checked: boolean
  onToggle: () => void
}

// One checkbox with a clickable label
function FilterCheckbox({id, label, checked, onToggle}: FilterCheckboxProps) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id={id} checked={checked} onCheckedChange={onToggle} />
      <Label htmlFor={id} className="cursor-pointer text-sm font-normal text-stone-700">
        {label}
      </Label>
    </div>
  )
}

type ProductFiltersProps = {
  origins: string[]
  levels: string[]
  levelLabel: string
}

export default function ProductFilters({origins, levels, levelLabel}: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

// Checks or unchecks one filter value in the URL, other filters stay as they are
function toggle(key: string, value: string) {
  const params = new URLSearchParams(searchParams.toString())

  if (params.has(key, value)) {
    params.delete(key, value)
  } else {
    params.append(key, value)
  }

  router.replace(`?${params.toString()}`, {scroll: false})
}

  const isChecked = (key: string, value: string) => searchParams.getAll(key).includes(value)

  return (
    <aside className="space-y-8">
      <fieldset>
        <legend className="text-xs font-medium uppercase tracking-[0.25em] text-amber-900/70">
          Origin
        </legend>
        <div className="mt-3 space-y-2">
          {origins.map((origin) => (
            <label key={origin} className="flex items-center gap-2 text-sm text-stone-700">
              <input
                type="checkbox"
                checked={isChecked('origin', origin)}
                onChange={() => toggle('origin', origin)}
                className="size-4 accent-stone-900"
              />
              {origin}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-xs font-medium uppercase tracking-[0.25em] text-amber-900/70">
          {levelLabel}
        </legend>
        <div className="mt-3 space-y-2">
          {levels.map((level) => (
            <label key={level} className="flex items-center gap-2 text-sm text-stone-700">
              <input
                type="checkbox"
                checked={isChecked('level', level)}
                onChange={() => toggle('level', level)}
                className="size-4 accent-stone-900"
              />
              {level}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="flex items-center gap-2 text-sm text-stone-700">
        <input
          type="checkbox"
          checked={isChecked('inStock', 'true')}
          onChange={() => toggle('inStock', 'true')}
          className="size-4 accent-stone-900"
        />
        In stock only
      </label>
    </aside>
  )
}