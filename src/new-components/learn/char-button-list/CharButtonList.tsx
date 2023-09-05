import { List, ListItem, ListItemButton, ListItemIcon, Typography } from '@mui/material'
import { ReferencedChar, SimilarAppearance, SimilarMeaning } from '../../shared/interfaces'
import { KeywordPrimitiveRow } from '../../shared/components/KeywordPrimitiveRow'
import { useFlashback } from '../store/useFlashback'

export function ConstituentList({ constituents }: { constituents: ReferencedChar[] }) {
  return <CharButtonList characters={constituents} color='secondary' />
}

export function SimilarMeaningList({ similarMeaning }: { similarMeaning: SimilarMeaning[] }) {
  return <CharButtonList characters={similarMeaning} color='primary' />
}

export function SimilarAppearanceList({ similarAppearance }: { similarAppearance: SimilarAppearance[] }) {
  return <CharButtonList characters={similarAppearance} color='primary' />
}

export function SimilarMeaningListDemo({ similarMeaning }: { similarMeaning: SimilarMeaning[] }) {
  return <CharButtonList characters={similarMeaning} color='primary' disabled />
}

export function SimilarAppearanceListDemo({ similarAppearance }: { similarAppearance: SimilarAppearance[] }) {
  return <CharButtonList characters={similarAppearance} color='primary' disabled />
}

function CharButtonList({
  color,
  characters,
  disabled = false,
}: {
  color: 'primary' | 'secondary'
  characters: ReferencedChar[] | SimilarMeaning[]
  disabled?: boolean
}) {
  const { startFlashback } = useFlashback()

  return (
    <List disablePadding>
      {characters.map((character, index) => (
        <ListItem disablePadding key={index}>
          <ListItemButton
            onClick={() => (disabled ? () => {} : startFlashback(character.glyph))}
            sx={{
              borderRadius: 6,
              ':hover': {
                bgcolor: disabled ? 'initial' : color === 'primary' ? 'primary.100' : 'secondary.100',
                cursor: disabled ? 'initial' : 'pointer',
              },
            }}
          >
            <ListItemIcon>
              <Typography variant='chineseText' color={color === 'primary' ? 'primary.main' : 'secondary.main'}>
                {character.glyph}
              </Typography>
            </ListItemIcon>

            <KeywordPrimitiveRow
              emphasizePrimitive={(character as SimilarMeaning).similarToPrimitive}
              keyword={character.keyword}
              primitive={character.primitive}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}
