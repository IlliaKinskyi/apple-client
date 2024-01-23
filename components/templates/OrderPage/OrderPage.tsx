import { $mode } from '@/context/mode'
import {
  $shoppingCart,
  $totalPrice,
  setShoppingCart,
} from '@/context/shopping-cart'
import { formatPrice } from '@/utils/common'
import { useStore } from 'effector-react'
import OrderAccordion from '@/components/modules/OrderPage/OrderAccordion'
import { useState } from 'react'
import styles from '@/styles/order/index.module.scss'

const OrderPage = () => {
  const mode = useStore($mode)
  const shoppingCart = useStore($shoppingCart)
  const totalPrice = useStore($totalPrice)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const [orderIsReady, setOrderIsReady] = useState(false)
  const [agreement, setAgreement] = useState(false)

  const handleAgreementChange = () => setAgreement(!agreement)

  const makeOrder = () => {
    setShoppingCart([])
  }

  return (
    <section className={styles.order}>
      <div className="container">
        <h2 className={`${styles.order__title} ${darkModeClass}`}>
          Placing an order
        </h2>
        <div className={styles.order__inner}>
          <div className={styles.order__cart}>
            <OrderAccordion
              setOrderIsReady={setOrderIsReady}
              showDoneIcon={orderIsReady}
            />
          </div>
          <div className={styles.order__pay}>
            <h3 className={`${styles.order__pay__title} ${darkModeClass}`}>
              Total
            </h3>
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
                <span>${formatPrice(totalPrice)}</span>
              </div>
              <div className={styles.order__pay__total}>
                <span>For the amount</span>
                <span className={darkModeClass}>
                  ${formatPrice(totalPrice)}
                </span>
              </div>
              <button
                disabled={!(orderIsReady && agreement)}
                className={styles.order__pay__btn}
                onClick={makeOrder}
              >
                Confirm order
              </button>
              <label
                className={`${styles.order__pay__rights} ${darkModeClass}`}
              >
                <input
                  className={styles.order__pay__rights__input}
                  type="checkbox"
                  onChange={handleAgreementChange}
                  checked={agreement}
                />
                <span className={styles.order__pay__rights__text}>
                  <strong>I agree with the terms</strong> Rules for using the
                  trading platform and return rules
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OrderPage
