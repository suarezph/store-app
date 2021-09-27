import { Stack, Box, Button } from '@chakra-ui/react'
import { BiRightArrowAlt, BiLeftArrowAlt } from 'react-icons/bi'
import { usePagination, DOTS } from 'components/hooks/usePagination'
import clsx from 'clsx'

export type PaginationProps = {
  onPageChange: (a: number) => void
  totalCount: number
  siblingCount?: number
  currentPage: number
  pageSize: number
  className: string
}

export default function Pagination(props: PaginationProps) {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  let lastPage = paginationRange[paginationRange.length - 1]
  return (
    <>
      {/* <Stack direction={['column', 'row']} spacing="24px">
        <Box w="40px" h="40px" bg="yellow.200">
          <Box w="40px" h="40px" bg="yellow.200">
            <Button></Button>
          </Box>
          <Button></Button>
        </Box>
      </Stack> */}
      <ul
        className={clsx('pagination-container', {
          [className]: className,
        })}
      >
        <li
          className={clsx('pagination-item', {
            disabled: currentPage === 1,
          })}
          onClick={onPrevious}
        >
          <BiLeftArrowAlt />
        </li>
        {paginationRange.map(pageNumber => {
          if (pageNumber === DOTS) {
            return <li className="pagination-item dots">&#8230;</li>
          }

          return (
            <li
              className={clsx('pagination-item', {
                selected: pageNumber === currentPage,
              })}
              onClick={() => onPageChange(pageNumber)}
              key={pageNumber}
            >
              {pageNumber}
            </li>
          )
        })}
        <li
          className={clsx('pagination-item', {
            disabled: currentPage === lastPage,
          })}
          onClick={onNext}
        >
          <BiRightArrowAlt />
        </li>
      </ul>
    </>
  )
}
