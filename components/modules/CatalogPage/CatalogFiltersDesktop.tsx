import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import { $itemsBrand, setItemsBrand, updateItemsBrand } from '@/context/items'
import styles from '@/styles/catalog/index.module.scss'
import FilterBrandAccordion from './FilterBrandAccordion'

const CatalogFiltersDesktop = () => {
  const mode = useStore($mode)
  const itemsBrand = useStore($itemsBrand)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <div className={`${styles.catalog__bottom__filters} ${darkModeClass}`}>
      <h3
        className={`${styles.catalog__bottom__filters__title} ${darkModeClass}`}
      >
        Filters
      </h3>
      <div className={styles.filters__brand}>
        <FilterBrandAccordion
          brandList={itemsBrand}
          title="Brand"
          updateBrand={updateItemsBrand}
          setBrand={setItemsBrand}
        />
      </div>
    </div>
  )
}

export default CatalogFiltersDesktop
