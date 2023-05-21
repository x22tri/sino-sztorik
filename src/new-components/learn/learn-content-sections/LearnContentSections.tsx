import Box from '@mui/material/Box'
import { When } from 'react-if'
import { Character, Constituent, OtherUse, Paragraph, Phrase } from '../../shared/interfaces'
import { LEARN_HEADING_CHARACTER, LEARN_HEADING_STORY, LEARN_SUBHEADING_CONSTITUENTS } from '../../shared/strings'
import { ConstituentList } from '../ConstituentList'
import { Subheading } from '../subheading/Subheading'
import Story from '../story/Story'
import { Heading } from '../subheading/Heading'
import { Presentation } from '../presentation/Presentation'
import { PhrasesAndOtherUses } from '../phrases-and-other-uses/PhrasesAndOtherUses'
import { Frequency } from '../frequency/Frequency'

export function CharacterSection({ currentChar }: { currentChar: Character }) {
  const { frequency } = currentChar

  return (
    <>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Heading title={LEARN_HEADING_CHARACTER} />

        <When condition={frequency}>
          <Frequency frequency={frequency!} />
        </When>
      </Box>

      <Presentation {...{ currentChar }} />
    </>
  )
}

export function ConstituentsSection({ constituents }: { constituents?: Constituent[] }) {
  return (
    <When condition={!!constituents}>
      <Subheading title={LEARN_SUBHEADING_CONSTITUENTS} />
      <ConstituentList constituents={constituents!} />
    </When>
  )
}

export function StorySection({ story }: { story: Paragraph[] }) {
  return (
    <>
      <Heading title={LEARN_HEADING_STORY} />
      <Story {...{ story }} />
    </>
  )
}

export function PhrasesAndOtherUsesSection({
  currentChar,
  otherUses,
  phrases,
}: {
  currentChar: string
  otherUses?: OtherUse[]
  phrases?: Phrase[]
}) {
  return (
    <When condition={phrases?.length || otherUses?.length}>
      <PhrasesAndOtherUses {...{ currentChar, otherUses, phrases }} />
    </When>
  )
}
