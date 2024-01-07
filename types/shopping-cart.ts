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
