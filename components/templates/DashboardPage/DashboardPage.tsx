import { getBestsellersOrNewItemsFx } from '@/app/api/items'
import BrandsSlider from '@/components/modules/DashboardPage/BrandsSlider'
import DashboardSlider from '@/components/modules/DashboardPage/DashboardSlider'
import { $mode } from '@/context/mode'
import styles from '@/styles/dashboard/index.module.scss'
import { IItems } from '@/types/items'
import { useStore } from 'effector-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const DashboardPage = () => {
  const [newItems, setNewItems] = useState<IItems>({} as IItems)
  const [bestsellers, setBestsellers] = useState<IItems>({} as IItems)
  const [spinner, setSpinner] = useState(false)

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  useEffect(() => {
    loadItems()
  }, [])

  const loadItems = async () => {
    try {
      setSpinner(true)
      const bestsellers = await getBestsellersOrNewItemsFx('/items/bestsellers')
      const newItems = await getBestsellersOrNewItemsFx('/items/new')

      setBestsellers(bestsellers)
      setNewItems(newItems)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <section className={styles.dashboard}>
      <div className={`container ${styles.dashboard__container}`}>
        <div className={styles.dashboard__brands}>
          <BrandsSlider />
        </div>
        <h2 className={`${styles.dashboard__title} ${darkModeClass}`}>
          Apple Electronics
        </h2>
        <div className={styles.dashboard__items}>
          <h3 className={`${styles.dashboard__items__title} ${darkModeClass}`}>
            Bestsellers
          </h3>
          <DashboardSlider items={bestsellers.rows || []} spinner={spinner} />
        </div>
        <div className={styles.dashboard__items}>
          <h3 className={`${styles.dashboard__items__title} ${darkModeClass}`}>
            New items
          </h3>
          <DashboardSlider items={newItems.rows || []} spinner={spinner} />
        </div>
        <div className={styles.dashboard__about}>
          <h3
            className={`${styles.dashboard__items__title} ${darkModeClass} ${styles.dashboard__about__title}`}
          >
            About company
          </h3>
          <p className={`${styles.dashboard__about__text} ${darkModeClass}`}>
            The power of Apple. Put to work. When the world changes, business
            changes too. Apple hardware, software, and services work together to
            give your employees the power and flexibility to do whatever needs
            doing — wherever that may be.
          </p>
        </div>
      </div>
    </section>
  )
}

export default DashboardPage
