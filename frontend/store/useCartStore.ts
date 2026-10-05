import {create} from 'zustand'
import {persist} from 'zustand/middleware'

export type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
}

type CartState = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeItem: (id: string) => void
  setQuantity: (id: string, quantity: number) => void
  clear: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      // If the product is already in the cart, increase its quantity
      addItem: (item, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? {...i, quantity: i.quantity + quantity} : i,
              ),
            }
          }
          return {items: [...state.items, {...item, quantity}]}
        }),

      removeItem: (id) =>
        set((state) => ({items: state.items.filter((i) => i.id !== id)})),

      // Quantity 0 or less removes the item
      setQuantity: (id, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.id !== id)
              : state.items.map((i) => (i.id === id ? {...i, quantity} : i)),
        })),

      clear: () => set({items: []}),
    }),
    {name: 'leaf-bean-cart'}, // key in localStorage
  ),
)