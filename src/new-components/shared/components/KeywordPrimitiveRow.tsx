import { faCube } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ListItemText, Typography, Divider, useTheme } from '@mui/material'
import { When } from 'react-if'

export function KeywordPrimitiveRow({
  keyword,
  primitiveMeaning,
  small = false,
}: {
  keyword?: string
  primitiveMeaning?: string
  small?: boolean
}) {
  const { palette, spacing } = useTheme()

  return (
    <ListItemText
      sx={{
        '.MuiListItemText-primary': { display: 'flex', flexDirection: 'row', fontSize: small ? '90%' : undefined, gap: 1 },
      }}
    >
      <When condition={keyword}>
        <Typography component='span' fontWeight='bold' fontSize='inherit'>
          {keyword}
        </Typography>
      </When>

      <When condition={keyword && primitiveMeaning}>
        <Divider orientation='vertical' flexItem />
      </When>

      <When condition={primitiveMeaning}>
        <Typography component='span' fontStyle='italic' fontSize='inherit'>
          <FontAwesomeIcon
            color={palette.secondary.main}
            icon={faCube}
            size='xs'
            style={{ marginBottom: '2px', marginRight: spacing(0.5), verticalAlign: 'middle' }}
          />
          {primitiveMeaning}
        </Typography>
      </When>
    </ListItemText>
  )
}
