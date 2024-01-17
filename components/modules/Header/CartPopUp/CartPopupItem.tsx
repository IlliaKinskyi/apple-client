import { $mode } from '@/context/mode'
import { IShoppingCartItem } from '@/types/shopping-cart'
import { useStore } from 'effector-react'
import Link from 'next/link'
import DeleteSvg from '@/components/elements/DeleteSvg/DeleteSvg'
import { formatPrice } from '@/utils/common'
import CartItemCounter from '@/components/elements/CartItemCounter/CartItemCounter'
import { usePrice } from '@/hooks/usePrice'
import styles from '@/styles/cartPopUp/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const CartPopupItem = ({ item }: { item: IShoppingCartItem }) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const spinnerDarkModeClass =
    mode === 'dark' ? '' : `${spinnerStyles.dark_mode}`

  const { price, spinner, increasePrice, decreasePrice, deleteCartItem } =
    usePrice(item.count, item.itemId, item.price)

  return (
    <li className={styles.cart__popup__list__item}>
      <div className={styles.cart__popup__list__item__top}>
        <div className={styles.cart__popup__list__item__img}>
          <img src={item.image} alt={item.name} />
        </div>
        <Link href={`/catalog/${item.itemId}`} passHref legacyBehavior>
          <a
            className={`${styles.cart__popup__list__item__text} ${darkModeClass}`}
          >
            <span>
              {item.name.replace('.', '')}, {item.brand}
            </span>
          </a>
        </Link>
        <button onClick={deleteCartItem}>
          <span>
            {spinner ? (
              <span
                className={`${spinnerStyles.spinner} ${spinnerDarkModeClass}`}
                style={{ top: 0, left: 0, width: 20, height: 20 }}
              />
            ) : (
              <DeleteSvg />
            )}
          </span>
        </button>
      </div>
      <div className={styles.cart__popup__list__item__bottom}>
        {item.quantity === 0 ? (
          <span className={styles.cart__popup__list__item__empty}>
            Out of stock
          </span>
        ) : (
          <CartItemCounter
            totalCount={item.quantity}
            itemId={item.itemId}
            initialCount={item.count}
            increasePrice={increasePrice}
            decreasePrice={decreasePrice}
          />
        )}
        <span
          className={`${styles.cart__popup__list__item__price} ${darkModeClass}`}
        >
          ${formatPrice(price)}
        </span>
      </div>
    </li>
  )
}

export default CartPopupItem
