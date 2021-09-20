import type { ReactElement } from 'react'
import { Flex, Box, VStack, useColorModeValue } from '@chakra-ui/react'
import Link from 'next/link'

interface DocStyleMenuSideProps {
  name: string
  url: string
}

export type DocStyleLayoutType = {
  children: ReactElement
  menus: Array<DocStyleMenuSideProps>
}

export default function DocStyleLayout({
  children,
  menus,
}: DocStyleLayoutType) {
  return (
    <Flex>
      <Flex
        display={{ md: 'flex', base: 'none' }}
        width={{
          base: '0', // 0-48em
          md: '200px',
          lg: '270px',
        }}
        my="10"
        px="5"
        borderRight="1px"
        borderColor={useColorModeValue('gray.200', 'gray.1000')}
      >
        <VStack spacing={2} align="stretch">
          {menus.map(item => {
            return (
              <Box h="30px" key={item.url}>
                <Link href={item.url}>{item.name}</Link>
              </Box>
            )
          })}
        </VStack>
      </Flex>
      <Flex flex="1">
        <Box padding="10" w="100%">
          {children}
        </Box>
      </Flex>
    </Flex>
  )
}
