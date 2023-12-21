import { IItems } from '@/types/items'
import { createDomain } from 'effector-next'

const items = createDomain()

export const setItems = items.createEvent<IItems>()

export const $items = items
  .createStore<IItems>({} as IItems)
  .on(setItems, (_, products) => products)
