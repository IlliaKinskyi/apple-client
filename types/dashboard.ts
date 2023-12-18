import { IItem } from './items'

export interface IDashboardSlider {
  items: IItem[]
  spinner: boolean
  goToItemPage?: boolean
}
