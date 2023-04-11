import { Box, IconButton, useTheme } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'
import { LearnButton } from './LearnButton'
import { AssembledLesson } from '../../shared/interfaces'
import { CHARACTER_AMOUNT_LABEL, LESSON_START_MORE_OPTIONS } from '../../shared/strings'
import ToolbarButton from '../../shared/components/ToolbarButton'
import { useLargeScreen } from '../../shared/hooks/useLargeScreen'

export function LessonStartMobile({ lesson }: { lesson: AssembledLesson }) {
  const isSmallScreen = useSmallScreen()
  const isLargeScreen = useLargeScreen()
  const { constants, palette, spacing } = useTheme()
  const { characters } = lesson

  return (
    <Box
      bottom={0}
      display='grid'
      // gap={2}
      gridTemplateColumns={isLargeScreen ? '3fr 1fr' : '1fr 1fr 1fr'}
      height={constants.lessonStartMobileHeight}
      // paddingY={1}
      // paddingX={2}
      // position='fixed'
      position='sticky'
      // width={isSmallScreen ? '100%' : `calc(100% - ${constants.drawerWidth}px)`}
      width='100%'
      zIndex={100000}
      sx={{
        backgroundColor: palette.background.paper,
        boxShadow: isSmallScreen ? 'rgba(0, 0, 0, 0.1) 0px -2px 15px -3px' : 'none',
      }}
    >
      {isLargeScreen ? null : <Box />}

      <LearnButton secondaryText={`${characters.length} ${CHARACTER_AMOUNT_LABEL}`} />

      <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', marginLeft: 'auto', width: '37px' }}>
        <ToolbarButton
          ariaLabel={LESSON_START_MORE_OPTIONS}
          icon={faEllipsisVertical}
          onClick={() => {}}
          tooltip={LESSON_START_MORE_OPTIONS}
        />
      </Box>
    </Box>
  )
}
