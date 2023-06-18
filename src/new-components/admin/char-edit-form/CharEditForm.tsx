import { Box, Button } from '@mui/material'
import { FormContainer } from 'react-hook-form-mui'
import { ADMIN_CANCEL_SAVE, ADMIN_SAVE_CHANGES } from '../../shared/strings'
import { mergePreviousTiers } from '../admin-content/AdminContent'
import { LocationInLesson } from '../admin-content/LocationInLesson'
import { CharacterSection } from '../admin-content/sections/CharacterSection'
import { useLoaderData, useSearchParams } from 'react-router-dom'
import { DiffedCharacterEntry } from '../../shared/logic/loadAdminChar'
import { useEffect } from 'react'
import { useStore } from '../../shared/logic/useStore'

export function CharEditForm() {
  const { setPrevTiers } = useStore('adminChar')
  const { character } = useLoaderData() as { character: DiffedCharacterEntry }
  const [searchParams] = useSearchParams()
  const activeTier = Number(searchParams.get('tier'))

  useEffect(() => {
    setPrevTiers(!!(activeTier - 1) ? mergePreviousTiers(character, activeTier - 1) : {})
  }, [activeTier])

  return (
    <>
      <LocationInLesson
        tier={activeTier}
        lessonNumber={character.lessonNumber}
        index={character.variants[activeTier - 1]?.index ?? 0}
      />

      <FormContainer defaultValues={mergePreviousTiers(character, activeTier)} onSuccess={(data: any) => console.log(data)}>
        <CharacterSection />

        <Box alignItems='center' display='flex' gap={2} justifyContent='flex-end'>
          <Button variant='text'>{ADMIN_CANCEL_SAVE}</Button>
          <Button type='submit' variant='contained'>
            {ADMIN_SAVE_CHANGES}
          </Button>
        </Box>
      </FormContainer>
    </>
  )
}
