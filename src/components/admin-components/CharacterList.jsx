import { useState, useEffect } from 'react'
import { useParams, useOutletContext, useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/system'

import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartColumn } from '@fortawesome/free-solid-svg-icons'

import ListWrapper from './ListWrapper'

const CharacterList = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const [lessonState] = useOutletContext()
  const { lessonId } = useParams()
  // const [changesMade, setChangesMade] = useState(false)

  const frequencyCheck = frequency => {
    if (typeof frequency !== 'number')
      return [theme.palette.secondary.unknownCharacter, 'Nem elérhető']
    else if (frequency < 500)
      return [theme.palette.secondary.veryCommonCharacter, 'Nagyon gyakori']
    else if (frequency < 1000)
      return [theme.palette.secondary.quiteCommonCharacter, 'Elég gyakori']
    else if (frequency < 1500)
      return [theme.palette.secondary.commonCharacter, 'Gyakori']
    else if (frequency < 2000)
      return [theme.palette.secondary.uncommonCharacter, 'Nem gyakori']
    else if (frequency < 3000)
      return [theme.palette.secondary.rareCharacter, 'Elég ritka']
    else return [theme.palette.secondary.veryRareCharacter, 'Ritka']
  }

  // Setting up the grid columns.
  const characterGridColumns = [
    { field: 'indexInLesson', headerName: 'Sorrend', width: 110 },
    { field: 'charId', headerName: 'Karakter azonosítója', width: 160 },
    {
      field: 'charChinese',
      headerName: 'Írásjel',
      width: 70,
      renderCell: params => params.row.character.charChinese,
    },
    {
      field: 'keyword',
      headerName: 'Kulcsszó',
      width: 150,
      renderCell: params => (
        <Box color={theme.palette.primary.dark}>
          {params.row.character.keyword}
        </Box>
      ),
    },
    {
      field: 'primitiveMeaning',
      headerName: 'Alapelemként',
      width: 150,
      renderCell: params => (
        <Box color={theme.palette.tertiary.main}>
          {params.row.character.primitiveMeaning}
        </Box>
      ),
    },
    {
      field: 'story',
      headerName: 'Történet',
      width: 300,
      renderCell: params => params.row.character.story,
    },
    {
      field: 'frequency',
      headerName: 'Gyakoriság',
      width: 100,
      renderCell: params =>
        params.row.character.frequency && (
          <Box margin='auto'>
            <FontAwesomeIcon
              icon={faChartColumn}
              size='xl'
              color={frequencyCheck(params.row.character.frequency)[0]}
            />
          </Box>
        ),
    },
    {
      field: 'pinyin',
      headerName: 'Kiejtés',
      width: 70,
      renderCell: params => params.row.character.pinyin,
    },
    { field: 'tier', headerName: 'Kör', width: 30 },
    { field: 'orderId', headerName: 'Bejegyzés azonosítója', width: 200 },
  ]

  // On mount, populate the grid.
  const [characterGridRows, setCharacterGridRows] = useState([])

  try {
    useEffect(() => {
      let lesson
      if (lessonState && +lessonId)
        lesson = lessonState.find(
          lessonObject => lessonObject.lessonNumber === +lessonId
        )

      let allCharactersArray = []
      if (lesson?.tiers) {
        for (let i = 0; i < lesson.tiers.length; i++) {
          if (lesson.tiers[i]?.characters) {
            allCharactersArray = [
              ...allCharactersArray,
              ...lesson.tiers[i].characters,
            ]
          }
        }
        setCharacterGridRows(allCharactersArray)
      }
    }, [lessonState, lessonId])
  } catch (err) {
    console.log(err)
  }

  if (!lessonState || !lessonId) return null
  else
    return (
      <ListWrapper title={`${lessonId}. lecke karakterei`}>
        <DataGrid
          autoHeight
          rows={characterGridRows}
          columns={characterGridColumns}
          getRowId={row => row.orderId}
          initialState={{
            sorting: { sortModel: [{ field: 'indexInLesson', sort: 'asc' }] },
          }}
          getRowClassName={params => `data-grid-tier-bg--${params.row.tier}`}
          disableSelectionOnClick
          onCellClick={(_, event) => {
            event.defaultMuiPrevented = true
          }}
          onRowClick={row =>
            navigate(`/admin/character/${row.row.charId}`, {
              state: { row: row.row },
            })
          }
        />
      </ListWrapper>
    )
}

export default CharacterList
