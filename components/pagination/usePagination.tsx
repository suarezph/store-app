import { useMemo } from 'react'

export type usePaginationProps = {
  current: number
  last: number
  width: number
}

export const usePagination = ({ current, last, width }: usePaginationProps) => {
  const paginationRange = useMemo(() => {
    const left: number = current - width
    const right: number = current + width + 1
    const range: number[] = []
    const rangeWithDots: (string | number)[] = []
    let l: any

    for (let i = 1; i <= last; i += 1) {
      if (i === 1 || i === last || (i >= left && i <= right)) {
        range.push(i)
      } else if (i < left) {
        i = left - 1
      } else if (i > right) {
        range.push(last)
        break
      }
    }

    range.forEach(i => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1)
        } else if (i - l !== 1) {
          rangeWithDots.push('...')
        }
      }
      rangeWithDots.push(i)
      l = i
    })

    return rangeWithDots
  }, [current])

  return paginationRange
}
