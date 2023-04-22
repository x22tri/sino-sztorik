import { Link, Popover } from '@mui/material'
import { useRef, useState } from 'react'
import { FlashbackPreview } from './FlashbackPreview'

export function ChineseCharLink({ char }: { char: string }) {
  const anchorEl = useRef(null)
  const [open, setOpen] = useState(false)

  return (
    <>
      <Link typography='chineseNormal' onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} ref={anchorEl}>
        {char}
      </Link>

      <Popover
        anchorEl={anchorEl.current}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        elevation={0}
        marginThreshold={2}
        PaperProps={{
          onMouseEnter: () => setOpen(true),
          onMouseLeave: () => setOpen(false),
          style: { backgroundColor: 'transparent' },
        }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ pointerEvents: 'none' }}
        {...{ open }}
      >
        <FlashbackPreview charChinese={char} pinyin='yi' keyword='egy' primitiveMeaning='plafon' />
      </Popover>
    </>
  )
}
