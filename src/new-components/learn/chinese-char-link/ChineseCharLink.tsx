import { Link, Popover } from '@mui/material'
import { useRef, useState } from 'react'
import { FlashbackPreview } from './FlashbackPreview'

export function ChineseCharLink({
  charChinese,
  keyword,
  pinyin,
  primitiveMeaning,
}: {
  charChinese: string
  keyword?: string
  pinyin?: string
  primitiveMeaning?: string
}) {
  const anchorEl = useRef(null)
  const [open, setOpen] = useState(false)

  return (
    <>
      <Link
        typography='chineseNormal'
        onClick={() => console.log(`navigate to ${charChinese}`)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        ref={anchorEl}
      >
        {charChinese}
      </Link>

      <Popover
        anchorEl={anchorEl.current}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        elevation={0}
        marginThreshold={2}
        PaperProps={{
          onMouseEnter: () => setOpen(true),
          onMouseLeave: () => setOpen(false),
          style: { backgroundColor: 'transparent', overflow: 'visible' },
        }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ pointerEvents: 'none' }}
        {...{ open }}
      >
        <FlashbackPreview {...{ charChinese, keyword, pinyin, primitiveMeaning }} />
      </Popover>
    </>
  )
}
