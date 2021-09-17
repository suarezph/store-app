import type { FC } from 'react'
import { Stack } from '@chakra-ui/react'

export const Main: FC<{ props: any }> = props => (
  <Stack
    spacing="1.5rem"
    width="100%"
    maxWidth="48rem"
    mt="-45vh"
    pt="8rem"
    px="1rem"
    {...props}
  />
)
