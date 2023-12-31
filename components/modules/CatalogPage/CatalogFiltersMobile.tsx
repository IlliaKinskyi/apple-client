import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import { ICatalogFilterMobileProps } from '@/types/catalog'
import FiltersPopupTop from './FiltersPopupTop'
import styles from '@/styles/catalog/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import FiltersPopup from './FiltersPopup'
import { $itemsBrand, setItemsBrand, updateItemsBrand } from '@/context/items'
import { useState } from 'react'
import Accordion from '@/components/elements/Accordion/Accordion'
import PriceRange from './PriceRange'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const CatalogFiltersMobile = ({
  spinner,
  resetFilterBtnDisabled,
  resetFilters,
  closePopup,
  applyFilters,
  filtersMobileOpen,
  setIsPriceRangeChanged,
  priceRange,
  setPriceRange,
}: ICatalogFilterMobileProps) => {
  const isMobile = useMediaQuery(820)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const itemsBrand = useStore($itemsBrand)
  const [openBrands, setOpenBrands] = useState(false)
  const handleOpenBrands = () => setOpenBrands(true)
  const handleCloseBrands = () => setOpenBrands(false)
  const isAnyItemsBrandChecked = itemsBrand.some((item) => item.checked)

  const resetAllBrands = () =>
    setItemsBrand(itemsBrand.map((item) => ({ ...item, checked: false })))

  const applyFiltersAndClosePopup = () => {
    applyFilters()
    closePopup()
  }

  return (
    <div
      className={`${styles.catalog__bottom__filters} ${darkModeClass} ${
        filtersMobileOpen ? styles.open : ''
      }`}
    >
      <div className={styles.catalog__bottom__filters__inner}>
        <FiltersPopupTop
          resetBtnText="Reset All"
          title="Filters"
          resetFilters={resetFilters}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          closePopup={closePopup}
        />
        <div className={styles.filters__brand}>
          <button
            className={`${styles.filters__brand__btn} ${darkModeClass}`}
            onClick={handleOpenBrands}
          >
            Brand
          </button>
          <FiltersPopup
            title="Brand"
            resetFilterBtnDisabled={!isAnyItemsBrandChecked}
            updateBrand={updateItemsBrand}
            setBrand={setItemsBrand}
            applyFilters={applyFiltersAndClosePopup}
            brandList={itemsBrand}
            resetAllBrands={resetAllBrands}
            handleClosePopup={handleCloseBrands}
            openPopup={openBrands}
          />
        </div>
        <div className={styles.filters__price}>
          <Accordion
            title="Price"
            titleClass={`${styles.filters__brand__btn} ${darkModeClass}`}
            hideArrowClass={styles.hide__arrow}
            isMobileForFilters={isMobile}
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
          onClick={applyFiltersAndClosePopup}
          className={styles.filters__actions__show}
          disabled={resetFilterBtnDisabled}
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
      </div>
    </div>
  )
}

export default CatalogFiltersMobile
