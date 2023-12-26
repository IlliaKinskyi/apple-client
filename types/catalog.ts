import { Event } from 'effector-next'

export interface IFilterBlockProps {
  title: string
}

export interface IQueryParams {
  offset: string
  first: string
  diagonal: number
  cpu: string
  priceFrom: string
  priceTo: string
}

export interface IFilterCheckboxItem {
  title: string
  checked: boolean
  id?: string
  event: Event<IFilterCheckboxItem>
}

export interface IFilterBrandAccordionProps {
  brandList: IFilterCheckboxItem[]
  title: string | false
  setBrand: Event<IFilterCheckboxItem[]>
  updateBrand: Event<IFilterCheckboxItem>
}
