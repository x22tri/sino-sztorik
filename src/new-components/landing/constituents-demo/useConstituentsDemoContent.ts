import { Character } from '../../shared/interfaces'
import useTranslation from '../../shared/localization/useTranslation'

export type DemoContentRelationshipChar = Pick<Character, 'keyword' | 'glyph'>
type DemoContentRelationships = { children?: DemoContentRelationshipChar[]; parents?: DemoContentRelationshipChar[] }
export type DemoContentChar = Pick<Character, 'keyword' | 'glyph' | 'story'> & DemoContentRelationships

export function useConstituentsDemoContent(): DemoContentChar[] {
  const strings = useTranslation()

  const { constituentsDemo } = strings.landing.section1

  return [
    {
      glyph: '月',
      children: [{ glyph: '朋', keyword: constituentsDemo.companion.keyword }],
      keyword: constituentsDemo.moon.keyword,
      story: constituentsDemo.moon.story,
    },
    {
      glyph: '朋',
      children: [{ glyph: '崩', keyword: constituentsDemo.crumble.keyword }],
      keyword: constituentsDemo.companion.keyword,
      parents: [
        { glyph: '月', keyword: constituentsDemo.moon.keyword },
        { glyph: '月', keyword: constituentsDemo.moon.keyword },
      ],
      story: constituentsDemo.companion.story,
    },
    {
      glyph: '山',
      children: [{ glyph: '崩', keyword: constituentsDemo.crumble.keyword }],
      keyword: constituentsDemo.mountain.keyword,
      story: constituentsDemo.mountain.story,
    },
    {
      glyph: '崩',
      keyword: constituentsDemo.crumble.keyword,
      parents: [
        { glyph: '山', keyword: constituentsDemo.mountain.keyword },
        { glyph: '朋', keyword: constituentsDemo.companion.keyword },
      ],
      story: constituentsDemo.crumble.story,
    },
  ]
}
