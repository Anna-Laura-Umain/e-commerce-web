import {useSyncExternalStore} from 'react'

const subscribe = () => () => {}

// false on the server, true in the browser.
// Use it before reading data from localStorage to avoid hydration errors.
export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
}