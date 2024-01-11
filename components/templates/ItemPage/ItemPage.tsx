import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import { $item } from '@/context/item'
import ItemImagesList from '@/components/modules/ItemPage/ItemImagesList'
import { formatPrice } from '@/utils/common'
import { $shoppingCart } from '@/context/shopping-cart'
import { useEffect, useState } from 'react'
import CartHoverCheckedSvg from '@/components/elements/CartHoverCheckedSvg/CartHoverCheckedSvg'
import CartHoverSvg from '@/components/elements/CartHoverSvg/CartHoverSvg'
import { toggleCartItem } from '@/utils/shopping-cart'
import { $user } from '@/context/user'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import ItemTabs from '@/components/modules/ItemPage/ItemTabs'
import DashboardSlider from '@/components/modules/DashboardPage/DashboardSlider'
import { toast } from 'react-toastify'
import { getItemsFx } from '@/app/api/items'
import { $items, setItems, setItemsByPopularity } from '@/context/items'
import ItemAccordion from '@/components/modules/ItemPage/ItemAccordion'
import styles from '@/styles/item/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const ItemPage = () => {
  const mode = useStore($mode)
  const user = useStore($user)
  const item = useStore($item)
  const items = useStore($items)
  const shoppingCart = useStore($shoppingCart)
  const isMobile = useMediaQuery(850)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const isInCart = shoppingCart.some((product) => product.itemId === item.id)
  const [spinnerToggleCart, setSpinnerToggleCart] = useState(false)
  const [spinnerSlider, setSpinnerSlider] = useState(false)

  const toggleToCart = () =>
    toggleCartItem(user.username, item.id, isInCart, setSpinnerToggleCart)

  useEffect(() => {
    loadItems()
  }, [])

  const loadItems = async () => {
    try {
      setSpinnerSlider(true)
      const data = await getItemsFx('/items?limit=20&offset=0')

      setItems(data)
      setItemsByPopularity()
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setTimeout(() => setSpinnerSlider(false), 1000)
    }
  }

  return (
    <section>
      <div className="container">
        <div className={`${styles.item__top} ${darkModeClass}`}>
          <h2 className={`${styles.item__title} ${darkModeClass}`}>
            {item.name}
          </h2>
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
              {!isMobile && <ItemTabs />}
            </div>
          </div>
        </div>
        {isMobile && (
          <div className={styles.item__accordion}>
            <div className={styles.item__accordion__inner}>
              <ItemAccordion title="Description">
                <div
                  className={`${styles.item__accordion__content} ${darkModeClass}`}
                >
                  <h3
                    className={`${styles.item__tabs__content__title} ${darkModeClass}`}
                  >
                    {item.name}
                  </h3>
                  <p
                    className={`${styles.item__tabs__content__text} ${darkModeClass}`}
                  >
                    {item.description}
                  </p>
                </div>
              </ItemAccordion>
            </div>
            <ItemAccordion title="Technical Specifications ">
              <div
                className={`${styles.item__accordion__content} ${darkModeClass}`}
              >
                <p
                  className={`${styles.item__tabs__content__text} ${darkModeClass}`}
                >
                  Diagonal: {item.diagonal}"
                </p>
                <p
                  className={`${styles.item__tabs__content__text} ${darkModeClass}`}
                >
                  CPU: {item.cpu}
                </p>
                <p
                  className={`${styles.item__tabs__content__text} ${darkModeClass}`}
                >
                  Cores: {item.cores}
                </p>
                <p
                  className={`${styles.item__tabs__content__text} ${darkModeClass}`}
                >
                  Main camera: {item.main_camera} px
                </p>
                <p
                  className={`${styles.item__tabs__content__text} ${darkModeClass}`}
                >
                  Front camera: {item.front_camera} px
                </p>
                <p
                  className={`${styles.item__tabs__content__text} ${darkModeClass}`}
                >
                  Battery: {item.battery} mAh
                </p>
              </div>
            </ItemAccordion>
          </div>
        )}
        <div className={styles.item__bottom}>
          <h2 className={`${styles.item__title} ${darkModeClass}`}>
            You'll like it
          </h2>
          <DashboardSlider
            goToItemPage
            spinner={spinnerSlider}
            items={items.rows || []}
          />
        </div>
      </div>
    </section>
  )
}

export default ItemPage
