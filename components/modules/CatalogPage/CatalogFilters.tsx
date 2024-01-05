import { useMediaQuery } from '@/hooks/useMediaQuery'
import CatalogFiltersDesktop from './CatalogFiltersDesktop'
import { ICatalogFilterProps } from '@/types/catalog'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useStore } from 'effector-react'
import { $itemsBrand, setBrandFromQuery } from '@/context/items'
import { useRouter } from 'next/router'
import { getQueryParamOnFirstRender } from '@/utils/common'
import CatalogFiltersMobile from './CatalogFiltersMobile'
import {
  checkQueryParams,
  updateParamsAndFilter,
  updateParamsAndFilterFromQuery,
} from '@/utils/catalog'

const CatalogFilters = ({
  priceRange,
  setPriceRange,
  setIsPriceRangeChanged,
  resetFilterBtnDisabled,
  resetFilters,
  isPriceRangeChanged,
  currentPage,
  setIsFilterInQuery,
  closePopup,
  filtersMobileOpen,
}: ICatalogFilterProps) => {
  const isMobile = useMediaQuery(820)
  const [spinner, setSpinner] = useState(false)
  const itemsBrand = useStore($itemsBrand)
  const router = useRouter()

  useEffect(() => {
    applyFiltersFromQuery()
  }, [])

  const applyFiltersFromQuery = async () => {
    try {
      const {
        isValidBrandQuery,
        isValidPriceQuery,
        priceFromQueryValue,
        priceToQueryValue,
        brandQueryValue,
      } = checkQueryParams(router)

      const brandQuery = `&brand=${getQueryParamOnFirstRender('brand', router)}`
      const priceQuery = `&priceFrom=${priceFromQueryValue}&priceTo=${priceToQueryValue}`

      if (isValidBrandQuery && isValidPriceQuery) {
        updateParamsAndFilterFromQuery(() => {
          setIsFilterInQuery(true)
          setPriceRange([+priceFromQueryValue, +priceToQueryValue])
          setIsPriceRangeChanged(true)
          setBrandFromQuery(brandQueryValue)
        }, `${currentPage}${priceQuery}${brandQuery}`)
        return
      }

      if (priceFromQueryValue && priceToQueryValue) {
        updateParamsAndFilterFromQuery(() => {
          setIsFilterInQuery(true)
          setPriceRange([+priceFromQueryValue, +priceToQueryValue])
          setIsPriceRangeChanged(true)
        }, `${currentPage}${priceQuery}`)
      }

      if (isValidBrandQuery) {
        updateParamsAndFilterFromQuery(() => {
          setIsFilterInQuery(true)
          setBrandFromQuery(brandQueryValue)
        }, `${currentPage}${brandQuery}`)
      }
    } catch (error) {
      const err = error as Error

      if (err.message === 'URI malformed') {
        toast.warning('Incorrect URL for filters')
        return
      }
      toast.error(err.message)
    }
  }

  const applyFilters = async () => {
    setIsFilterInQuery(true)
    try {
      setSpinner(true)
      const priceFrom = Math.ceil(priceRange[0])
      const priceTo = Math.ceil(priceRange[1])
      const priceQuery = isPriceRangeChanged
        ? `&priceFrom=${priceFrom}&priceTo=${priceTo}`
        : ''
      const brands = itemsBrand
        .filter((item) => item.checked)
        .map((item) => item.title)
      const encodedItemsQuery = encodeURIComponent(JSON.stringify(brands))
      const brandQuery = `&brand=${encodedItemsQuery}`
      const initialPage = currentPage > 0 ? 0 : currentPage

      if (brands.length && isPriceRangeChanged) {
        updateParamsAndFilter(
          {
            brand: encodedItemsQuery,
            priceFrom,
            priceTo,
            offset: initialPage + 1,
          },
          `${initialPage}${priceQuery}${brandQuery}`,
          router
        )

        return
      }

      if (isPriceRangeChanged) {
        updateParamsAndFilter(
          {
            priceFrom,
            priceTo,
            offset: initialPage + 1,
          },
          `${initialPage}${priceQuery}`,
          router
        )
      }

      if (brands.length) {
        updateParamsAndFilter(
          {
            brand: encodedItemsQuery,
            offset: initialPage + 1,
          },
          `${initialPage}${brandQuery}`,
          router
        )
      }
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <>
      {isMobile ? (
        <CatalogFiltersMobile
          closePopup={closePopup}
          spinner={spinner}
          applyFilters={applyFilters}
          priceRange={priceRange}
          setIsPriceRangeChanged={setIsPriceRangeChanged}
          setPriceRange={setPriceRange}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          resetFilters={resetFilters}
          filtersMobileOpen={filtersMobileOpen}
        />
      ) : (
        <CatalogFiltersDesktop
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          setIsPriceRangeChanged={setIsPriceRangeChanged}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          spinner={spinner}
          resetFilters={resetFilters}
          applyFilters={applyFilters}
        />
      )}
    </>
  )
}

export default CatalogFilters
