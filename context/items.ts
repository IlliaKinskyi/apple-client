import { IFilterCheckboxItem } from '@/types/catalog'
import { IItems } from '@/types/items'
import { itemsBrand } from '@/utils/catalog'
import { createDomain } from 'effector-next'

const items = createDomain()

export const setItems = items.createEvent<IItems>()

export const setItemsCheapFirst = items.createEvent()
export const setItemsExpensiveFirst = items.createEvent()
export const setItemsByPopularity = items.createEvent()
export const setFilteredItems = items.createEvent<IItems>()
export const setItemsBrand = items.createEvent<IFilterCheckboxItem[]>()
export const updateItemsBrand = items.createEvent<IFilterCheckboxItem>()
export const setBrandFromQuery = items.createEvent<string[]>()

const updateBrand = (
  brand: IFilterCheckboxItem[],
  id: string,
  payload: Partial<IFilterCheckboxItem>
) =>
  brand.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        ...payload,
      }
    }

    return item
  })

const updateBrandFromQuery = (
  brand: IFilterCheckboxItem[],
  brandFromQuery: string[]
) =>
  brand.map((item) => {
    if (brandFromQuery.find((title) => title === item.title)) {
      return {
        ...item,
        checked: true,
      }
    }

    return item
  })

export const $items = items
  .createStore<IItems>({} as IItems)
  .on(setItems, (_, products) => products)
  .on(setItemsCheapFirst, (state) => ({
    ...state,
    rows: state.rows.sort((a, b) => a.price - b.price),
  }))
  .on(setItemsExpensiveFirst, (state) => ({
    ...state,
    rows: state.rows.sort((a, b) => b.price - a.price),
  }))
  .on(setItemsByPopularity, (state) => ({
    ...state,
    rows: state.rows.sort((a, b) => b.popularity - a.popularity),
  }))

export const $itemsBrand = items
  .createStore<IFilterCheckboxItem[]>(itemsBrand as IFilterCheckboxItem[])
  .on(setItemsBrand, (_, products) => products)
  .on(updateItemsBrand, (state, payload) => [
    ...updateBrand(state, payload.id as string, { checked: payload.checked }),
  ])
  .on(setBrandFromQuery, (state, brandFromQuery) => [
    ...updateBrandFromQuery(state, brandFromQuery),
  ])

export const $filteredItems = items
  .createStore<IItems>({} as IItems)
  .on(setFilteredItems, (_, products) => products)
