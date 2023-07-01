import { Box, Button } from '@mui/material'
import { FormContainer } from 'react-hook-form-mui'
import { ADMIN_CANCEL_SAVE, ADMIN_SAVE_CHANGES } from '../../shared/strings'
import { mergePreviousTiers } from '../admin-content/AdminContent'
import { CharacterSection } from '../admin-content/sections/CharacterSection'
import { useLoaderData, useSearchParams } from 'react-router-dom'
// import { DiffedCharacterEntry } from '../../shared/logic/loadAdminChar'
import { useEffect } from 'react'
import { useStore } from '../../shared/logic/useStore'
import { SortedCharacterEntry } from '../../shared/logic/loadAdminChar'

export function CharEditForm() {
  // const { setPrevTiers } = useStore('adminChar')
  const { character } = useLoaderData() as { character: SortedCharacterEntry }
  const [searchParams] = useSearchParams()
  const activeTier = Number(searchParams.get('tier'))

  // useEffect(() => {
  //   setPrevTiers(!!(activeTier - 1) ? mergePreviousTiers(character.variants, activeTier - 1) : {})
  // }, [activeTier])

  return (
    <>
      <FormContainer defaultValues={character} onSuccess={(data: any) => console.log(data)}>
        <CharacterSection />
      </FormContainer>
    </>
  )
}
