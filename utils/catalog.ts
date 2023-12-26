import { idGenerator } from './common'

const createBrandCheckboxObj = (title: string) => ({
  title,
  checked: false,
  id: idGenerator(),
})

export const itemsBrand = [
  'Apple',
  'Samsung',
  'Realme',
  'Xiaomi',
  'Moto',
  'Huawei',
  'Nokia',
  'Sigma',
].map(createBrandCheckboxObj)
