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
  itemId: string
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

interface ICatalogBaseTypes {
  priceRange: number[]
  setPriceRange: (arg0: number[]) => void
  setIsPriceRangeChanged: (arg0: boolean) => void
}

interface ICatalogFiltersBaseTypes {
  resetFilterBtnDisabled: boolean
  resetFilters: VoidFunction
}

export interface ICatalogFilterProps
  extends ICatalogBaseTypes,
    ICatalogFiltersBaseTypes {
  isPriceRangeChanged: boolean
  currentPage: number
  setIsFilterInQuery: (arg0: boolean) => void
  closePopup: VoidFunction
  filtersMobileOpen: boolean
}

export type IPriceRangeProps = ICatalogBaseTypes

export interface ICatalogFilterDekstopProps
  extends ICatalogBaseTypes,
    ICatalogFiltersBaseTypes {
  spinner: boolean
  applyFilters: VoidFunction
}

export interface ICatalogFilterMobileProps
  extends ICatalogBaseTypes,
    ICatalogFiltersBaseTypes {
  spinner: boolean
  applyFilters: VoidFunction
  closePopup: VoidFunction
  filtersMobileOpen: boolean
}

export interface IFiltersPopupTop {
  resetBtnText: string
  title: string
  resetFilters: VoidFunction
  resetFilterBtnDisabled: boolean
  closePopup: VoidFunction
}

export interface IFiltersPopupProps extends IFilterBrandAccordionProps {
  resetFilterBtnDisabled: boolean
  resetAllBrands: VoidFunction
  handleClosePopup: VoidFunction
  applyFilters: VoidFunction
  openPopup: boolean
}
