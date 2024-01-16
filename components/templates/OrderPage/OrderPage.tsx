import { $mode } from '@/context/mode'
import { $shoppingCart, $totalPrice } from '@/context/shopping-cart'
import { formatPrice } from '@/utils/common'
import { useStore } from 'effector-react'
import styles from '@/styles/order/index.module.scss'

const OrderPage = () => {
  const mode = useStore($mode)
  const shoppingCart = useStore($shoppingCart)
  const totalPrice = useStore($totalPrice)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <section className={styles.order}>
      <div className="container">
        <h2 className={`${styles.order__title} ${darkModeClass}`}>
          Placing an order
        </h2>
        <div className={styles.order__inner}>
          <div className={styles.order__cart}>
            <div></div>
          </div>
          <div className={styles.order__pay}>
            <h3 className={styles.order__pay__title}>Total</h3>
            <div className={`${styles.order__pay__inner} ${darkModeClass}`}>
              <div className={styles.order__pay__goods}>
                <span>
                  Products (
                  {shoppingCart.reduce(
                    (defaultCount, item) => defaultCount + item.count,
                    0
                  )}
                  )
                </span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className={styles.order__pay__total}>
                <span>For the amount</span>
                <span className={darkModeClass}>{formatPrice(totalPrice)}</span>
              </div>
              <button>Confirm order</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OrderPage
