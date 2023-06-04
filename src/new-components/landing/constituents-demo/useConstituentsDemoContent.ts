import { Character } from '../../shared/interfaces'
import useTranslation from '../../shared/localization/useTranslation'

export type DemoContentRelationshipChar = Pick<Character, 'keyword' | 'charChinese'>
type DemoContentRelationships = { children?: DemoContentRelationshipChar[]; parents?: DemoContentRelationshipChar[] }
export type DemoContentChar = Pick<Character, 'keyword' | 'charChinese' | 'story'> & DemoContentRelationships

export function useConstituentsDemoContent(): DemoContentChar[] {
  const strings = useTranslation()

  const { constituentsDemo } = strings.landing.section1

  return [
    {
      charChinese: '月',
      children: [{ charChinese: '朋', keyword: constituentsDemo.companion.keyword }],
      keyword: constituentsDemo.moon.keyword,
      story: constituentsDemo.moon.story,
    },
    {
      charChinese: '朋',
      children: [{ charChinese: '崩', keyword: constituentsDemo.crumble.keyword }],
      keyword: constituentsDemo.companion.keyword,
      parents: [
        { charChinese: '月', keyword: constituentsDemo.moon.keyword },
        { charChinese: '月', keyword: constituentsDemo.moon.keyword },
      ],
      story: constituentsDemo.companion.story,
    },
    {
      charChinese: '山',
      children: [{ charChinese: '崩', keyword: constituentsDemo.crumble.keyword }],
      keyword: constituentsDemo.mountain.keyword,
      story: constituentsDemo.mountain.story,
    },
    {
      charChinese: '崩',
      keyword: constituentsDemo.crumble.keyword,
      parents: [
        { charChinese: '山', keyword: constituentsDemo.mountain.keyword },
        { charChinese: '朋', keyword: constituentsDemo.companion.keyword },
      ],
      story: constituentsDemo.crumble.story,
    },
  ]
}
