import { getItemsFx } from '@/app/api/items'
import FilterBlock from '@/components/modules/CatalogPage/FilterBlock'
import FilterSelect from '@/components/modules/CatalogPage/FilterSelect'
import {
  $filteredItems,
  $items,
  $itemsBrand,
  setItems,
  setItemsBrand,
  updateItemsBrand,
} from '@/context/items'
import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import CatalogItem from '@/components/modules/CatalogPage/CatalogItem'
import ReactPaginate from 'react-paginate'
import { IQueryParams } from '@/types/catalog'
import { useRouter } from 'next/router'
import { IItems } from '@/types/items'
import CatalogFilters from '@/components/modules/CatalogPage/CatalogFilters'
import { usePopUp } from '@/hooks/usePopUp'
import { checkQueryParams } from '@/utils/catalog'
import FilterSvg from '@/components/elements/FilterSvg/FilterSvg'
import styles from '@/styles/catalog/index.module.scss'
import skeletonStyles from '@/styles/skeleton/index.module.scss'

const CatalogPage = ({ query }: { query: IQueryParams }) => {
  const mode = useStore($mode)
  const items = useStore($items)
  const itemsBrand = useStore($itemsBrand)
  const filteredItems = useStore($filteredItems)
  const [spinner, setSpinner] = useState(false)
  const [priceRange, setPriceRange] = useState([1000, 100000])
  const [isFilterInQuery, setIsFilterInQuery] = useState(false)
  const [isPriceRangeChanged, setIsPriceRangeChanged] = useState(false)
  const pagesCount = Math.ceil(items.count / 20)
  const isValidOffset =
    query.offset && !isNaN(+query.offset) && +query.offset > 0
  const [currentPage, setCurrentPage] = useState(
    isValidOffset ? +query.offset - 1 : 0
  )
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const router = useRouter()
  const isAnyItemsBrandChecked = itemsBrand.some((item) => item.checked)
  const resetFilterBtnDisabled = !(
    isPriceRangeChanged || isAnyItemsBrandChecked
  )

  const { toggleOpen, open, closePopUp } = usePopUp()

  useEffect(() => {
    loadItems()
  }, [filteredItems, isFilterInQuery])

  const loadItems = async () => {
    try {
      setSpinner(true)
      const data = await getItemsFx('/items?limit=20&offset=0')

      if (!isValidOffset) {
        router.replace({
          query: {
            offset: 1,
          },
        })

        resetPagination(data)
        return
      }

      if (isValidOffset) {
        if (+query.offset > Math.ceil(data.count / 20)) {
          router.push(
            {
              query: {
                ...query,
                offset: 1,
              },
            },
            undefined,
            { shallow: true }
          )

          setCurrentPage(0)
          setItems(isFilterInQuery ? filteredItems : data)
          return
        }
        const offset = +query.offset - 1
        const result = await getItemsFx(`/items?limit=20&offset=${offset}`)

        setCurrentPage(offset)
        setItems(isFilterInQuery ? filteredItems : result)
        return
      }

      setCurrentPage(0)
      setItems(isFilterInQuery ? filteredItems : data)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setTimeout(() => setSpinner(false), 1000)
    }
  }

  const resetPagination = (data: IItems) => {
    setCurrentPage(0)
    setItems(data)
  }

  const handlePageChange = async ({ selected }: { selected: number }) => {
    try {
      setSpinner(true)
      const data = await getItemsFx('/items?limit=20&offset=0')

      if (selected > pagesCount) {
        resetPagination(isFilterInQuery ? filteredItems : data)
        return
      }

      if (isValidOffset && +query.offset > Math.ceil(data.count / 2)) {
        resetPagination(isFilterInQuery ? filteredItems : data)
        return
      }

      const { isValidBrandQuery, isValidPriceQuery } = checkQueryParams(router)

      const result = await getItemsFx(
        `/items?limit=20&offset=${selected}${
          isFilterInQuery && isValidBrandQuery
            ? `&boilet=${router.query.brand}`
            : ''
        }${
          isFilterInQuery && isValidPriceQuery
            ? `&priceFrom=${router.query.priceFrom}&priceTo=${router.query.priceTo}`
            : ''
        }`
      )

      router.push(
        {
          query: {
            ...router.query,
            offset: selected + 1,
          },
        },
        undefined,
        { shallow: true }
      )

      setCurrentPage(selected)
      setItems(result)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setTimeout(() => setSpinner(false), 1000)
    }
  }

  const resetFilters = async () => {
    try {
      const data = await getItemsFx('/items?limit=20&offset=0')
      const params = router.query

      delete params.brand
      delete params.priceFrom
      delete params.priceTo
      params.first = 'cheap'

      router.push({ query: { ...params } }, undefined, { shallow: true })

      setItemsBrand(itemsBrand.map((item) => ({ ...item, checked: false })))

      setItems(data)
      setPriceRange([1000, 100000])
      setIsPriceRangeChanged(false)
    } catch (error) {
      toast.error((error as Error).message)
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
            {isAnyItemsBrandChecked && (
              <FilterBlock
                title="Brand"
                event={updateItemsBrand}
                brandList={itemsBrand}
              />
            )}
          </AnimatePresence>
          <div className={styles.catalog__top__inner}>
            <button
              className={`${styles.catalog__top__reset} ${darkModeClass}`}
              disabled={resetFilterBtnDisabled}
              onClick={resetFilters}
            >
              Reset filters
            </button>
            <button
              className={styles.catalog__top__mobile_btn}
              onClick={toggleOpen}
            >
              <span className={styles.catalog__top__mobile_btn__svg}>
                <FilterSvg />
              </span>
              <span className={styles.catalog__top__mobile_btn__text}>
                Filter
              </span>
            </button>
            <FilterSelect setSpinner={setSpinner} />
          </div>
        </div>
        <div className={styles.catalog__bottom}>
          <div className={styles.catalog__bottom__inner}>
            <CatalogFilters
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              setIsPriceRangeChanged={setIsPriceRangeChanged}
              resetFilterBtnDisabled={resetFilterBtnDisabled}
              resetFilters={resetFilters}
              isPriceRangeChanged={isPriceRangeChanged}
              currentPage={currentPage}
              setIsFilterInQuery={setIsFilterInQuery}
              closePopup={closePopUp}
              filtersMobileOpen={open}
            />
            {spinner ? (
              <ul className={skeletonStyles.skeleton}>
                {Array.from(new Array(20)).map((_, i) => (
                  <li
                    key={i}
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
                  items.rows.map((item) => (
                    <CatalogItem item={item} key={item.id} />
                  ))
                ) : (
                  <span>Product list is empty...</span>
                )}
              </ul>
            )}
          </div>
          <ReactPaginate
            containerClassName={styles.catalog__bottom__list}
            pageClassName={styles.catalog__bottom__list__item}
            pageLinkClassName={styles.catalog__bottom__list__item__link}
            previousClassName={styles.catalog__bottom__list__prev}
            nextClassName={styles.catalog__bottom__list__next}
            breakClassName={styles.catalog__bottom__list__break}
            breakLinkClassName={`${styles.catalog__bottom__list__break__link} ${darkModeClass}`}
            breakLabel="..."
            pageCount={pagesCount}
            forcePage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  )
}

export default CatalogPage
