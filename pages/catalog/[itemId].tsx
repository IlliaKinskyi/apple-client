import { getItemFx } from '@/app/api/items'
import Layout from '@/components/layout/Layout'
import ItemPage from '@/components/templates/ItemPage/ItemPage'
import { $item, setItem } from '@/context/item'
import userRedirectByUserCheck from '@/hooks/userRedirectByUserCheck'
import { IQueryParams } from '@/types/catalog'
import { useStore } from 'effector-react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Custom404 from '../404'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'

function CatalogItemPage({ query }: { query: IQueryParams }) {
  const { shouldLoadContent } = userRedirectByUserCheck()
  const item = useStore($item)
  const [error, setError] = useState(false)
  const router = useRouter()
  const getDefaultTextGenerator = useCallback(
    (subpath: string) => subpath.replace('catalog', 'Catalog'),
    []
  )
  const getTextGenerator = useCallback((param: string) => ({})[param], [])
  const lastCrumb = document.querySelector('.last-crumb') as HTMLElement

  useEffect(() => {
    loadItem()
  }, [router.asPath])

  useEffect(() => {
    if (lastCrumb) {
      lastCrumb.textContent = item.name
    }
  }, [lastCrumb, item])

  const loadItem = async () => {
    try {
      const data = await getItemFx(`/items/find/${query.itemId}`)

      if (!data) {
        setError(true)
        return
      }

      setItem(data)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  return (
    <>
      <Head>
        <title>Apple Store | {shouldLoadContent ? item.name : ''}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
      </Head>
      {error ? (
        <Custom404 />
      ) : (
        shouldLoadContent && (
          <Layout>
            <main>
              <Breadcrumbs
                getDefaultTextGenerator={getDefaultTextGenerator}
                getTextGenerator={getTextGenerator}
              />
              <ItemPage />
              <div className="overlay" />
            </main>
          </Layout>
        )
      )}
    </>
  )
}

export async function getServerSideProps(context: { query: IQueryParams }) {
  return {
    props: { query: { ...context.query } },
  }
}

export default CatalogItemPage
