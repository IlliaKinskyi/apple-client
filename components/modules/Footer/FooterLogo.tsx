import Link from 'next/link'
import styles from '@/styles/footer/index.module.scss'
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'

const FooterLogo = () => {
  const mode = useStore($mode)

  return (
    <div className={styles.footer__top__item}>
      <Link href="/dashboard" passHref legacyBehavior>
        <a className={styles.footer__top__logo}>
          <img
            src={mode === 'dark' ? '/img/logo.svg' : '/img/logo-light.svg'}
            alt="logo"
          />
          <span className={styles.footer__top__item__text}>Apple Store</span>
        </a>
      </Link>
    </div>
  )
}

export default FooterLogo
