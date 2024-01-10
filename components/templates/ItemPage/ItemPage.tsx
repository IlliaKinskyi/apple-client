import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import { $item } from '@/context/item'
import ItemImagesList from '@/components/modules/ItemPage/ItemImagesList'
import { formatPrice } from '@/utils/common'
import { $shoppingCart } from '@/context/shopping-cart'
import { useState } from 'react'
import CartHoverCheckedSvg from '@/components/elements/CartHoverCheckedSvg/CartHoverCheckedSvg'
import CartHoverSvg from '@/components/elements/CartHoverSvg/CartHoverSvg'
import styles from '@/styles/item/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { toggleCartItem } from '@/utils/shopping-cart'
import { $user } from '@/context/user'

const ItemPage = () => {
  const mode = useStore($mode)
  const user = useStore($user)
  const item = useStore($item)
  const shoppingCart = useStore($shoppingCart)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const isInCart = shoppingCart.some((product) => product.itemId === item.id)
  const [spinnerToggleCart, setSpinnerToggleCart] = useState(false)

  const toggleToCart = () =>
    toggleCartItem(user.username, item.id, isInCart, setSpinnerToggleCart)

  return (
    <section>
      <div className="container">
        <div className={`${styles.item__top} ${darkModeClass}`}>
          <h2>{item.name}</h2>
          <div className={styles.item__inner}>
            <ItemImagesList />
            <div className={styles.item__info}>
              <span className={`${styles.item__info__price} ${darkModeClass}`}>
                ${formatPrice(item.price || 0)}
              </span>
              <span className={styles.item__info__stock}>
                {item.quantity > 0 ? (
                  <span className={styles.item__info__stock__success}>
                    In stock
                  </span>
                ) : (
                  <span className={styles.item__info__stock__not}>
                    Out of stock
                  </span>
                )}
              </span>
              <span className={styles.item__info__code}>
                Vendor code: {item.vendor_code}
              </span>
              <button
                className={`${styles.item__info__btn} ${
                  isInCart ? styles.in_cart : ''
                }`}
                onClick={toggleToCart}
              >
                {spinnerToggleCart ? (
                  <span
                    className={spinnerStyles.spinner}
                    style={{ top: 10, left: '45%' }}
                  />
                ) : (
                  <>
                    <span>
                      {isInCart ? <CartHoverCheckedSvg /> : <CartHoverSvg />}
                    </span>
                    {isInCart ? (
                      <span>Added to cart</span>
                    ) : (
                      <span>Add to cart</span>
                    )}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ItemPage
