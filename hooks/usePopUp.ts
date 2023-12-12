import { useEffect, useState } from 'react'

export const usePopUp = () => {
  const [open, setOpen] = useState(false)

  const toggleOpen = () => {
    window.scrollTo(0, 0)
    document.querySelector('.overlay')?.classList.toggle('open')
    document.querySelector('.body')?.classList.toggle('overflow-hidden')
    setOpen(!open)
  }

  const closePopUp = () => {
    document.querySelector('.overlay')?.classList.remove('open')
    document.querySelector('.body')?.classList.remove('overflow-hidden')
    setOpen(false)
  }

  useEffect(() => {
    const overlay = document.querySelector('.overlay')

    overlay?.addEventListener('click', closePopUp)

    return () => overlay?.removeEventListener('click', closePopUp)
  }, [open])

  return { toggleOpen, open, closePopUp }
}
