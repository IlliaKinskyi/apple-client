import { IItems } from '@/types/items'
import { createDomain } from 'effector-next'

const items = createDomain()

export const setItems = items.createEvent<IItems>()

export const setItemsCheapFirst = items.createEvent()
export const setItemsExpensiveFirst = items.createEvent()
export const setItemsByPopularity = items.createEvent()

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
