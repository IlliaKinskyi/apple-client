import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import Select from 'react-select'
import { MutableRefObject, useRef, useState } from 'react'
import { IOption, SelectOptionType } from '@/types/common'
import {
  controlStyles,
  inputStyles,
  menuStyles,
  optionStyles,
} from '@/styles/searchInput'
import {
  createSelectOption,
  removeClassNameForOverlayAndBody,
  toggleClassNameForOverlayAndBody,
} from '@/utils/common'
import { $searchInputZIndex, setSearchInputZIndex } from '@/context/header'
import SearchSvg from '../SearchSvg/SearchSvg'
import styles from '@/styles/header/index.module.scss'
import { useDebounceCallback } from '@/hooks/useDebounceCallback'
import { getItemByNameFx, searchItemsFx } from '@/app/api/items'
import { toast } from 'react-toastify'
import { IItem } from '@/types/items'
import { useRouter } from 'next/router'
import {
  NoOptionsMessage,
  NoOptionsSpinner,
} from '../SelectOptionsMessage/SelectOptionsMessage'

const SearchInput = () => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const zIndex = useStore($searchInputZIndex)
  const [searchOption, setSearchOption] = useState<SelectOptionType>(null)
  const [onMenuOpenControlStyles, setOnMenuOpenContolStyles] = useState({})
  const [onMenuOpenContainerStyles, setOnMenuOpenContainerStyles] = useState({})
  const btnRef = useRef() as MutableRefObject<HTMLButtonElement>
  const borderRef = useRef() as MutableRefObject<HTMLButtonElement>
  const [options, setOptions] = useState([])
  const [inputValue, setInputValue] = useState('')
  const delayCallback = useDebounceCallback(1000)
  const spinner = useStore(searchItemsFx.pending)
  const router = useRouter()

  const handleSearchOptionChange = (selectedOption: SelectOptionType) => {
    if (!selectedOption) {
      setSearchOption(null)
      return
    }

    const name = (selectedOption as IOption)?.value as string

    if (name) {
      getItemAndRedirect(name)
    }

    setSearchOption(selectedOption)
    removeClassNameForOverlayAndBody()
  }

  const onFocusSearch = () => {
    toggleClassNameForOverlayAndBody('open-search')
    setSearchInputZIndex(100)
  }

  const handleSearchClick = async () => {
    if (!inputValue) {
      return
    }

    getItemAndRedirect(inputValue)
  }

  const searchItem = async (search: string) => {
    try {
      setInputValue(search)
      const data = await searchItemsFx({
        url: '/items/search',
        search,
      })

      const names = data.map((item: IItem) => item.name).map(createSelectOption)

      setOptions(names)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  const getItemAndRedirect = async (name: string) => {
    const item = await getItemByNameFx({
      url: '/items/name',
      name,
    })

    if (!item.id) {
      toast.warning('Product not found')
      return
    }

    router.push(`/catalog/${item.id}`)
  }

  const onSearchInputChange = (text: string) => {
    document.querySelector('.overlay')?.classList.add('open')
    document.querySelector('.overlay')?.classList.add('open-search')

    delayCallback(() => searchItem(text))
  }

  const onSearchMenuOpen = () => {
    setOnMenuOpenContolStyles({
      borderBottomLeftRadius: 0,
      border: 'none',
    })
    setOnMenuOpenContainerStyles({
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1',
    })

    btnRef.current.style.border = 'none'
    btnRef.current.style.borderBottomRightRadius = 'none'
    borderRef.current.style.display = 'block'
  }

  const onSearchMenuClose = () => {
    setOnMenuOpenContolStyles({
      borderBottomLeftRadius: '4px',
      boxShadow: 'none',
      border: '1px solid #9e9e9e',
    })
    setOnMenuOpenContainerStyles({
      boxShadow: 'none',
    })

    btnRef.current.style.border = '1px solid #9e9e9e'
    btnRef.current.style.borderLeft = 'none'
    btnRef.current.style.borderBottomRightRadius = '4px'
    borderRef.current.style.display = 'none'
  }

  return (
    <>
      <div className={styles.header__search__inner}>
        <Select
          components={{
            NoOptionsMessage: spinner ? NoOptionsSpinner : NoOptionsMessage,
          }}
          placeholder="I'm looking..."
          value={searchOption}
          onChange={handleSearchOptionChange}
          styles={{
            ...inputStyles,
            container: (defaultStyles) => ({
              ...defaultStyles,
              ...onMenuOpenContainerStyles,
            }),
            control: (defaultStyles) => ({
              ...controlStyles(defaultStyles, mode),
              ...onMenuOpenControlStyles,
              zIndex,
              transition: 'none',
              backgroundColor: mode === 'dark' ? '#2d2d2d' : '#ffffff',
            }),
            input: (defaultStyles) => ({
              ...defaultStyles,
              color: mode === 'dark' ? '#f2f2f2' : '#222222',
            }),
            menu: (defaultStyles) => ({
              ...menuStyles(defaultStyles, mode),
              zIndex,
              marginTop: '-1px',
            }),
            option: (defaultStyles, state) => ({
              ...optionStyles(defaultStyles, state, mode),
            }),
          }}
          isClearable={true}
          openMenuOnClick={false}
          onFocus={onFocusSearch}
          onMenuOpen={onSearchMenuOpen}
          onMenuClose={onSearchMenuClose}
          onInputChange={onSearchInputChange}
          options={options}
        />
        <span ref={borderRef} className={styles.header__search__border} />
      </div>
      <button
        className={`${styles.header__search__btn} ${darkModeClass}`}
        ref={btnRef}
        style={{ zIndex }}
        onClick={handleSearchClick}
      >
        <span className={styles.header__search__btn__span}>
          <SearchSvg />
        </span>
      </button>
    </>
  )
}

export default SearchInput
