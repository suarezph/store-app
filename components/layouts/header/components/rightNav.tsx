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
        <Avatar size={'sm'} src={'/'} name="Dan Abrahmov" />
      </MenuButton>
      <MenuList>
        <NextLink href="/admin/profile">
          <MenuItem>Edit Profile</MenuItem>
        </NextLink>
        <NextLink href="/admin/company">
          <MenuItem>Preferences</MenuItem>
        </NextLink>
        <MenuDivider />
        <MenuItem
          onClick={() => {
            fetchRequest
              .post('/users/auth/logout', {})
              .then(() => Router.replace('/auth/login'))
          }}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
