import classNames from 'classnames'

interface Props {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
}

/**
Với range = 2 áp dụng cho khoảng cách đầu, cuối và xung quanh current_page
[1] 2 3 ... 19 20
1 [2] 3 4 ... 19 20 
1 2 [3] 4 5 ... 19 20
1 2 3 [4] 5 6 ... 19 20
1 2 3 4 [5] 6 7 ... 19 20
1 2 ... 4 5 [6] 8 9 ... 19 20
1 2 ...13 14 [15] 16 17 ... 19 20
1 2 ... 14 15 [16] 17 18 19 20
1 2 ... 15 16 [17] 18 19 20
1 2 ... 16 17 [18] 19 20
1 2 ... 17 18 [19] 20
1 2 ... 18 19 [20]
 */

const RANGE = 2
export default function Pagination({ page, setPage, pageSize }: Props) {
  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <button
            key={index}
            className='bg-white rounded px-3 py-2 shadow-sm mx-2 border'
          >
            ...
          </button>
        )
      }
      return null
    }
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <button
            key={index}
            className='bg-white rounded px-3 py-2 shadow-sm mx-2 border'
          >
            ...
          </button>
        )
      }
      return null
    }
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1

        // Điều kiện để return về ...

        if (
          //nếu page hiện tại bé 5 và pageNumber lớn hơn page hiện tại + 2 và page number bé hơn pagesize - 2 + 1
          //thì sẽ hiển thị ...  ở  giữa
          page <= RANGE * 2 + 1 &&
          pageNumber > page + RANGE &&
          pageNumber < pageSize - RANGE + 1
        ) {
          return renderDotAfter(index)
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          //nếu page hiện tại  lớn 5, và page hiện tại < pagesize - 4
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            //nếu số page bé hơn page  hiện tại - range và page > 2 thì renderDotBefore
            return renderDotBefore(index)
          } else if (
            pageNumber > page + RANGE &&
            pageNumber < pageSize - RANGE + 1
          ) {
            //page lớn hơn page hiện  tại cộng  range và page bé hơn pageSize - 1
            return renderDotAfter(index)
          }
        } else if (
          page >= pageSize - RANGE * 2 &&
          pageNumber > RANGE &&
          pageNumber < page - RANGE
        ) {
          //page hiện tại >= lớn hơn page size
          // page lớn hơn range
          // page bé page hiện  trừ range
          return renderDotBefore(index)
        }

        return (
          <button
            key={index}
            className={classNames(
              'bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border',
              {
                'border-cyan-500': pageNumber === page,
                'border-transparent': pageNumber !== page
              }
            )}
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </button>
        )
      })
  }
  return (
    <div className='flex flex-wrap mt-6 justify-center'>
      <button className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer  border'>
        Prev
      </button>
      {renderPagination()}
      <button className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer  border'>
        Next
      </button>
    </div>
  )
}
