import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { IFilterBrandAccordionProps } from '@/types/catalog'
import { itemsBrand } from '@/utils/catalog'
import Accordion from '@/components/elements/Accordion/Accordion'
import FilterChecboxItem from './FilterCheckboxItem'
import styles from '@/styles/catalog/index.module.scss'

const FilterBrandAccordion = ({
  brandList,
  title,
  setBrand,
  updateBrand,
}: IFilterBrandAccordionProps) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const isMobile = useMediaQuery(820)

  const chooseAllBrands = () =>
    setBrand(brandList.map((item) => ({ ...item, checked: true })))

  return (
    <Accordion
      title={title}
      titleClass={`${styles.filters__brand__btn} ${darkModeClass}`}
      arrowOpenClass={styles.open}
      isMobileForFilters={isMobile}
      hideArrowClass={isMobile ? styles.hide_arrow : ''}
    >
      <div className={styles.filters__brand__inner}>
        <button
          className={styles.filters__brand__select_all}
          onClick={chooseAllBrands}
        >
          Select All
        </button>
        <ul className={styles.filters__brand__list}>
          {itemsBrand.map((item) => (
            <FilterChecboxItem
              title={item.title}
              key={item.id}
              id={item.id}
              checked={item.checked}
              event={updateBrand}
            />
          ))}
        </ul>
        <div style={{ height: 24 }} />
      </div>
    </Accordion>
  )
}

export default FilterBrandAccordion
