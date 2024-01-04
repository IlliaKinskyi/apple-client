import {
  $items,
  setItemsByPopularity,
  setItemsCheapFirst,
  setItemsExpensiveFirst,
} from '@/context/items'
import { $mode } from '@/context/mode'
import {
  controlStyles,
  menuStyles,
  selectStyles,
} from '@/styles/catalog/select'
import { optionStyles } from '@/styles/searchInput'
import { IOption, SelectOptionType } from '@/types/common'
import { createSelectOption } from '@/utils/common'
import { categoriesOptions } from '@/utils/selectContents'
import { useStore } from 'effector-react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Select from 'react-select'

const FilterSelect = ({
  setSpinner,
}: {
  setSpinner: (arg0: boolean) => void
}) => {
  const mode = useStore($mode)
  const items = useStore($items)
  const [categoryOption, setCategoryOption] = useState<SelectOptionType>(null)
  const router = useRouter()

  useEffect(() => {
    if (items.rows) {
      switch (router.query.first) {
        case 'cheap':
          updateCategoryOption('$ -> $$$')
          setItemsCheapFirst()
          break
        case 'expensive':
          updateCategoryOption('$$$ -> $')
          setItemsExpensiveFirst()
          break
        case 'popular':
          setItemsByPopularity()
          updateCategoryOption('Popularity')
          break
        default:
          updateCategoryOption('$ -> $$$')
          setItemsCheapFirst()
          break
      }
    }
  }, [items.rows, router.query.first])

  const updateCategoryOption = (value: string) =>
    setCategoryOption({ value, label: value })

  const updateRoteParam = (first: string) =>
    router.push(
      {
        query: {
          ...router.query,
          first,
        },
      },
      undefined,
      { shallow: true }
    )

  const handleSortOptionChange = (selectedOption: SelectOptionType) => {
    setSpinner(true)
    setCategoryOption(selectedOption)

    switch ((selectedOption as IOption).value) {
      case '$ -> $$$':
        setItemsCheapFirst()
        updateRoteParam('cheap')
        break
      case '$$$ -> $':
        setItemsExpensiveFirst()
        updateRoteParam('expensive')
        break
      case 'Popularity':
        setItemsByPopularity()
        updateRoteParam('popular')
        break
    }

    setTimeout(() => setSpinner(false), 1000)
  }
  return (
    <Select
      placeholder="I'm looking..."
      value={categoryOption || createSelectOption('$ -> $$$')}
      onChange={handleSortOptionChange}
      styles={{
        ...selectStyles,
        control: (defaultStyles) => ({
          ...controlStyles(defaultStyles, mode),
        }),
        input: (defaultStyles) => ({
          ...defaultStyles,
          color: mode === 'dark' ? '#f2f2f2' : '#222222',
        }),
        menu: (defaultStyles) => ({
          ...menuStyles(defaultStyles, mode),
        }),
        option: (defaultStyles, state) => ({
          ...optionStyles(defaultStyles, state, mode),
        }),
      }}
      isSearchable={false}
      options={categoriesOptions}
    />
  )
}

export default FilterSelect
