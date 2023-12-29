import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import styles from '@/styles/catalog/index.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import { IFilterBlockProps } from '@/types/catalog'
import FilterBlockItem from './FilterBlockItem'

const FilterBlock = ({ title, brandList, event }: IFilterBlockProps) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const checkedItems = brandList.filter((item) => item.checked)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`${styles.filter} ${darkModeClass}`}
    >
      <h3 className={`${styles.filter__title} ${darkModeClass}`}>{title}</h3>
      <ul className={styles.filter__list}>
        <AnimatePresence>
          {checkedItems.map((item) => (
            <FilterBlockItem key={item.id} item={item} event={event} />
          ))}
        </AnimatePresence>
      </ul>
    </motion.div>
  )
}

export default FilterBlock
