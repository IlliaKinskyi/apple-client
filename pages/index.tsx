import AuthPage from '@/components/templates/AuthPage/AuthPage'
import userRedirectByUserCheck from '@/hooks/userRedirectByUserCheck'
import Head from 'next/head'

export default function Auth() {
  const { shouldLoadContent } = userRedirectByUserCheck(true)
  return (
    <>
      <Head>
        <title>Apple Store | {shouldLoadContent ? 'Authorization' : ''}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
      </Head>
      {shouldLoadContent && <AuthPage />}
    </>
  )
}
