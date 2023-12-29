import { useMediaQuery } from '@/hooks/useMediaQuery'
import CatalogFiltersDesktop from './CatalogFiltersDesktop'
import { ICatalogFilterProps } from '@/types/catalog'
import { useState } from 'react'

const CatalogFilters = ({
  priceRange,
  setPriceRange,
  setIsPriceRangeChanged,
  resetFilterBtnDisabled,
  resetFilter,
}: ICatalogFilterProps) => {
  const isMobile = useMediaQuery(820)
  const [spinner, setSpinner] = useState(false)

  return (
    <>
      {isMobile ? (
        <div></div>
      ) : (
        <CatalogFiltersDesktop
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          setIsPriceRangeChanged={setIsPriceRangeChanged}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          spinner={spinner}
          resetFilter={resetFilter}
        />
      )}
    </>
  )
}

export default CatalogFilters
