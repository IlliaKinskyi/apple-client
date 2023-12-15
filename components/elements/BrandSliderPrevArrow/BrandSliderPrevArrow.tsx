import { IBrandSliderArrow } from '@/types/elements'
import BrandSliderArrowSvg from '../BrandSliderArrow/BrandSliderArrow'
import styles from '@/styles/dashboard/index.module.scss'

const BrandSliderPrevArrow = (props: IBrandSliderArrow) => (
  <button
    className={`${styles.dashboard__brands__slider__arrow} ${styles.dashboard__brands__slider__arrow_prev} ${props.modeClass}`}
    onClick={props.onClick}
  >
    <span>
      <BrandSliderArrowSvg />
    </span>
  </button>
)

export default BrandSliderPrevArrow
