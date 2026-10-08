'use client'

import {useEffect, useOptimistic, useState, useTransition} from 'react'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import {SlidersHorizontal} from 'lucide-react'
import {FilterCheckbox} from '@/components/FilterCheckbox'
import {Button, buttonVariants} from '@/components/ui/button'
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from '@/components/ui/sheet'
import {useFilterStore} from '@/store/useFilterStore'
import type {FilterGroup} from '@/lib/filters'

type ProductFiltersProps = {
  groups: FilterGroup[]
  page: string // which catalog the filters belong to, e.g. "coffee"
}

export function ProductFilters({groups, page}: ProductFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const savedQuery = useFilterStore((state) => state.savedQueries[page] ?? '')
  const saveQuery = useFilterStore((state) => state.saveQuery)

  // Coming back to the page without filters in the URL: restore the last selection
  useEffect(() => {
    if (searchParams.toString() === '' && savedQuery !== '') {
      router.replace(`?${savedQuery}`, {scroll: false})
    }
  }, [searchParams, savedQuery, router])

  // Shows the new selection right away, before the server has re-rendered the page
  const [optimisticQuery, setOptimisticQuery] = useOptimistic(searchParams.toString())
  const selected = new URLSearchParams(optimisticQuery)
const hasSelection = optimisticQuery !== ''

  // Saves the selection and puts it in the URL. An empty selection gives a clean URL.
  function applyQuery(nextQuery: string) {
    saveQuery(page, nextQuery)

    startTransition(() => {
      setOptimisticQuery(nextQuery)
      router.replace(nextQuery ? `?${nextQuery}` : pathname, {scroll: false})
    })
  }

  // Checks or unchecks one filter value, other filters stay as they are
  function toggle(key: string, value: string) {
    const params = new URLSearchParams(optimisticQuery)

    if (params.has(key, value)) {
      params.delete(key, value)
    } else {
      params.append(key, value)
    }

    applyQuery(params.toString())
  }

  // The same filter list is shown in the sheet on mobile and in the column on larger screens.
  // The prefix keeps checkbox ids unique, because both lists can be in the page at once.
  function renderFilters(idPrefix: string) {
    return (
      <div className={`space-y-8 transition-opacity ${isPending ? 'opacity-60' : ''}`}>
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
                  id={`${idPrefix}-${group.key}-${option.value}`.replaceAll(' ', '-')}
                  label={option.label}
                  checked={selected.has(group.key, option.value)}
                  onToggle={() => toggle(group.key, option.value)}
                />
              ))}
            </div>
          </fieldset>
        ))}

        {hasSelection && (
          <button
            type="button"
            onClick={() => applyQuery('')}
            className="text-sm text-stone-600 underline underline-offset-4 hover:text-stone-900"
          >
            Clear all
          </button>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Mobile: filters open in a sheet */}
      <div className="md:hidden text-center">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger className={buttonVariants({variant: 'outline'})}>
            <SlidersHorizontal/>
            Filters{hasSelection}
          </SheetTrigger>

          <SheetContent side="left" className="w-80 overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="px-4 pb-6">
              {renderFilters('mobile')}
              <Button className="mt-8 w-full" onClick={() => setIsSheetOpen(false)}>
                Show results
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Tablet and desktop: filters in the left column */}
      <aside className="hidden md:block">{renderFilters('desktop')}</aside>
    </>
  )
}