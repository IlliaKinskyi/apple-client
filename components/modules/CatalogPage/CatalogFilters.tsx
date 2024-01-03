import { useMediaQuery } from '@/hooks/useMediaQuery'
import CatalogFiltersDesktop from './CatalogFiltersDesktop'
import { ICatalogFilterProps } from '@/types/catalog'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useStore } from 'effector-react'
import { $itemsBrand, setFilteredItems } from '@/context/items'
import { useRouter } from 'next/router'
import { getItemsFx } from '@/app/api/items'

const CatalogFilters = ({
  priceRange,
  setPriceRange,
  setIsPriceRangeChanged,
  resetFilterBtnDisabled,
  resetFilter,
  isPriceRangeChanged,
  currentPage,
  setIsFilterInQuery,
}: ICatalogFilterProps) => {
  const isMobile = useMediaQuery(820)
  const [spinner, setSpinner] = useState(false)
  const itemsBrand = useStore($itemsBrand)
  const router = useRouter()

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
        router.push(
          {
            query: {
              ...router.query,
              brand: encodedItemsQuery,
              priceFrom,
              priceTo,
              offset: initialPage + 1,
            },
          },
          undefined,
          { shallow: true }
        )

        const data = await getItemsFx(
          `/items?limit=20&offset=${initialPage}${priceQuery}${brandQuery}`
        )

        setFilteredItems(data)
        return
      }

      if (isPriceRangeChanged) {
        router.push(
          {
            query: {
              ...router.query,
              priceFrom,
              priceTo,
              offset: initialPage + 1,
            },
          },
          undefined,
          { shallow: true }
        )

        const data = await getItemsFx(
          `/items?limit=20&offset=${initialPage}${priceQuery}`
        )

        setFilteredItems(data)
      }

      if (brands.length) {
        router.push(
          {
            query: {
              ...router.query,
              brand: encodedItemsQuery,
              offset: initialPage + 1,
            },
          },
          undefined,
          { shallow: true }
        )

        const data = await getItemsFx(
          `/items?limit=20&offset=${initialPage}${brandQuery}`
        )

        setFilteredItems(data)
        return
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
        <div></div>
      ) : (
        <CatalogFiltersDesktop
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          setIsPriceRangeChanged={setIsPriceRangeChanged}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          spinner={spinner}
          resetFilter={resetFilter}
          applyFilters={applyFilters}
        />
      )}
    </>
  )
}

export default CatalogFilters
