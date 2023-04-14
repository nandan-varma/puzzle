import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css"></link>
  <Component {...pageProps} />
  </>
  )
}
