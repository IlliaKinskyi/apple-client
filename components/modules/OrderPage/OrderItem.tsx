import { IShoppingCartItem } from '@/types/shopping-cart'
import styles from '@/styles/order/index.module.scss'
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import { usePrice } from '@/hooks/usePrice'

const OrderItem = ({ item }: { item: IShoppingCartItem }) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const { price, spinner, increasePrice, decreasePrice, deleteCartItem } =
    usePrice(item.count, item.itemId, item.price)

  return <li></li>
}

export default OrderItem
