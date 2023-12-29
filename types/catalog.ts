import { Event } from 'effector-next'

export interface IFilterBlockProps {
  title: string
  brandList: IFilterCheckboxItem[]
  event: Event<IFilterCheckboxItem>
}

export interface IFilterBlockItemProps {
  item: IFilterCheckboxItem
  event: Event<IFilterCheckboxItem>
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

export interface ICatalogFilterProps {
  priceRange: number[]
  setPriceRange: (arg0: number[]) => void
  setIsPriceRangeChanged: (arg0: boolean) => void
  resetFilterBtnDisabled: boolean
  resetFilter: VoidFunction
}

export interface IPriceRangeProps {
  priceRange: number[]
  setPriceRange: (arg0: number[]) => void
  setIsPriceRangeChanged: (arg0: boolean) => void
}

export interface ICatalogFilterDekstopProps extends ICatalogFilterProps {
  spinner: boolean
  resetFilter: VoidFunction
}
