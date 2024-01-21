import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import Link from 'next/link'
import SearchInput from '@/components/elements/Header/SearchInput'
import ModeToggler from '@/components/elements/ModeToggler/ModeToggler'
import CartPopUp from './CartPopUp/CartPopUp'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import styles from '@/styles/header/index.module.scss'

const HeaderBottom = () => {
  const isMedia950 = useMediaQuery(950)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <div className={styles.header__bottom}>
      <div className={`container ${styles.header__bottom__container}`}>
        <h1 className={styles.header__logo}>
          <Link href="/dashboard" legacyBehavior passHref>
            <a className={styles.header__logo__link}>
              {mode === 'dark' ? (
                <img src="/img/logo-light.svg" alt="logo" />
              ) : (
                <img src="/img/logo.svg" alt="logo" />
              )}
              <span
                className={`${styles.header__logo__link__text} ${darkModeClass}`}
              >
                Apple Store
              </span>
            </a>
          </Link>
        </h1>
        <div className={styles.header__search}>
          <SearchInput />
        </div>
        <div className={styles.header__shopping_cart}>
          {!isMedia950 && <ModeToggler />}
          <CartPopUp />
        </div>
      </div>
    </div>
  )
}

export default HeaderBottom
