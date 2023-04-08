import { Box, IconButton, useTheme } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'
import { LearnButton } from './LearnButton'
import { AssembledLesson } from '../../shared/interfaces'
import { CHARACTER_AMOUNT_LABEL } from '../../shared/strings'

export function LessonStartMobile({ lesson }: { lesson: AssembledLesson }) {
  const isSmallScreen = useSmallScreen()
  const { constants, palette, spacing } = useTheme()
  const { characters } = lesson

  return (
    <Box
      bottom={0}
      display='grid'
      gap={2}
      gridTemplateColumns='1fr 1fr 1fr'
      height={constants.lessonStartBottomHeight}
      marginX={isSmallScreen ? 0 : 2}
      paddingY={1}
      paddingX={2}
      position='fixed'
      width={isSmallScreen ? '100%' : `calc(100% - ${constants.drawerWidth}px - ${spacing(4)})`}
      zIndex={100}
      sx={{
        backgroundColor: palette.common.white,
        borderTopLeftRadius: spacing(1),
        borderTopRightRadius: spacing(1),
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      }}
    >
      <Box />

      <LearnButton secondaryText={`${characters.length} ${CHARACTER_AMOUNT_LABEL}`} />

      <IconButton style={{ margin: 'auto 0 auto auto', width: '48px' }}>
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </IconButton>
    </Box>
  )
}
