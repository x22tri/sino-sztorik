import { Box, Link, Popover, useTheme } from '@mui/material'
import { useRef, useState } from 'react'
import { When } from 'react-if'
import { faCube } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function ChineseCharLink({
  glyph,
  currentChar,
  keyword,
  pinyin,
  primitive,
}: {
  glyph: string
  currentChar: string
  keyword?: string
  pinyin?: string
  primitive?: string
}) {
  const anchorEl = useRef(null)
  const [open, setOpen] = useState(false)
  const { constants, spacing } = useTheme()

  const isCurrentChar = currentChar === glyph

  return (
    <>
      <Box component='ruby' minWidth='42px' textAlign='center'>
        <Link
          display='inline-block'
          onClick={() => console.log(`navigate to ${glyph}`)}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          ref={anchorEl}
          typography='chineseText'
          fontWeight={isCurrentChar ? 500 : 400}
        >
          {glyph}
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
        <CharLinkPopoverContent {...{ keyword, primitive }} />
      </Popover>
    </>
  )
}

function CharLinkPopoverContent({ keyword, primitive }: { keyword?: string; primitive?: string }) {
  const { palette, spacing } = useTheme()

  return (
    <>
      <When condition={keyword}>
        <Box fontWeight='bold' gridArea='keyword' marginBottom={0.5}>
          {keyword}
        </Box>
      </When>

      <When condition={primitive}>
        <Box fontStyle='italic' gridArea='primitive' marginBottom={0.5}>
          <FontAwesomeIcon
            icon={faCube}
            color={palette.secondary.main}
            size='xs'
            style={{ marginBottom: '2px', marginRight: spacing(0.5), verticalAlign: 'middle' }}
          />
          {primitive}
        </Box>
      </When>
    </>
  )
}
