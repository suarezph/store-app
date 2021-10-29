import { BiRightArrowAlt, BiLeftArrowAlt } from 'react-icons/bi'
import { usePagination } from './usePagination'
import clsx from 'clsx'
import styles from './paginationv.scss'

export type PaginationProps = {
  onPageChange: (a: number) => void
  totalCount: number
  width?: number
  currentPage: number
  pageSize: number
  className: string
}

export default function Pagination(props: PaginationProps) {
  const {
    onPageChange,
    totalCount,
    width = 1,
    currentPage,
    pageSize,
    className,
  } = props

  const lastPage: number = Math.ceil(totalCount / pageSize)

  const paginationRange = usePagination({
    current: currentPage,
    last: lastPage,
    width,
  })

  if (paginationRange.length < 2) {
    return null
  }

  const onNext = () => onPageChange(currentPage + 1)
  const onPrevious = () => onPageChange(currentPage - 1)

  return (
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
        key="pagination-left-arrow"
      >
        <BiLeftArrowAlt />
      </li>
      {paginationRange &&
        paginationRange.map((pageNumber, idx) => {
          return (
            <li
              className={clsx('pagination-item', {
                selected: pageNumber === currentPage,
              })}
              onClick={() =>
                pageNumber !== '...' ? onPageChange(Number(pageNumber)) : null
              }
              key={`${pageNumber}${idx}`}
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
        key="pagination-right-arrow"
      >
        <BiRightArrowAlt />
      </li>
    </ul>
  )
}
