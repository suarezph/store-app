import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const fonts = { mono: `'Menlo', monospace` }

const breakpoints = createBreakpoints({
  sm: '30em', // 480px
  md: '48em', // 768px
  lg: '68.75em', //
  xl: '80em', //
})

const theme = extendTheme({
  colors: {
    black: '#16161D',
  },
  fonts,
  breakpoints,
  icons: {
    logo: {},
  },
})

export default theme
