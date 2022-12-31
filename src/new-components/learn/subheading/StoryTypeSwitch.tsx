import { useState } from 'react'
import { Button, useTheme } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines, faVideo } from '@fortawesome/free-solid-svg-icons'
import { LearnActionButton } from '../../shared-components/LearnActionButton'

export function StoryTypeSwitch() {
  const storyTypeDictionary = {
    text: { icon: faFileLines, label: 'Szöveg' },
    video: { icon: faVideo, label: 'Videó' },
  }

  type switchKey = keyof typeof storyTypeDictionary

  const [storyType, setStoryType] = useState<switchKey>('video')

  const { icon, label } = storyTypeDictionary[storyType]

  return <LearnActionButton color='neutral' {...{ icon, label }} />
}
