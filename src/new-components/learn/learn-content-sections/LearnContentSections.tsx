import Box from '@mui/material/Box'
import { When } from 'react-if'
import {
  Character,
  OtherUse,
  Paragraph,
  Phrase,
  ReferencedChar,
  SimilarAppearance,
  SimilarMeaning,
} from '../../shared/interfaces'
import {
  LEARN_HEADING_CHARACTER,
  LEARN_HEADING_STORY,
  LEARN_SUBHEADING_CONSTITUENTS,
  LEARN_SUBHEADING_SIMILAR_APPEARANCE,
  LEARN_SUBHEADING_SIMILAR_MEANING,
} from '../../shared/strings'
import { ConstituentList, SimilarAppearanceList, SimilarMeaningList } from '../char-button-list/CharButtonList'
import { Subheading } from '../headings/Subheading'
import Story from '../story/Story'
import { Heading } from '../headings/Heading'
import { Presentation } from '../presentation/Presentation'
import { PhrasesAndOtherUses } from '../phrases-and-other-uses/PhrasesAndOtherUses'
import { Frequency } from '../frequency/Frequency'

export function CharacterSection({ currentChar }: { currentChar: Character }) {
  const { frequency } = currentChar

  return (
    <>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Heading title={LEARN_HEADING_CHARACTER} styles={{ mt: 0 }} />

        <When condition={frequency}>
          <Frequency frequency={frequency!} />
        </When>
      </Box>

      <Presentation {...{ currentChar }} />
    </>
  )
}

export function ConstituentsSection({ constituents }: { constituents?: ReferencedChar[] }) {
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

export function SimilarMeaningSection({ similarMeaning }: { similarMeaning?: SimilarMeaning[] }) {
  return (
    <When condition={similarMeaning?.length}>
      <Subheading title={LEARN_SUBHEADING_SIMILAR_MEANING} />
      <SimilarMeaningList similarMeaning={similarMeaning!} />
    </When>
  )
}

export function SimilarAppearanceSection({ similarAppearance }: { similarAppearance?: SimilarAppearance[] }) {
  return (
    <When condition={similarAppearance?.length}>
      <Subheading title={LEARN_SUBHEADING_SIMILAR_APPEARANCE} />
      <SimilarAppearanceList similarAppearance={similarAppearance!} />
    </When>
  )
}
