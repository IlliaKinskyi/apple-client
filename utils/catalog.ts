import { NextRouter } from 'next/router'
import { getQueryParamOnFirstRender, idGenerator } from './common'
import { getItemsFx } from '@/app/api/items'
import { setFilteredItems } from '@/context/items'

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

const checkPriceFromQuery = (price: number) =>
  price && !isNaN(price) && price >= 0 && price <= 100000

export const checkQueryParams = (router: NextRouter) => {
  const priceFromQueryValue = getQueryParamOnFirstRender(
    'priceFrom',
    router
  ) as string
  const priceToQueryValue = getQueryParamOnFirstRender(
    'priceTo',
    router
  ) as string
  const brandQueryValue = JSON.parse(
    decodeURIComponent(getQueryParamOnFirstRender('brand', router) as string)
  )
  const isValidBrandQuery =
    Array.isArray(brandQueryValue) && !!brandQueryValue?.length
  const isValidPriceQuery =
    checkPriceFromQuery(+priceFromQueryValue) &&
    checkPriceFromQuery(+priceToQueryValue)

  return {
    isValidBrandQuery,
    isValidPriceQuery,
    priceFromQueryValue,
    priceToQueryValue,
    brandQueryValue,
  }
}

export const updateParamsAndFilterFromQuery = async (
  callback: VoidFunction,
  path: string
) => {
  callback()

  const data = await getItemsFx(`/items?limit=20&offset=${path}`)

  setFilteredItems(data)
}

export async function updateParamsAndFilter<T>(
  updatedParams: T,
  path: string,
  router: NextRouter
) {
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
