import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Box,
  Flex,
  Text,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Link from 'next/link'

interface BreadcrumbItem {
  name: string
  url: string
}

export type BreadcrumbsProps = {
  title: string
  breadcrumbs: Array<BreadcrumbItem>
}

export default function Breadcrumbs({ title, breadcrumbs }: BreadcrumbsProps) {
  return (
    <Box>
      <Flex
        minH={'50px'}
        py={{ base: 3 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.1000')}
        boxShadow="sm"
        align={'center'}
      >
        <Flex flex={{ base: 1 }} justify={{ base: 'left', md: 'start' }}>
          <Text fontSize="18px">{title}</Text>
        </Flex>

        {breadcrumbs.length > 0 && (
          <Stack justify={'flex-end'} direction={'row'} spacing={6}>
            <Breadcrumb
              spacing="8px"
              separator={<ChevronRightIcon color="gray.500" />}
              fontSize="14px"
            >
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

              {breadcrumbs.map(breadcrumb => (
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">
                    <Link href={breadcrumb.url}>{breadcrumb.name}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              ))}
            </Breadcrumb>
          </Stack>
        )}
      </Flex>
    </Box>
  )
}
