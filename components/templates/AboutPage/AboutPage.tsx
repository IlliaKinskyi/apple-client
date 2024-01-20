import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import styles from '@/styles/about/index.module.scss'

const AboutPage = () => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <section className={styles.about}>
      <div className="container">
        <h2 className={`${styles.about__title} ${darkModeClass}`}>
          About company
        </h2>
        <div className={styles.about__inner}>
          <div className={`${styles.about__info} ${darkModeClass}`}>
            <p>
              Company &quot;Apple Store&quot; offers you new and used iPhones.
              99% of the current model range presented on the site constantly
              are kept in stock at our warehouse.
            </p>
            <p>
              Online store assortment &quot;Apple Store&quot; includes in the
              full range of Apple products: iPhones, iPads, MacBooks, iMacs and
              accessories for them.
            </p>
          </div>
          <div className={`${styles.about__img} ${styles.about__img__top}`}>
            <img src="/img/about-img.png" alt="image-1" />
          </div>
          <div className={`${styles.about__img} ${styles.about__img__bottom}`}>
            <img src="/img/about-img-2.png" alt="image-2" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutPage
