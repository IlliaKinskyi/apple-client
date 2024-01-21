import { useEffect, useState } from 'react'
import {
  removeClassNameForOverlayAndBody,
  toggleClassNameForOverlayAndBody,
} from '@/utils/common'
import { setSearchInputZIndex } from '@/context/header'

export const usePopUp = () => {
  const [open, setOpen] = useState(false)

  const toggleOpen = () => {
    window.scrollTo(0, 0)
    toggleClassNameForOverlayAndBody()
    setOpen(!open)
  }

  const closePopUp = () => {
    removeClassNameForOverlayAndBody()
    setOpen(false)
    setSearchInputZIndex(1)
  }

  useEffect(() => {
    const overlay = document.querySelector('.overlay')

    overlay?.addEventListener('click', closePopUp)

    return () => overlay?.removeEventListener('click', closePopUp)
  }, [open])

  return { toggleOpen, open, closePopUp }
}
