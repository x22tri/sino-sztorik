import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import { AdminBreadcrumbs } from '../../../shared/components/AdminBreadcrumbs'
import { AdminAppbar } from '../../shared/AdminAppbar'
import { PreviousStep } from '../../shared/PreviousStep'
import { Link as RouterLink, useLoaderData, useParams, useRouteLoaderData } from 'react-router-dom'
import { LoadLessonEdit } from '../../../shared/route-loaders/loadLessonEdit'
import { LoadCharacters } from '../../../shared/route-loaders/loadCharacters'
import { KeywordPrimitiveRow } from '../../../shared/components/KeywordPrimitiveRow'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp, faXmark } from '@fortawesome/free-solid-svg-icons'
import { SaveOrReset } from '../../shared/SaveOrReset'
import { useState } from 'react'

export function Characters() {
  const { constants, palette, spacing } = useTheme()
  const params = useParams()
  const lessonNumber = Number(params.lessonNumber)
  const savedCharacters = useLoaderData() as LoadCharacters
  const [characters, setCharacters] = useState(savedCharacters)

  function move(from: number, to: number) {
    const result: LoadCharacters = [...characters]

    const temp = result[to]

    result[to] = result[from]

    result[from] = temp

    setCharacters(result)
  }

  function save() {
    console.log(characters)
  }

  function reset() {
    setCharacters(savedCharacters)
  }

  return (
    <>
      <AdminAppbar />

      <AdminBreadcrumbs
        currentMenuItem='Összes karakter'
        hierarchy={[
          { href: '../../..', text: 'Kezelőközpont' },
          { href: '../..', text: 'Leckék' },
          { href: '..', text: `Áttekintés (${lessonNumber}. lecke)` },
        ]}
      />

      <Box maxWidth={constants.maxContentWidth} mx='auto' mt={4} p={2}>
        <Box ml={{ xs: 0, md: `${constants.drawerWidth}px` }}>
          <PreviousStep link='..' text={`Áttekintés (${lessonNumber}. lecke)`} />

          <Typography variant='h4' mt={2}>
            Összes karakter a leckében
          </Typography>

          <List>
            {characters.map((character, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <Stack alignItems='center' direction='row' gap={1}>
                    <Stack direction='row' gap={0.5} mr={1}>
                      {[1, 2, 3, 4].map(tier => {
                        const isInTier = character.tiers.includes(tier)

                        return (
                          <Typography
                            color={isInTier ? 'text.secondary' : 'text.disabled'}
                            fontWeight={isInTier ? 'bold' : 'normal'}
                            variant='body2'
                          >
                            {tier}
                          </Typography>
                        )
                      })}
                    </Stack>

                    <Divider flexItem orientation='vertical' variant='middle' />

                    <IconButton
                      edge='end'
                      onClick={() => move(index, index - 1)}
                      sx={{ visibility: index === 0 ? 'hidden' : 'visible' }}
                    >
                      <FontAwesomeIcon icon={faArrowUp} transform='shrink-4' />
                    </IconButton>

                    <IconButton
                      edge='end'
                      onClick={() => move(index, index + 1)}
                      sx={{ visibility: index === characters.length - 1 ? 'hidden' : 'visible' }}
                    >
                      <FontAwesomeIcon icon={faArrowDown} transform='shrink-4' />
                    </IconButton>

                    <IconButton edge='end' onClick={() => {}}>
                      <FontAwesomeIcon color={palette.error.main} icon={faXmark} transform='shrink-4' />
                    </IconButton>
                  </Stack>
                }
              >
                <ListItemIcon>
                  <Typography
                    component={RouterLink}
                    to={`/admin/characters/${character.glyph}`}
                    variant='chineseText'
                    sx={{ color: 'primary.main', textDecoration: 'none' }}
                  >
                    {character.glyph}
                  </Typography>
                </ListItemIcon>

                <KeywordPrimitiveRow keyword={character.keyword} primitive={character.primitive} />
              </ListItem>
            ))}
          </List>

          <SaveOrReset {...{ reset, save }} />
        </Box>
      </Box>
    </>
  )
}
