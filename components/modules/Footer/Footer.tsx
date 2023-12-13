import styles from '@/styles/footer/index.module.scss'
import FooterLogo from './FooterLogo'
import OnlineStoreContent from './OnlineStoreContent'
import CompanyContent from './CompanyContent'
import Link from 'next/link'
import MarkerSvg from '@/components/elements/MarkerSvg/MarkerSvg'
import PhoneSvg from '@/components/elements/PhoneSvg/PhoneSvg'
import MailSvg from '@/components/elements/MailSvg/MailSvg'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__top}>
          <FooterLogo />
          <div className={styles.footer__inner}>
            <div className={styles.footer__top__item}>
              <h3 className={styles.footer__top__item__title}>Online Store</h3>
              <OnlineStoreContent />
            </div>
            <div className={styles.footer__top__item}>
              <h3 className={styles.footer__top__item__title}>Company</h3>
              <CompanyContent />
            </div>
            <div className={styles.footer__top__item}>
              <h3 className={styles.footer__top__item__title}>Contacts</h3>
              <ul
                className={`${styles.footer__top__item__list} ${styles.footer__top__item__contacts}`}
              >
                <li className={styles.footer__top__item__list__item}>
                  <Link href="/contacts" passHref legacyBehavior>
                    <a className={styles.footer__top__item__list__item__link}>
                      <span>Our address:</span>
                      <span>Kropyvnytskyi, street Bolshaya Perspektivnaya</span>
                      <span>
                        <MarkerSvg />
                      </span>
                    </a>
                  </Link>
                </li>
                <li className={styles.footer__top__item__list__item}>
                  <a
                    href="tel:+380990041179"
                    className={styles.footer__top__item__list__item__link}
                  >
                    <span>Our phone number:</span>
                    <span>+38(099) 00-41-179</span>
                    <span>
                      <PhoneSvg />
                    </span>
                  </a>
                </li>
                <li className={styles.footer__top__item__list__item}>
                  <a
                    href="mailto:ilyakinskiy@gmail.com"
                    className={styles.footer__top__item__list__item__link}
                  >
                    <span>E-mail:</span>
                    <span>ilyakinskiy@gmail.com</span>
                    <span>
                      <MailSvg />
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.footer__bottom}></div>
      </div>
    </footer>
  )
}

export default Footer
