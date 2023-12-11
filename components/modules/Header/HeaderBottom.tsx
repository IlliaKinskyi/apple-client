import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import styles from '@/styles/header/index.module.scss'
import Link from 'next/link'
import SearchSvg from '@/components/elements/SearchSvg/SearchSvg'
import SearchInput from '@/components/elements/Header/SearchInput'
import ModeToggler from '@/components/elements/ModeToggler/ModeToggler'

const HeaderBottom = () => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <div className={styles.header__bottom}>
      <div className={`container ${styles.header__bottom__container}`}>
        <h1>
          <Link href="/dashboard" legacyBehavior passHref>
            <a className={styles.header__logo__link}>
              <img src="/img/logo.svg" alt="logo" />
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
          <button>
            <span>
              <SearchSvg />
            </span>
          </button>
        </div>
        <div className="">
          <ModeToggler />
          <button>Cart</button>
        </div>
      </div>
    </div>
  )
}

export default HeaderBottom
