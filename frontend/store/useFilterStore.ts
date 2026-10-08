import {create} from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'

type FilterStore = {
  // Last selected filters per catalog page, e.g. {coffee: "origin=Kenya&level=Dark"}
  savedQueries: Record<string, string>
  saveQuery: (page: string, query: string) => void
}

export const useFilterStore = create<FilterStore>()(
  persist(
    (set) => ({
      savedQueries: {},
      saveQuery: (page, query) =>
        set((state) => ({savedQueries: {...state.savedQueries, [page]: query}})),
    }),
    {
      name: 'leaf-bean-filters',
      // Kept while the tab is open, a new visit starts with a clean catalog
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)