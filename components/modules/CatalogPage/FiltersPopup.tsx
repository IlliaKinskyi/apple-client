import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import { IFiltersPopupProps } from '@/types/catalog'
import FiltersPopupTop from './FiltersPopupTop'
import FilterBrandAccordion from './FilterBrandAccordion'
import styles from '@/styles/catalog/index.module.scss'

const FiltersPopup = ({
  resetFilterBtnDisabled,
  resetAllBrands,
  handleClosePopup,
  updateBrand,
  setBrand,
  applyFilters,
  openPopup,
  title,
  brandList,
}: IFiltersPopupProps) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  return (
    <div
      className={`${styles.fil__popup} ${darkModeClass} ${
        openPopup ? styles.open : ''
      }`}
    >
      <div className={styles.filters__popup__inner}>
        <FiltersPopupTop
          resetBtnText="Reset"
          title={title as string}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          resetFilters={resetAllBrands}
          closePopup={handleClosePopup}
        />
        <FilterBrandAccordion
          brandList={brandList}
          title={false}
          updateBrand={updateBrand}
          setBrand={setBrand}
        />
      </div>
      <div className={styles.filters__actions}>
        <button
          className={styles.filters__actions__show}
          disabled={resetFilterBtnDisabled}
          onClick={applyFilters}
          style={{ marginBottom: 12 }}
        >
          Show
        </button>
        <button
          className={styles.filters__actions__reset}
          onClick={handleClosePopup}
        >
          Back
        </button>
      </div>
    </div>
  )
}

export default FiltersPopup
