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
  isInCart: boolean,
  setSpinner: (arg0: boolean) => void
) => {
  try {
    setSpinner(true)

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
  } finally {
    setSpinner(false)
  }
}

export const removeItemFromCart = async (
  itemId: number,
  setSpinner: (arg0: boolean) => void
) => {
  try {
    setSpinner(true)
    await removeFromCartFx(`/shopping-cart/one/${itemId}`)
    removeShoppingCart(itemId)
  } catch (error) {
    toast.error((error as Error).message)
  } finally {
    setSpinner(false)
  }
}

export const updateTotalPrice = async (total_price: number, itemId: number) => {
  const data = await updateCartItemFx({
    url: `/shopping-cart/total_price/${itemId}`,
    payload: { total_price },
  })

  updateCartItemTotalPrice({ itemId, total_price: data.total_price })
}
