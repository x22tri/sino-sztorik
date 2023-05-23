import { Box, Link, Popover, useTheme } from '@mui/material'
import { useRef, useState } from 'react'
import { When } from 'react-if'
import { faCube } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function ChineseCharLink({
  charChinese,
  currentChar,
  keyword,
  pinyin,
  primitiveMeaning,
}: {
  charChinese: string
  currentChar: string
  keyword?: string
  pinyin?: string
  primitiveMeaning?: string
}) {
  const anchorEl = useRef(null)
  const [open, setOpen] = useState(false)
  const { constants, spacing } = useTheme()

  const isCurrentChar = currentChar === charChinese

  return (
    <>
      <Box component='ruby' minWidth='42px' textAlign='center'>
        <Link
          display='inline-block'
          onClick={() => console.log(`navigate to ${charChinese}`)}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          ref={anchorEl}
          typography='chineseText'
          fontWeight={isCurrentChar ? 500 : 400}
        >
          {charChinese}
        </Link>
        <rp>(</rp>
        <Box component='rt' fontWeight={isCurrentChar ? 500 : 400} typography='pinyin' marginBottom={spacing(1)}>
          {pinyin}
        </Box>
        <rp>)</rp>
      </Box>

      <Popover
        anchorEl={anchorEl.current}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        marginThreshold={2}
        PaperProps={{
          onMouseEnter: () => setOpen(true),
          onMouseLeave: () => setOpen(false),
          style: {
            boxShadow: constants.boxShadow,
            borderRadius: spacing(1.5),
            display: 'flex',
            flexDirection: 'column',
            marginTop: spacing(1),
            minWidth: '100px',
            padding: spacing(1),
            pointerEvents: 'auto',
            textAlign: 'center',
          },
        }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ pointerEvents: 'none' }}
        {...{ open }}
      >
        <CharLinkPopoverContent {...{ keyword, primitiveMeaning }} />
      </Popover>
    </>
  )
}

function CharLinkPopoverContent({ keyword, primitiveMeaning }: { keyword?: string; primitiveMeaning?: string }) {
  const { palette, spacing } = useTheme()

  return (
    <>
      <When condition={keyword}>
        <Box fontWeight='bold' gridArea='keyword' marginBottom={0.5}>
          {keyword}
        </Box>
      </When>

      <When condition={primitiveMeaning}>
        <Box fontStyle='italic' gridArea='primitive' marginBottom={0.5}>
          <FontAwesomeIcon
            icon={faCube}
            color={palette.secondary.main}
            size='xs'
            style={{ marginBottom: '2px', marginRight: spacing(0.5), verticalAlign: 'middle' }}
          />
          {primitiveMeaning}
        </Box>
      </When>
    </>
  )
}
