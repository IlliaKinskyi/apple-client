import { createEffect } from 'effector-next'
import api from '../axiosClient'

export const getBestsellersOrNewItemsFx = createEffect(async (url: string) => {
  const { data } = await api.get(url)

  return data
})
