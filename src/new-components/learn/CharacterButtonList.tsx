import { List, ListItem, ListItemButton, ListItemIcon, Typography } from '@mui/material'
import { ReferencedChar, SimilarAppearance, SimilarMeaning } from '../shared/interfaces'
import { KeywordPrimitiveRow } from '../shared/components/KeywordPrimitiveRow'
import { useStore } from '../shared/logic/useStore'

export function ConstituentList({ constituents }: { constituents: ReferencedChar[] }) {
  return <CharacterButtonList characters={constituents} color='secondary' />
}

export function SimilarMeaningList({ similarMeaning }: { similarMeaning: SimilarMeaning[] }) {
  return <CharacterButtonList characters={similarMeaning} color='primary' />
}

export function SimilarAppearanceList({ similarAppearance }: { similarAppearance: SimilarAppearance[] }) {
  return <CharacterButtonList characters={similarAppearance} color='primary' />
}

function CharacterButtonList({
  color,
  characters,
}: {
  color: 'primary' | 'secondary'
  characters: ReferencedChar[] | SimilarMeaning[]
}) {
  const { startFlashback } = useStore('flashback')

  return (
    <List disablePadding>
      {characters.map((character, index) => (
        <ListItem disablePadding key={index}>
          <ListItemButton
            onClick={() => startFlashback(character.charChinese)}
            sx={{ borderRadius: 6, ':hover': { bgcolor: color === 'primary' ? 'primary.100' : 'secondary.100' } }}
          >
            <ListItemIcon>
              <Typography variant='chineseNormal' color={color === 'primary' ? 'primary.main' : 'secondary.main'}>
                {character.charChinese}
              </Typography>
            </ListItemIcon>

            <KeywordPrimitiveRow
              emphasizePrimitive={(character as SimilarMeaning).similarToPrimitive}
              keyword={character.keyword}
              primitiveMeaning={character.primitiveMeaning}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}
