import { IItem } from './items'

export interface IDashboardSlider {
  items: IItem[]
  spinner: boolean
  goToItemPage?: boolean
}

export interface ICartAlertProps {
  count: number
  closeAlert: VoidFunction
}