import { ChakraProvider } from '@chakra-ui/react'
import theme from 'components/themes'

export default function MyApp({ Component, pageProps, companies }: any) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
