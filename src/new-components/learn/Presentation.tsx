import { ReactNode, FC, ElementType } from 'react'
import Box, { BoxProps } from '@mui/material/Box'
import { Display } from '../shared/utility-components'
import Stack from '@mui/material/Stack'
import { Character, ChipType, ChipIds, ChipId } from '../shared/interfaces'
import { chipConfig } from './info-chips/chipConfig'
import { LearnActionButton } from '../shared/basic-components'
import IconButton from '@mui/material/IconButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type PresentationKey = 'charChinese' | 'keyword' | 'pinyin' | 'primitiveMeaning'

type ChipKey = 'newPrimitive' | 'productivePhonetic' | 'reminder'

type PresentationType = Pick<Character, PresentationKey>

type ChipTypeX = Pick<Character, ChipKey>

export function Presentation(
  //   {
  //   charChinese,
  //   keyword,
  //   pinyin,
  //   primitiveMeaning,
  // }: PresentationType & ChipTypeX
  { char }: { char: Character }
) {
  const { FREQUENCY, NEW_PRIMITIVE, PREQUEL, PRODUCTIVE_PHONETIC, REMINDER } =
    ChipIds

  return (
    <Box
      display='grid'
      gridTemplateColumns='minmax(0, 1fr) repeat(1, auto) 1fr'
      justifyItems='center'
      alignItems='center'
    >
      <PresentationRow
        // for={pinyin}
        for='pinyin'
        chips={[PRODUCTIVE_PHONETIC]}
        // meh='pinyin'
        styling={{ fontStyle: 'italic', fontSize: '90%' }}
        {...{ char }}
      />

      <PresentationRow
        for='charChinese'
        styling={{ typography: 'chineseHeading', mb: 1 }}
        {...{ char }}
      />

      <PresentationRow
        for='keyword'
        chips={[REMINDER]}
        styling={{ typography: 'h4', color: 'primary.main' }}
        {...{ char }}
      />

      <PresentationRow
        for='primitiveMeaning'
        chips={[NEW_PRIMITIVE]}
        styling={{ typography: 'primitiveMeaning' }}
        {...{ char }}
      />
    </Box>
  )
}

function PresentationBox<B extends ElementType>(
  props: BoxProps<B, { component?: B }>
) {
  return <Box {...props}>{props.children}</Box>
}

interface PresentationRowProps {
  chips?: ChipId[]
  char: Character
  for: PresentationKey
  styling?: BoxProps
}

const PresentationRow: FC<PresentationRowProps> = ({
  for: presentationKey,
  chips,
  styling,
  char,
}) => {
  const element = char[presentationKey]

  const chipArray = !chips?.length
    ? []
    : chipConfig.filter(({ id }) => chips.includes(id) && id in char)

  return (
    <Display if={element}>
      <>
        <span></span>

        <PresentationBox sx={styling}>{element}</PresentationBox>

        <Stack display='flex' justifySelf='flex-end' gap={1}>
          {chipArray.map(({ icon, label }, index) => (
            // <LearnActionButton
            //   color='neutral'
            //   key={index}
            //   {...{ icon, label }}
            // />
            <IconButton key={index} size='small'>
              <FontAwesomeIcon {...{ icon }} />
            </IconButton>
          ))}
        </Stack>
      </>
    </Display>
  )
}
