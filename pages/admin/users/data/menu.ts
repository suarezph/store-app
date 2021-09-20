export interface UsersMenuProps {
  name: string
  url: string
}

export const usersMenu: Array<UsersMenuProps> = [
  {
    name: 'User List',
    url: '/admin/users',
  },
  {
    name: 'Create user',
    url: '/admin/users/create',
  },
  {
    name: 'User Details',
    url: '/admin/users/id',
  },
]
