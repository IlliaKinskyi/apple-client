import { IShoppingCartItem } from '@/types/shopping-cart'
import { createDomain } from 'effector-next'

const shoppingCart = createDomain()

export const setShoppingCart = shoppingCart.createEvent<IShoppingCartItem[]>()
export const updateShoppingCart = shoppingCart.createEvent<IShoppingCartItem>()
export const removeShoppingCart = shoppingCart.createEvent<number>()
export const setTotalPrice = shoppingCart.createEvent<number>()
export const updateCartItemTotalPrice = shoppingCart.createEvent<{
  itemId: number
  total_price: number
}>()
export const updateCartItemCount = shoppingCart.createEvent<{
  itemId: number
  count: number
}>()

const remove = (cartItems: IShoppingCartItem[], itemId: number) =>
  cartItems.filter((item) => item.itemId !== itemId)

function updateCartItem<T>(
  cartItems: IShoppingCartItem[],
  itemId: number,
  payload: T
) {
  return cartItems.map((item) => {
    if (item.itemId === itemId) {
      return {
        ...item,
        ...payload,
      }
    }
    return item
  })
}

export const $shoppingCart = shoppingCart
  .createStore<IShoppingCartItem[]>([])
  .on(setShoppingCart, (_, shoppingCart) => shoppingCart)
  .on(updateShoppingCart, (state, cartItem) => [...state, cartItem])
  .on(removeShoppingCart, (state, itemId) => [...remove(state, itemId)])
  .on(updateCartItemTotalPrice, (state, { itemId, total_price }) => [
    ...updateCartItem(state, itemId, { total_price }),
  ])
  .on(updateCartItemCount, (state, { itemId, count }) => [
    ...updateCartItem(state, itemId, { count }),
  ])

export const $totalPrice = shoppingCart
  .createStore<number>(0)
  .on(setTotalPrice, (_, value) => value)
