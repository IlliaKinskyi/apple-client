import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import styles from '@/styles/catalog/index.module.scss'
import { motion } from 'framer-motion'
import { IFilterBlockProps } from '@/types/catalog'

const FilterBlock = ({ title }: IFilterBlockProps) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`${styles.dashboard__alert} ${darkModeClass}`}
    >
      <h3 className={`${styles.filter__title} ${darkModeClass}`}>{title}</h3>
      <ul className={styles.filter__title}>
        {[].map((item) => (
          <li key={item}></li>
        ))}
      </ul>
    </motion.div>
  )
}

export default FilterBlock
