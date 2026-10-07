'use client'

import {useRouter, useSearchParams} from 'next/navigation'
import {FilterCheckbox} from '@/components/FilterCheckbox'

type ProductFiltersProps = {
  origins: string[]
  levels: string[]
  levelLabel: string
}

export function ProductFilters({origins, levels, levelLabel}: ProductFiltersProps) {
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

  const isChecked = (key: string, value: string) => searchParams.has(key, value)

  return (
    <aside className="space-y-8">
      <fieldset>
        <legend className="text-xs font-medium uppercase tracking-[0.25em] text-amber-900/70">
          Origin
        </legend>
        <div className="mt-3 space-y-2">
          {origins.map((origin) => (
            <FilterCheckbox
              key={origin}
              id={`origin-${origin}`}
              label={origin}
              checked={isChecked('origin', origin)}
              onToggle={() => toggle('origin', origin)}
            />
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-xs font-medium uppercase tracking-[0.25em] text-amber-900/70">
          {levelLabel}
        </legend>
        <div className="mt-3 space-y-2">
          {levels.map((level) => (
            <FilterCheckbox
              key={level}
              id={`level-${level}`}
              label={level}
              checked={isChecked('level', level)}
              onToggle={() => toggle('level', level)}
            />
          ))}
        </div>
      </fieldset>

      <FilterCheckbox
        id="in-stock"
        label="In stock only"
        checked={isChecked('inStock', 'true')}
        onToggle={() => toggle('inStock', 'true')}
      />
    </aside>
  )
}