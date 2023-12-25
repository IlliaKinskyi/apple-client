import { getItemsFx } from '@/app/api/items'
import FilterBlock from '@/components/modules/CatalogPage/FilterBlock'
import FilterSelect from '@/components/modules/CatalogPage/FilterSelect'
import { $items, setItems } from '@/context/items'
import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import styles from '@/styles/catalog/index.module.scss'
import CatalogItem from '@/components/modules/CatalogPage/CatalogItem'
import ReactPaginate from 'react-paginate'
import { IQueryParams } from '@/types/catalog'
import { useRouter } from 'next/router'
import { IItems } from '@/types/items'

const CatalogPage = ({ query }: { query: IQueryParams }) => {
  const mode = useStore($mode)
  const items = useStore($items)
  const [spinner, setSpinner] = useState(false)
  const pagesCount = Math.ceil(items.count / 20)
  const isValidOffset =
    query.offset && !isNaN(+query.offset) && +query.offset > 0
  const [currentPage, setCurrentPage] = useState(
    isValidOffset ? +query.offset - 1 : 0
  )
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const router = useRouter()

  useEffect(() => {
    loadItems()
  }, [])

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
          setItems(data)
          return
        }
      }

      const offset = +query.offset - 1
      const result = await getItemsFx(`/items?limit=20&offset=${offset}`)

      setCurrentPage(offset)
      setItems(result)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  const resetPagination = (data: IItems) => {
    setCurrentPage(0)
    setItems(data)
  }

  const handlePageChange = async ({ selected }: { selected: number }) => {
    try {
      const data = await getItemsFx('/items?limit=20&offset=0')

      if (selected > pagesCount) {
        resetPagination(data)
        return
      }

      if (isValidOffset && +query.offset > Math.ceil(data.count / 2)) {
        resetPagination(data)
        return
      }

      const result = await getItemsFx(`/items?limit=20&offset=${selected}`)

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
    } catch (error) {}
  }

  return (
    <section className={styles.catalog}>
      <div className={`container ${styles.catalog__container}`}>
        <h2 className={`${styles.catalog__title} ${darkModeClass}`}>
          Catalog items
        </h2>
        <div className={`${styles.catalog__top} ${darkModeClass}`}>
          <AnimatePresence>
            {false && <FilterBlock title="Diagonal" />}
          </AnimatePresence>
          <AnimatePresence>
            {false && <FilterBlock title="Cpu" />}
          </AnimatePresence>
          <div className={styles.catalog__top__inner}>
            <button
              className={`${styles.catalog__top__reset} ${darkModeClass}`}
              disabled={true}
            >
              Reset filters
            </button>
            <FilterSelect />
          </div>
        </div>
        <div className={styles.catalog__bottom}>
          <div className={styles.catalog__bottom__inner}>
            <div className="">Filters</div>
            {spinner ? (
              <ul className={skeletonStyles.skeleton}>
                {Array.from(new Array(8)).map((_, i) => (
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
