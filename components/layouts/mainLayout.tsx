import type { ReactElement } from 'react'

import MainHeader from 'components/layouts/header'
import Breadcrumbs, { BreadcrumbsProps } from 'components/layouts/breadcrumbs'

export type MainLayoutProps = {
  children: ReactElement
} & BreadcrumbsProps

export default function MainLayout({
  title,
  breadcrumbs,
  children,
}: MainLayoutProps) {
  return (
    <>
      <MainHeader />
      <Breadcrumbs title={title} breadcrumbs={breadcrumbs} />
      {children}
    </>
  )
}
