import { faCube, faKey, faShareFromSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, Divider, Paper, useTheme } from '@mui/material'
import { When } from 'react-if'

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
  const { palette } = useTheme()
  return (
    <Box
      sx={{
        display: 'grid',
        columnGap: 1,
        gridTemplateAreas: `
    "pinyin pinyin pinyin"
    "char char char"
    "divider divider divider"
    "key keyword ."
    "cube primitive ."
    "button button button"
    `,
        gridTemplateColumns: '12px auto 12px',
        textAlign: 'center',
        p: 1,
        pointerEvents: 'auto',
      }}
    >
      <When condition={pinyin}>
        <Box typography='presentation.pinyin' gridArea='pinyin' textAlign='center'>
          {pinyin}
        </Box>
      </When>

      <Box typography='chineseNormal' fontSize='200%' marginBottom={1} gridArea='char' textAlign='center'>
        {charChinese}
      </Box>

      <Divider sx={{ gridArea: 'divider', mb: 1 }} />

      <When condition={keyword}>
        <FontAwesomeIcon icon={faKey} color={palette.primary.main} size='xs' style={{ margin: 'auto', gridArea: 'key' }} />
        <Box fontWeight='bold' gridArea='keyword'>
          {keyword}
        </Box>
      </When>

      <When condition={primitiveMeaning}>
        <FontAwesomeIcon icon={faCube} color={palette.secondary.main} size='xs' style={{ margin: 'auto', gridArea: 'cube' }} />
        <Box fontStyle='italic' gridArea='primitive' textAlign='center'>
          {primitiveMeaning}
        </Box>
      </When>

      <Button
        variant='contained'
        endIcon={<FontAwesomeIcon icon={faShareFromSquare} size='xs' />}
        sx={{ m: -1, mt: 1, gridArea: 'button' }}
      >
        Ugrás
      </Button>
    </Box>
  )
}
