export interface IItem {
  id: number
  brand: string
  price: number
  vendor_code: string
  name: string
  description: string
  images: string
  quantity: number
  bestsellers: boolean
  new: boolean
  popularity: number
  diagonal: number
  cpu: string
  cores: number
  main_camera: number
  front_camera: number
  battery: number
}

export interface IItems {
  count: number
  rows: IItem[]
}
