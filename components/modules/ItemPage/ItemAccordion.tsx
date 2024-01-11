import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import styles from '@/styles/item/index.module.scss'
import Accordion from '@/components/elements/Accordion/Accordion'
import { IItemAccordionProps } from '@/types/item'

const ItemAccordion = ({ children, title }: IItemAccordionProps) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const handleExpandAccordion = (expanded: boolean) => {
    const accordionTitles = document.querySelectorAll(
      `.${styles.item__accordion__title}`
    )

    accordionTitles.forEach((title) => {
      const item = title as HTMLElement

      if (!expanded) {
        item.style.borderBottomLeftRadius = '0'
        item.style.borderBottomRightRadius = '0'
      } else {
        item.style.borderBottomLeftRadius = '4px'
        item.style.borderBottomRightRadius = '4px'
      }
    })
  }

  return (
    <Accordion
      title={title}
      titleClass={`${styles.item__accordion__title} ${darkModeClass}`}
      arrowOpenClass={styles.open}
      boxShadowStyle="0px 2px 8px rgba(0, 0, 0, 0.1)"
      callback={handleExpandAccordion}
    >
      {children}
    </Accordion>
  )
}

export default ItemAccordion
