export interface IShoppingCartItem {
  id: number
  userId: number
  itemId: number
  brand: string
  price: number
  name: string
  image: string
  quantity: number
  count: number
  total_price: number
}

export interface IAddToCartFx {
  url: string
  username: string
  itemId: number
}

export interface IUpdateCartItemFx {
  url: string
  payload: {
    total_price?: number
    count?: number
  }
}

export interface ICartItemCounterProps {
  totalCount: number
  itemId: number
  initialCount: number
  increasePrice: VoidFunction
  decreasePrice: VoidFunction
}
