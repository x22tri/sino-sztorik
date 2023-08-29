import { faCube } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ListItemText, Typography, Divider, useTheme } from '@mui/material'
import { When } from 'react-if'

export function KeywordPrimitiveRow({
  emphasizePrimitive = false,
  keyword,
  primitive,
  small = false,
}: {
  emphasizePrimitive?: boolean
  keyword?: string
  primitive?: string
  small?: boolean
}) {
  const { palette, spacing } = useTheme()

  return (
    <ListItemText
      sx={{ '.MuiListItemText-primary': { display: 'flex', flexDirection: 'row', fontSize: small ? '90%' : undefined, gap: 1 } }}
    >
      <When condition={keyword}>
        <Typography component='span' fontWeight={emphasizePrimitive ? 'normal' : 'bold'} fontSize='inherit'>
          {keyword}
        </Typography>
      </When>

      <When condition={keyword && primitive}>
        <Divider orientation='vertical' flexItem />
      </When>

      <When condition={primitive}>
        <Typography component='span' fontStyle='italic' fontSize='inherit' fontWeight={emphasizePrimitive ? 'bold' : 'normal'}>
          <FontAwesomeIcon
            color={palette.secondary.main}
            icon={faCube}
            size='xs'
            style={{ marginBottom: '2px', marginRight: spacing(0.5), verticalAlign: 'middle' }}
          />
          {primitive}
        </Typography>
      </When>
    </ListItemText>
  )
}
