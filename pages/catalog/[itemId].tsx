import { getItemFx } from '@/app/api/items'
import Layout from '@/components/layout/Layout'
import ItemPage from '@/components/templates/ItemPage/ItemPage'
import { $item, setItem } from '@/context/item'
import userRedirectByUserCheck from '@/hooks/userRedirectByUserCheck'
import { IQueryParams } from '@/types/catalog'
import { useStore } from 'effector-react'
import Head from 'next/head'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

function CatalogItemPage({ query }: { query: IQueryParams }) {
  const { shouldLoadContent } = userRedirectByUserCheck()
  const item = useStore($item)

  useEffect(() => {
    loadItem()
  }, [])

  const loadItem = async () => {
    try {
      const data = await getItemFx(`/items/find/${query.itemId}`)

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
      {shouldLoadContent && (
        <Layout>
          <main>
            <ItemPage />
            <div className="overlay" />
          </main>
        </Layout>
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
