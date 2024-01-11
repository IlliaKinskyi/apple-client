import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import styles from '@/styles/item/index.module.scss'
import { $item } from '@/context/item'
import { useState } from 'react'
import { motion } from 'framer-motion'

const ItemTabs = () => {
  const mode = useStore($mode)
  const item = useStore($item)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const [showDesription, setShowDescription] = useState(true)
  const [showSpecs, setShowSpecs] = useState(false)

  const handleShowDescription = () => {
    setShowDescription(true)
    setShowSpecs(false)
  }

  const handleShowSpecs = () => {
    setShowDescription(false)
    setShowSpecs(true)
  }

  return (
    <div className={styles.item__tabs}>
      <div className={`${styles.item__tabs__controls} ${darkModeClass}`}>
        <button
          className={showDesription ? styles.active : ''}
          onClick={handleShowDescription}
        >
          Description
        </button>
        <button
          className={showSpecs ? styles.active : ''}
          onClick={handleShowSpecs}
        >
          Technical Specifications
        </button>
      </div>
      {showDesription && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.item__tabs__content}
        >
          <h3
            className={`${styles.item__tabs__content__title} ${darkModeClass}`}
          >
            {item.name}
          </h3>
          <p className={`${styles.item__tabs__content__text} ${darkModeClass}`}>
            {item.description}
          </p>
        </motion.div>
      )}

      {showSpecs && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.item__tabs__content}
        >
          <p className={`${styles.item__tabs__content__text} ${darkModeClass}`}>
            Diagonal: {item.diagonal}"
          </p>
          <p className={`${styles.item__tabs__content__text} ${darkModeClass}`}>
            CPU: {item.cpu}
          </p>
          <p className={`${styles.item__tabs__content__text} ${darkModeClass}`}>
            Cores: {item.cores}
          </p>
          <p className={`${styles.item__tabs__content__text} ${darkModeClass}`}>
            Main camera: {item.main_camera} px
          </p>
          <p className={`${styles.item__tabs__content__text} ${darkModeClass}`}>
            Front camera: {item.front_camera} px
          </p>
          <p className={`${styles.item__tabs__content__text} ${darkModeClass}`}>
            Battery: {item.battery} mAh
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default ItemTabs
