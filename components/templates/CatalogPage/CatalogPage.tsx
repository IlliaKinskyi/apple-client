import { getItemsFx } from '@/app/api/items'
import FilterBlock from '@/components/modules/CatalogPage/FilterBlock'
import FilterSelect from '@/components/modules/CatalogPage/FilterSelect'
import { $items, setItems } from '@/context/items'
import { $mode } from '@/context/mode'
import styles from '@/styles/catalog/index.module.scss'
import { useStore } from 'effector-react'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import skeletonStyles from '@/styles/skeleton/index.module.scss'

const CatalogPage = () => {
  const mode = useStore($mode)
  const items = useStore($items)
  const [spinner, setSpinner] = useState(false)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  useEffect(() => {
    loadItems()
  }, [])

  console.log(items)

  const loadItems = async () => {
    try {
      setSpinner(true)
      const data = await getItemsFx('/items?limit=20&offset=0')

      setItems(data)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <section className={styles.catalog}>
      <div className={`container ${styles.catalog__container}`}>
        <h2 className={`${styles.catalog__title} ${darkModeClass}`}>
          Catalog items
        </h2>
        <div className={`${styles.catalog__top} ${darkModeClass}`}>
          <AnimatePresence>
            <FilterBlock title="Diagonal" />
          </AnimatePresence>
          <AnimatePresence>
            <FilterBlock title="Cpu" />
          </AnimatePresence>
          <div className={styles.catalog__top__inner}>
            <button>Reset filters</button>
            <FilterSelect />
          </div>
        </div>
        <div className={styles.catalog__bottom}>
          <div className={styles.catalog__bottom__inner}>
            <div className="">Filters</div>
            {spinner ? (
              <ul className={skeletonStyles.skeleton}>
                {Array.from(new Array(8)).map((item) => (
                  <li
                    key={item}
                    className={`${skeletonStyles.skeleton__item} ${
                      mode === 'dark' ? `${skeletonStyles.dark_mode}` : ''
                    }`}
                  >
                    <div className={skeletonStyles.skeleton__item__light} />
                  </li>
                ))}
              </ul>
            ) : (
              <ul className={styles.catalog__list}>
                {items.rows?.length ? (
                  items.rows.map((item) => <li key={item.id}></li>)
                ) : (
                  <span>Product list is empty...</span>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CatalogPage
