import { useState } from 'react'
import { useStore } from 'effector-react'
import { $item } from '@/context/item'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import ItemImagesItem from './ItemImagesItem'
import styles from '@/styles/item/index.module.scss'

const ItemImagesList = () => {
  const item = useStore($item)
  const isMobile = useMediaQuery(850)
  const images = item.images ? (JSON.parse(item.images) as string[]) : []
  const [currentImgSrc, setCurrentImgSrc] = useState('')

  return (
    <div className={styles.item__images}>
      {isMobile ? (
        <div />
      ) : (
        <>
          <div className={styles.item__images__main}>
            <img src={currentImgSrc || images[0]} alt={item.name} />
          </div>
          <ul className={styles.item__images__list}>
            {images.map((li, index) => (
              <ItemImagesItem
                key={index}
                alt={`image-${index + 1}`}
                callback={setCurrentImgSrc}
                src={li}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default ItemImagesList
