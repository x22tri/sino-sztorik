import Box from '@mui/material/Box'
import { Badge, SxProps, useTheme } from '@mui/material'
import { KeywordExplanation } from './KeywordExplanation'
import { Else, If, Then, When } from 'react-if'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition, faBell, faCube, faCubesStacked, faVolumeDown } from '@fortawesome/free-solid-svg-icons'
import { LearnPopover } from '../../shared/components/LearnPopover'
import { useState, MouseEvent, TouchEvent, ReactNode } from 'react'
import {
  INFO_CHIP_NEW_PRIMITIVE_EXPLANATION,
  INFO_CHIP_PRODUCTIVE_PHONETIC_EXPLANATION,
  INFO_CHIP_REMINDER_EXPLANATION,
} from '../../shared/strings'
import { Character } from '../../shared/interfaces'

export function Presentation({ currentChar }: { currentChar: Character }) {
  const { palette, spacing } = useTheme()

  const { charChinese, explanation, keyword, newPrimitive, pinyin, primitiveMeaning, productivePhonetic, reminder } = currentChar

  return (
    <Box display='flex' flexDirection='column' alignItems='center' marginBottom={4}>
      <When condition={pinyin}>
        <SpotlightWrapper
          contentStyles={{ typography: 'presentation.pinyin', mb: 1 }}
          spotlightIf={!!productivePhonetic}
          spotlightConfigKey='productivePhonetic'
        >
          {pinyin}
        </SpotlightWrapper>
      </When>

      <SpotlightWrapper
        contentStyles={{ mb: 2, pb: 1, typography: 'chineseHeading' }}
        spotlightIf={!!reminder}
        spotlightConfigKey='reminder'
      >
        {charChinese}
      </SpotlightWrapper>

      <When condition={keyword}>
        <Box fontSize={32} fontWeight='800' position='relative'>
          {keyword}

          <When condition={explanation}>
            <KeywordExplanation explanation={explanation!} />
          </When>
        </Box>
      </When>

      <When condition={primitiveMeaning}>
        <SpotlightWrapper
          contentStyles={{ fontSize: 20, fontStyle: 'italic' }}
          spotlightIf={!!newPrimitive}
          spotlightConfigKey='newPrimitive'
        >
          <>
            <FontAwesomeIcon
              icon={faCube}
              color={palette.secondary.main}
              size='xs'
              style={{ marginBottom: '2px', marginRight: spacing(0.5), verticalAlign: 'middle' }}
            />
            {primitiveMeaning}
          </>
        </SpotlightWrapper>
      </When>
    </Box>
  )
}

function SpotlightWrapper({
  children,
  contentStyles,
  spotlightIf,
  spotlightConfigKey,
}: {
  children: ReactNode
  contentStyles: SxProps
  spotlightIf: boolean
  spotlightConfigKey: SpotlightConfigKey
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)
  const { icon, popoverText } = spotlightConfig[spotlightConfigKey]

  function openPopover(event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) {
    setAnchorEl(event.currentTarget)
  }

  function closePopover() {
    setAnchorEl(null)
  }

  return (
    <If condition={spotlightIf}>
      <Then>
        <Badge badgeContent={<FontAwesomeIcon size='sm' {...{ icon }} />} color='primary' sx={{ '.MuiBadge-badge': { p: 0 } }}>
          <Box
            onMouseEnter={openPopover}
            onMouseLeave={closePopover}
            sx={{
              border: ({ palette }) => `3px solid ${palette.primary.main}`,
              borderRadius: 2,
              px: 1,
              ':hover': { bgcolor: 'primary.100', cursor: 'help' },
              ...contentStyles,
            }}
          >
            {children}
          </Box>
        </Badge>

        <LearnPopover hover text={popoverText} {...{ anchorEl }} />
      </Then>

      <Else>
        <Box sx={{ ...contentStyles }}>{children}</Box>
      </Else>
    </If>
  )
}

type SpotlightConfigKey = keyof Pick<Character, 'newPrimitive' | 'productivePhonetic' | 'reminder'>
type SpotlightConfigValue = { icon: IconDefinition; popoverText: string }
type SpotlightConfig = Record<SpotlightConfigKey, SpotlightConfigValue>

const spotlightConfig: SpotlightConfig = {
  newPrimitive: {
    icon: faCubesStacked,
    popoverText: INFO_CHIP_NEW_PRIMITIVE_EXPLANATION,
  },
  productivePhonetic: {
    icon: faVolumeDown,
    popoverText: INFO_CHIP_PRODUCTIVE_PHONETIC_EXPLANATION,
  },
  reminder: {
    icon: faBell,
    popoverText: INFO_CHIP_REMINDER_EXPLANATION,
  },
} as const
