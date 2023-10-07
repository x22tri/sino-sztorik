import { Params } from 'react-router-dom'
import { ReferencedChar, Character } from '../interfaces'

export type LoadCharacters = (ReferencedChar & Pick<Character, 'pinyin'> & { tiers: number[] })[]

export function loadCharacters({ params }: { params: Params }): LoadCharacters {
  // To-Do: Fetch from database by lesson number in params.

  return [
    {
      glyph: '一',
      keyword: 'egy',
      pinyin: 'yī',
      primitive: 'plafon, padló',
      tiers: [1, 2],
    },
    {
      glyph: '二',
      keyword: 'kettő',
      pinyin: 'èr',
      tiers: [4],
    },
    {
      glyph: '三',
      keyword: 'három',
      pinyin: 'sān',
      tiers: [1, 2],
    },
    {
      glyph: '四',
      keyword: 'négy',
      pinyin: 'sì',
      tiers: [3],
    },
    {
      glyph: '五',
      keyword: 'öt',
      pinyin: 'wǔ',
      tiers: [2],
    },
    {
      glyph: '六',
      keyword: 'hat',
      pinyin: 'liù',
      tiers: [1],
    },
    {
      glyph: '七',
      keyword: 'hét',
      pinyin: 'qī',
      primitive: 'hétfelé darabol',
      tiers: [2],
    },
    {
      glyph: '八',
      keyword: 'nyolc',
      pinyin: 'bā',
      primitive: 'lyuk',
      tiers: [1, 2],
    },
  ]
}
