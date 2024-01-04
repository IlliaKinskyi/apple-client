import { useMediaQuery } from '@/hooks/useMediaQuery'
import CatalogFiltersDesktop from './CatalogFiltersDesktop'
import { ICatalogFilterProps } from '@/types/catalog'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useStore } from 'effector-react'
import {
  $itemsBrand,
  setBrandFromQuery,
  setFilteredItems,
} from '@/context/items'
import { useRouter } from 'next/router'
import { getItemsFx } from '@/app/api/items'
import { getQueryParamOnFirstRender } from '@/utils/common'

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

  useEffect(() => {
    applyFiltersFromQuery()
  }, [])

  const applyFiltersFromQuery = async () => {
    try {
      const priceFromQueryValue = getQueryParamOnFirstRender(
        'priceFrom',
        router
      )
      const priceToQueryValue = getQueryParamOnFirstRender('priceTo', router)
      const brandQueryValue = JSON.parse(
        decodeURIComponent(
          getQueryParamOnFirstRender('brand', router) as string
        )
      )
      const isValidBrandQuery =
        Array.isArray(brandQueryValue) && !!brandQueryValue?.length

      const brandQuery = `&brand=${getQueryParamOnFirstRender('brand', router)}`
      const priceQuery = `&priceFrom=${priceFromQueryValue}&priceTo=${priceToQueryValue}`

      if (isValidBrandQuery && priceFromQueryValue && priceToQueryValue) {
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
      toast.error((error as Error).message)
    }
  }

  const updateParamsAndFilterFromQuery = async (
    callback: VoidFunction,
    path: string
  ) => {
    callback()

    const data = await getItemsFx(`/items?limit=20&offset=${path}`)

    setFilteredItems(data)
  }

  async function updateParamsAndFilter<T>(updatedParams: T, path: string) {
    const params = router.query

    delete params.brand
    delete params.priceFrom
    delete params.priceTo

    router.push(
      {
        query: {
          ...params,
          ...updatedParams,
        },
      },
      undefined,
      { shallow: true }
    )

    const data = await getItemsFx(`/items?limit=20&offset=${path}`)

    setFilteredItems(data)
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
          `${initialPage}${priceQuery}${brandQuery}`
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
          `${initialPage}${priceQuery}`
        )
      }

      if (brands.length) {
        updateParamsAndFilter(
          {
            brand: encodedItemsQuery,
            offset: initialPage + 1,
          },
          `${initialPage}${brandQuery}`
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
