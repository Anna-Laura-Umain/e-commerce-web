'use client'

import {useOptimistic, useTransition} from 'react'
import {useRouter, useSearchParams} from 'next/navigation'
import {FilterCheckbox} from '@/components/FilterCheckbox'

export type FilterOption = {
  label: string
  value: string
}

export type FilterGroup = {
  key: string // name in the URL, e.g. "origin"
  label: string // heading set by the editor in Studio
  options: FilterOption[]
}

type ProductFiltersProps = {
  groups: FilterGroup[]
}

export default function ProductFilters({groups}: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  // Shows the new selection right away, before the server has re-rendered the page
  const [optimisticQuery, setOptimisticQuery] = useOptimistic(searchParams.toString())
  const selected = new URLSearchParams(optimisticQuery)

  // Checks or unchecks one filter value in the URL, other filters stay as they are
  function toggle(key: string, value: string) {
    const params = new URLSearchParams(optimisticQuery)

    if (params.has(key, value)) {
      params.delete(key, value)
    } else {
      params.append(key, value)
    }

    const nextQuery = params.toString()

    startTransition(() => {
      setOptimisticQuery(nextQuery)
      router.replace(`?${nextQuery}`, {scroll: false})
    })
  }

  return (
    <aside className={`space-y-8 transition-opacity ${isPending ? 'opacity-60' : ''}`}>
      {groups.map((group) => (
        <fieldset key={group.key}>
          <legend className="text-xs font-medium uppercase tracking-[0.25em] text-amber-900/70">
            {group.label}
          </legend>
          <div className="mt-3 space-y-2">
            {group.options.map((option) => (
              <FilterCheckbox
                key={option.value}
                // HTML ids can't contain spaces, e.g. "Costa Rica"
                id={`${group.key}-${option.value}`.replaceAll(' ', '-')}
                label={option.label}
                checked={selected.has(group.key, option.value)}
                onToggle={() => toggle(group.key, option.value)}
              />
            ))}
          </div>
        </fieldset>
      ))}
    </aside>
  )
}