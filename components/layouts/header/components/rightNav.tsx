import type { ReactElement } from 'react'
import {
  Button,
  Avatar,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  MenuDivider,
} from '@chakra-ui/react'
import { fetchRequest } from 'utils/fetch.util'
import Router from 'next/router'
import { default as NextLink } from 'next/link'
import React from 'react'

export default function RightNav<ReactElement>() {
  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={'full'}
        variant={'link'}
        cursor={'pointer'}
        minW={0}
      >
        <Avatar
          size={'sm'}
          src={
            'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
          }
        />
      </MenuButton>
      <MenuList>
        <NextLink href="/admin/dashboard">
          <MenuItem>Dashboard</MenuItem>
        </NextLink>
        <NextLink href="/admin/company">
          <MenuItem>Company</MenuItem>
        </NextLink>
        <MenuDivider />
        <MenuItem
          onClick={() => {
            fetchRequest
              .post('http://localhost:4000/api/users/auth/logout', {})
              .then(() => Router.replace('/auth/login'))
          }}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
