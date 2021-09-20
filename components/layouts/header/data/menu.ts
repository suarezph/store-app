export interface NavItem {
  label: string
  subLabel?: string
  children?: Array<NavItem>
  href?: string
}

export const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Management',
    children: [
      {
        label: 'Users',
        subLabel: 'Users creation & updates',
        href: '/admin/users',
      },
      {
        label: 'Companies',
        subLabel: 'Companies creation & updates',
        href: '/admin/company',
      },
    ],
  },
  {
    label: 'Companies',
    children: [
      {
        label: 'Job Board',
        subLabel: 'Find your dream design job',
        href: '#',
      },
      {
        label: 'Freelance Projects',
        subLabel: 'An exclusive list for contract work',
        href: '#',
      },
    ],
  },
  {
    label: 'Learn Design',
    href: '#',
  },
  {
    label: 'Hire Designers',
    href: '#',
  },
]
