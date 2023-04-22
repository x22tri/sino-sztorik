import { faCube, faKey, faShareFromSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, Divider, Paper, useTheme } from '@mui/material'
import { blue } from '@mui/material/colors'
import { When } from 'react-if'
import { JUMP_TO_FLASHBACK_BUTTON } from '../../shared/strings'

export function FlashbackPreview({
  charChinese,
  keyword,
  primitiveMeaning,
  pinyin,
}: {
  charChinese: string
  keyword?: string
  primitiveMeaning?: string
  pinyin?: string
}) {
  const { palette, spacing } = useTheme()

  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'grid',
        rowGap: 0.25,
        gridTemplateAreas: `
        ".    paper"
        ".    paper"
        ".    paper"
        "key  paper"
        "cube paper"
        ".    paper"
        `,
        p: 1,
        pointerEvents: 'auto',
        textAlign: 'center',
      }}
    >
      <Box
        component='span'
        sx={{ bgcolor: palette.grey[50], borderRadius: `${spacing(1)} 0 0 ${spacing(1)}`, gridArea: 'key', px: 0.5 }}
      >
        <FontAwesomeIcon icon={faKey} color='#f6ae2d' size='xs' />
      </Box>

      <Box
        component='span'
        sx={{ bgcolor: palette.grey[50], borderRadius: `${spacing(1)} 0 0 ${spacing(1)}`, gridArea: 'cube', px: 0.5 }}
      >
        <FontAwesomeIcon icon={faCube} color='#3366CC' size='xs' />
      </Box>

      <Paper
        sx={{
          alignItems: 'center',
          display: 'grid',
          borderRadius: 4,
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 15px -3px',
          gridArea: 'paper',
          gridTemplateAreas: `
          "pinyin"
          "char"
          "divider"
          "keyword"
          "primitive"
          "button"
          `,
          gridTemplateRows: 'subgrid',
          p: 1,
        }}
      >
        <When condition={pinyin}>
          <Box typography='presentation.pinyin' gridArea='pinyin' textAlign='center'>
            {pinyin}
          </Box>
        </When>

        <Box typography='chineseNormal' fontSize='200%' gridArea='char' marginBottom={1} textAlign='center'>
          {charChinese}
        </Box>

        <Divider sx={{ gridArea: 'divider', mb: 1 }} />

        <When condition={keyword}>
          <Box fontWeight='bold' gridArea='keyword' sx={{ position: 'relative' }}>
            {keyword}
          </Box>
        </When>

        <When condition={primitiveMeaning}>
          <Box fontStyle='italic' gridArea='primitive' textAlign='center' sx={{ position: 'relative' }}>
            {primitiveMeaning}
          </Box>
        </When>

        <Button
          variant='contained'
          endIcon={<FontAwesomeIcon icon={faShareFromSquare} size='xs' />}
          sx={{ borderRadius: `0 0 ${spacing(2)} ${spacing(2)}`, gridArea: 'button', m: -1, mt: 1 }}
        >
          {JUMP_TO_FLASHBACK_BUTTON}
        </Button>
      </Paper>
    </Box>
  )
}
