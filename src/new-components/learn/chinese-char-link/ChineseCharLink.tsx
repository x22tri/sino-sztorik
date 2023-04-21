import { Link, Popover, useTheme } from '@mui/material'
import { useRef, useState } from 'react'
import { FlashbackPreview } from './FlashbackPreview'

export function ChineseCharLink({ char }: { char: string }) {
  const anchorEl = useRef(null)
  const [open, setOpen] = useState(false)
  const { constants } = useTheme()

  return (
    <>
      <Link typography='chineseNormal' onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} ref={anchorEl}>
        {char}
      </Link>

      <Popover
        anchorEl={anchorEl.current}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        marginThreshold={2}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        PaperProps={{
          onMouseEnter: () => setOpen(true),
          onMouseLeave: () => setOpen(false),
          style: { boxShadow: constants.boxShadow },
        }}
        sx={{ pointerEvents: 'none' }}
        {...{ open }}
      >
        <FlashbackPreview charChinese={char} pinyin='yi' keyword='egy' primitiveMeaning='plafon' />
      </Popover>
    </>
  )
}
