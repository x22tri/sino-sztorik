import {
  faCommentDots,
  faBook,
  faEye,
  faLightbulb,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTheme } from '@material-ui/core'
import Box from '@mui/material/Box'

export default function SupplementsOverview({
  otherUses,
}: {
  otherUses?: string[]
}) {
  const { palette } = useTheme()

  const supplementIconDictionary = {
    otherUses: faCommentDots,
    phrases: faBook,
    similarAppearance: faEye,
    similarMeaning: faLightbulb,
  }

  return otherUses === undefined ? null : (
    <Box
      display='flex'
      height='100%'
      position='absolute'
      right={0}
      top={0}
      alignItems='center'
      sx={{ mr: 1, fontWeight: 'bold', color: palette.grey[600] }}
      typography='body2'
    >
      {otherUses.length}
      <FontAwesomeIcon
        icon={supplementIconDictionary.otherUses}
        transform='grow-6'
        style={{ marginLeft: '8px' }}
      />
    </Box>
  )
}
