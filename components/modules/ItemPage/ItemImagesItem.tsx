import { IItemImagesItemProps } from '@/types/item'
import styles from '@/styles/item/index.module.scss'

const ItemImagesItem = ({ src, callback, alt }: IItemImagesItemProps) => {
  const changeMainImage = () => callback(src)

  return (
    <li className={styles.item__images__list__item} onClick={changeMainImage}>
      <img src={src} alt={alt} />
    </li>
  )
}

export default ItemImagesItem
