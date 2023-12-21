import Layout from '@/components/layout/Layout'
import CatalogPage from '@/components/templates/CatalogPage/CatalogPage'
import userRedirectByUserCheck from '@/hooks/userRedirectByUserCheck'
import Head from 'next/head'

function Catalog() {
  const { shouldLoadContent } = userRedirectByUserCheck()

  return (
    <>
      <Head>
        <title>Apple Store | {shouldLoadContent ? 'Catalog' : ''}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
      </Head>
      {shouldLoadContent && (
        <Layout>
          <main>
            <CatalogPage />
            <div className="overlay" />
          </main>
        </Layout>
      )}
    </>
  )
}

export default Catalog
