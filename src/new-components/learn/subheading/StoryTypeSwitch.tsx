import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines, faVideo } from '@fortawesome/free-solid-svg-icons'
import { LightenOnHoverButton } from '../../shared/components/LightenOnHoverButton'

export function StoryTypeSwitch() {
  const storyTypeDictionary = {
    text: { icon: faFileLines, label: 'Szöveg' },
    video: { icon: faVideo, label: 'Videó' },
  }

  type switchKey = keyof typeof storyTypeDictionary

  const [storyType] = useState<switchKey>('video')

  const { icon, label } = storyTypeDictionary[storyType]

  return (
    <LightenOnHoverButton color='neutral' size='small' startIcon={<FontAwesomeIcon {...{ icon }} />}>
      {label}
    </LightenOnHoverButton>
  )
}
