export interface ProfileMenuProps {
  name: string
  url: string
}

export const profileMenu: Array<ProfileMenuProps> = [
  {
    name: 'Profile',
    url: '/admin/profile',
  },
  {
    name: 'Change Password',
    url: '/admin/profile/password',
  },
]
