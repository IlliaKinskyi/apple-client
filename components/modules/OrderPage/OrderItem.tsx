import { IShoppingCartItem } from '@/types/shopping-cart'
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import { usePrice } from '@/hooks/usePrice'
import Link from 'next/link'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import CartItemCounter from '@/components/elements/CartItemCounter/CartItemCounter'
import { formatPrice } from '@/utils/common'
import styles from '@/styles/order/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const OrderItem = ({ item }: { item: IShoppingCartItem }) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const isMobile1160 = useMediaQuery(1160)
  const { price, spinner, increasePrice, decreasePrice, deleteCartItem } =
    usePrice(item.count, item.itemId, item.price)
  const spinnerDarkModeClass =
    mode === 'dark' ? '' : `${spinnerStyles.dark_mode}`

  return (
    <li className={styles.order__cart__list__item}>
      <div className={styles.order__cart__list__item__left}>
        <div className={styles.order__cart__list__item__left__inner}>
          <div className={styles.order__cart__list__item__img}>
            <img src={item.image} alt={item.name} />
          </div>
          <Link href={`/catalog/${item.id}`} legacyBehavior passHref>
            <a
              className={`${styles.order__cart__list__item__text} ${darkModeClass}`}
            >
              <span>
                {item.name.replace('.', '')}, {item.brand}
              </span>
            </a>
          </Link>
        </div>
        {isMobile1160 && item.quantity === 0 ? (
          <span className={styles.order__cart__list__item__empty}>
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
      </div>
      <div className={styles.order__cart__list__item__right}>
        {!isMobile1160 && item.quantity === 0 ? (
          <span className={styles.order__cart__list__item__empty}>
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
          className={`${styles.order__cart__list__item__price} ${darkModeClass}`}
        >
          ${formatPrice(price)}
        </span>
        <button
          className={styles.order__cart__list__item__delete}
          onClick={deleteCartItem}
        >
          {spinner ? (
            <span
              className={`${spinnerStyles.spinner} ${spinnerDarkModeClass}`}
              style={{ top: '-13px', left: '-30px', width: 25, height: 25 }}
            />
          ) : (
            'Delete'
          )}
        </button>
      </div>
    </li>
  )
}

export default OrderItem
