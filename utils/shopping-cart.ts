import {
  addToCartFx,
  removeFromCartFx,
  updateCartItemFx,
} from '@/app/api/shopping-cart'
import {
  removeShoppingCart,
  updateCartItemTotalPrice,
  updateShoppingCart,
} from '@/context/shopping-cart'
import { toast } from 'react-toastify'

export const toggleCartItem = async (
  username: string,
  itemId: number,
  isInCart: boolean
) => {
  try {
    if (isInCart) {
      await removeFromCartFx(`/shopping-cart/one/${itemId}`)
      removeShoppingCart(itemId)
      return
    }

    const data = await addToCartFx({
      url: '/shopping-cart/add',
      username,
      itemId,
    })

    updateShoppingCart(data)
  } catch (error) {
    toast.error((error as Error).message)
  }
}

export const removeItemFromCart = async (itemId: number) => {
  try {
    await removeFromCartFx(`/shopping-cart/one/${itemId}`)
    removeShoppingCart(itemId)
  } catch (error) {
    toast.error((error as Error).message)
  }
}

export const updateTotalPrice = async (total_price: number, itemId: number) => {
  const data = await updateCartItemFx({
    url: `/shopping-cart/total_price/${itemId}`,
    payload: { total_price },
  })

  updateCartItemTotalPrice({ itemId, total_price: data.total_price })
}
