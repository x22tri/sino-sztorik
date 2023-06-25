import { SortedOccurrences } from '../../shared/logic/loadAdminChar'

export function getFullOccurrences(occurrences: SortedOccurrences) {
  /* 

occurrence-property mapping:

1) KeywordOnly
(occurrence is 'keyword', no 'primitive' among occurrences - should be no 'primitive' in character)

show all properties: charChinese, constituents, explanation, frequency, lessonNumber, keyword, otherUses, phrases, pinyin, similars

merge with occurrence's index, tier, story

for every reminder: mergePreviousTiers with reminder occurrence's index and tier

2) PrimitiveOnly
(occurrence is 'primitive', no 'keyword' among occurrences - should be no 'keyword' in character)
(you shouldn't be allowed to enter "otherUses", "phrases", "frequency" or "pinyin" if the character has no keyword)
(show warning sign in admin screen on previous step if you have these properties and you have no keyword in timeline?)

show all properties: charChinese, constituents, lessonNumber, primitive, similars
merge with occurrence's index, tier, story

for every reminder: mergePreviousTiers with reminder occurrence's index and tier

3) KeywordAndPrimitive
(occurrence is 'keywordAndPrimitive')

show all properties: charChinese, constituents, explanation, frequency, lessonNumber, keyword, otherUses, phrases, pinyin, primitive, similars
merge with occurrence's index, tier, story

for every reminder: mergePreviousTiers with reminder occurrence's index and tier

4) DelayedKeyword
(occurrence is 'primitive', 'keyword' among later occurrences)
show properties: charChinese, constituents, lessonNumber, primitive
merge with occurrence's index, tier, story

(occurrence is 'keyword', 'primitive' among earlier occurrences)
show all properties: charChinese, constituents, explanation, frequency, lessonNumber, keyword, otherUses, phrases, pinyin, primitive, similars
merge with occurrence's index, tier, story

for every reminder: mergePreviousTiers with reminder occurrence's index and tier

5) DelayedPrimitive
(occurrence is 'keyword', 'primitive' among later occurrences)
show properties: charChinese, constituents, explanation, frequency, lessonNumber, keyword, otherUses, phrases, pinyin, similars
(do not show primitive)
merge with occurrence's index, tier, story

(occurrence is 'primitive', 'keyword' among earlier occurrences)
show all properties: charChinese, constituents, explanation, frequency, lessonNumber, keyword, otherUses, phrases, pinyin, primitive, similars
merge with occurrence's index, tier, story

for every reminder: mergePreviousTiers with reminder occurrence's index and tier

/6 KeywordWithDelayedExposition
currently not supported, but here's how it will work:

(occurrence is 'keywordLite')
show properties: charChinese, frequency, lessonNumber, keyword, pinyin
merge with occurrence's index, tier, story

(occurrence is 'keyword')
show all properties: charChinese, constituents, explanation, frequency, lessonNumber, keyword, otherUses, phrases, pinyin, similars
(primitive not allowed)
merge with occurrence's index, tier, story

---

it seems like if the Create/Update side validation is correct, all character-level properties need to be shown always except when:
I - occurrence is 'primitive', 'keyword' among later occurrences 
(hide explanation, frequency, keyword, otherUses, pinyin, phrases, similars)

II - occurrence is 'keyword', 'primitive' among later occurrences
(hide primitive)

III - occurrence is 'keywordLite' 
(hide constituents, explanation, otherUses, phrases, similars)

(primitive explanation not supported - should be a separate property)

proposed new syntax: 
instead of "type", have "withhold?" property on an occurrence
values: I - keyword, II - primitive, III - constituents

*/
}
