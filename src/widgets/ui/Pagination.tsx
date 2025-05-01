import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui"

interface PaginationProps {
  skip: number
  limit: number
  total: number
  setSkip: (skip: number) => void
  setLimit: (limit: number) => void
  limitOptions?: number[]
}

export const Pagination = ({
  skip,
  limit,
  total,
  setSkip,
  setLimit,
  limitOptions = [10, 20, 30],
}: PaginationProps) => {
  const handlePrevPage = () => {
    setSkip(Math.max(0, skip - limit))
  }

  // 다음 페이지
  const handleNextPage = () => {
    const newSkip = skip + limit
    setSkip(newSkip)
  }

  // 페이지 크기 변경
  const handleLimitChange = (value: string) => {
    setLimit(Number(value))
  }

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select value={limit.toString()} onValueChange={handleLimitChange}>
          <SelectTrigger className="w-[80px]">
            <SelectValue placeholder={limit.toString()} />
          </SelectTrigger>
          <SelectContent>
            {limitOptions.map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span>항목</span>
      </div>
      <div className="flex gap-2">
        <Button disabled={skip === 0} onClick={handlePrevPage}>
          이전
        </Button>
        <Button disabled={skip + limit >= total} onClick={handleNextPage}>
          다음
        </Button>
      </div>
    </div>
  )
}
