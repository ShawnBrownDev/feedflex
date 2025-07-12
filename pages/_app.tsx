import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <>
      <Head>
        <title>FreeFlex</title>
      </Head>
      {/* Pass theme setter as prop */}
      <Component {...pageProps} theme={theme} setTheme={setTheme} />
    </>
  )
}