import type { AppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from "react-query/devtools"
import React from 'react'
import { MantineProvider } from '@mantine/core'
import Head from 'next/head'
import Shell from '../components/shell'

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient)

  return (
  <QueryClientProvider client={queryClient}>
    <Head>
      <title>Pesquisa gov</title>
      <meta name="viewport" content='minimum-scale=1, initial-scale=1, width=device-width' />
    </Head>

    <Hydrate state={pageProps.dehydratedState}>
      <MantineProvider >
        <Shell>
          <Component {...pageProps} />
        </Shell>
      </MantineProvider>
    </Hydrate>
    <ReactQueryDevtools />
  </QueryClientProvider>
  )
 
}

export default MyApp
