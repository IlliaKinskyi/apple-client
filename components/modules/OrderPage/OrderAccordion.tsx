import { $mode } from '@/context/mode'
import { IOrderAccordionProps } from '@/types/order'
import { useStore } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'
import DoneSvg from '@/components/elements/DoneSvg/DoneSvg'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import EditSvg from '@/components/elements/EditSvg/EditSvg'
import { useState } from 'react'
import { $shoppingCart } from '@/context/shopping-cart'
import CartPopupItem from '../Header/CartPopUp/CartPopupItem'
import styles from '@/styles/order/index.module.scss'

const OrderAccordion = ({
  setOrderIsReady,
  showDoneIcon,
}: IOrderAccordionProps) => {
  const mode = useStore($mode)
  const shoppingCart = useStore($shoppingCart)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const isMobile550 = useMediaQuery(550)

  const [expanded, setExpanded] = useState(false)

  const toggleAccordion = () => setExpanded(!expanded)

  return (
    <>
      <motion.div
        initial={false}
        className={`${styles.order__cart__title} ${darkModeClass}`}
      >
        <h3 className={`${styles.order__cart__title__text} ${darkModeClass}`}>
          {showDoneIcon && (
            <span>
              <DoneSvg />
            </span>
          )}
          Cart
        </h3>
        <button
          className={styles.order__cart__title__btn}
          onClick={toggleAccordion}
        >
          <span>
            <EditSvg />
          </span>
          {isMobile550 ? '' : 'Edit'}
        </button>
      </motion.div>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            style={{ overflow: 'hidden' }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className={`${styles.order__cart__content} ${darkModeClass}`}>
              <ul className={styles.order__cart__list}>
                {shoppingCart.length ? (
                  shoppingCart.map((item) =>
                    isMobile550 ? (
                      <CartPopupItem key={item.id} item={item} />
                    ) : (
                      <div />
                    )
                  )
                ) : (
                  <li className={styles.order__cart__empty}>
                    <span
                      className={`${styles.order__cart__empty__text} ${darkModeClass}`}
                    >
                      Cart is empty
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default OrderAccordion
