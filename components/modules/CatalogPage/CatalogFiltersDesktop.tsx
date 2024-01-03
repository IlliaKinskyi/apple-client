import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import { $itemsBrand, setItemsBrand, updateItemsBrand } from '@/context/items'
import FilterBrandAccordion from './FilterBrandAccordion'
import Accordion from '@/components/elements/Accordion/Accordion'
import PriceRange from './PriceRange'
import { ICatalogFilterDekstopProps } from '@/types/catalog'
import styles from '@/styles/catalog/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const CatalogFiltersDesktop = ({
  priceRange,
  setPriceRange,
  setIsPriceRangeChanged,
  resetFilterBtnDisabled,
  spinner,
  resetFilter,
  applyFilters,
}: ICatalogFilterDekstopProps) => {
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
        <div className={styles.filters__price}>
          <Accordion
            title="Price"
            titleClass={`${styles.filters__brand__btn} ${darkModeClass}`}
            arrowOpenClass={styles.open}
          >
            <div className={styles.filters__brand__inner}>
              <PriceRange
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                setIsPriceRangeChanged={setIsPriceRangeChanged}
              />
              <div style={{ height: 24 }} />
            </div>
          </Accordion>
        </div>
      </div>
      <div className={styles.filters__actions}>
        <button
          className={styles.filters__actions__show}
          disabled={spinner || resetFilterBtnDisabled}
          onClick={applyFilters}
        >
          {spinner ? (
            <span
              className={spinnerStyles.spinner}
              style={{ top: 6, left: '47%' }}
            />
          ) : (
            'Show'
          )}
        </button>
        <button
          className={styles.filters__actions__reset}
          disabled={resetFilterBtnDisabled}
          onClick={resetFilter}
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export default CatalogFiltersDesktop
