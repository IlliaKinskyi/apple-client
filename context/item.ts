import { IItem } from '@/types/items'
import { createDomain } from 'effector'

const item = createDomain()

export const setItem = item.createEvent<IItem>()

export const $item = item
  .createStore<IItem>({} as IItem)
  .on(setItem, (_, item) => item)
