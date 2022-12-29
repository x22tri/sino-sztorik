import { useState } from 'react'
import { Button, useTheme } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines, faVideo } from '@fortawesome/free-solid-svg-icons'

export function StoryTypeSwitch() {
  const { constants } = useTheme()
  const storyTypeDictionary = {
    text: { icon: faFileLines, label: 'Szöveg' },
    video: { icon: faVideo, label: 'Videó' },
  }

  type switchKey = keyof typeof storyTypeDictionary

  const [storyType, setStoryType] = useState<switchKey>('video')

  const { icon, label } = storyTypeDictionary[storyType]

  return (
    <Button
      color='neutral'
      variant='text'
      size='small'
      startIcon={<FontAwesomeIcon {...{ icon }} />}
      sx={{
        transition: `${constants.animationDuration}ms`,
        '&:hover': { backgroundColor: 'inherit', opacity: 0.7 },
      }}
    >
      {label}
    </Button>
  )
}
