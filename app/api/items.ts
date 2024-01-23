import { createEffect } from 'effector-next'
import api from '../axiosClient'
import { toast } from 'react-toastify'

export const getBestsellersOrNewItemsFx = createEffect(async (url: string) => {
  const { data } = await api.get(url)

  return data
})

export const getItemsFx = createEffect(async (url: string) => {
  const { data } = await api.get(url)

  return data
})

export const getItemFx = createEffect(async (url: string) => {
  const { data } = await api.get(url)

  return data
})

export const searchItemsFx = createEffect(
  async ({ url, search }: { url: string; search: string }) => {
    const { data } = await api.post(url, { search })

    return data.rows
  }
)

export const getItemByNameFx = createEffect(
  async ({ url, name }: { url: string; name: string }) => {
    try {
      const { data } = await api.post(url, { name })

      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)
