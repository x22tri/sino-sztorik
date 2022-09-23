import { useState, useEffect } from 'react'
import { useTheme } from '@mui/system'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import DeleteIcon from '@mui/icons-material/Delete'

import ListWrapper from './ListWrapper'

const SimilarList = ({ type }) => {
  const theme = useTheme()
  const [searchTermSimilar, setSearchTermSimilar] = useState('')
  const [searchMode, setSearchMode] = useState(null)
  // const [changesMade, setChangesMade] = useState(false)

  // Setting up the grid columns.
  // const characterGridColumns = [
  //     { field: 'similarId', headerName: 'Azonosítószám', width: 130, editable: true},
  //     { field: 'charChinese', headerName: 'Karakter', width: 100, editable: true},
  //     { field: 'similarType', headerName: 'Típus', width: 200, editable: true},
  //     { field: 'similarToPrimitiveMeaning', headerName: 'Az alapelem-jelentése a hasonló?', width: 350, editable: true,
  //         description: 'A karakternek nem a fő, hanem az alapelemként vett jelentése hasonlít a csoport többi tagjára?'
  //     },
  // ]

  // On mount, populate the grid.
  const [characterGridRows, setCharacterGridRows] = useState([])

  try {
    useEffect(() => {
      const fetchSimilars = async () => {
        const similarTable = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/admin/all-similars/${type}`
        )
        const similarJSON = await similarTable.json()
        setCharacterGridRows(similarJSON)
        // console.log(similarJSON)
      }
      fetchSimilars()
    }, [type])
  } catch (err) {
    console.log(err)
  }

  const handleSearch = async (event, similarGroup) => {
    event.nativeEvent.stopImmediatePropagation()
    if (event.key === 'Enter') {
      setSearchTermSimilar('')
      try {
        const searchedCharInfo = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/force-search/${searchTermSimilar}`
        )
        const searchedCharInfoJson = await searchedCharInfo.json()

        // If only one character was found, add it to the similar group.
        if (
          Array.isArray(searchedCharInfoJson) &&
          searchedCharInfoJson.length === 1
        ) {
          let foundChar = searchedCharInfoJson[0]

          setCharacterGridRows(prev => ({
            ...prev,
            [similarGroup]: [
              ...prev[similarGroup],
              {
                similarGroup: similarGroup,
                similarType: 'appearance',
                charChinese: foundChar?.charChinese,
                keyword: foundChar?.keyword,
                primitiveMeaning: foundChar?.primitiveMeaning,
              },
            ],
          }))
        } else {
          // setSearchedChar(searchedCharInfoJson)
          // To-Do: Handle multiple results (implement in LessonSelectAppbar search bar first)
          console.log(searchedCharInfoJson)
        }
        setSearchMode(null)
      } catch (err) {
        console.log(err)
        setSearchMode(null)
      }
    }
  }

  const handleDeleteChar = (similarGroup, similarChar) => {
    setCharacterGridRows(prev => ({
      ...prev,
      [similarGroup]: [...prev[similarGroup]].filter(
        item => item !== similarChar
      ),
    }))
  }

  const handleDeleteLesson = similarGroup => {
    let tempState = { ...characterGridRows }
    delete tempState[similarGroup]
    setCharacterGridRows(tempState)
  }

  return (
    <ListWrapper
      title={
        type === 'meaning'
          ? 'Hasonló jelentésű karakterek'
          : 'Hasonló kinézetű karakterek'
      }
    >
      {Object.keys(characterGridRows).map((similarGroup, index) => (
        <Paper
          key={index}
          variant='outlined'
          sx={{
            backgroundColor: theme.palette.background.taglineSecondary,
            margin: '20px',
            padding: '10px',
            display: 'inline-flex',
            flexDirection: 'column',
            position: 'relative',
            minWidth: '200px',
          }}
        >
          <Box>{similarGroup}. jelű csoport</Box>
          <Box position='absolute' fontSize='10px' right='2px' top='3px'>
            <IconButton onClick={() => handleDeleteLesson(similarGroup)}>
              <DeleteIcon sx={{ fontSize: '18px' }} />
            </IconButton>
          </Box>
          <Divider sx={{ marginTop: '6px', marginBottom: '12px' }} />

          <Box display='flex' textAlign='center' gap={1}>
            {characterGridRows[similarGroup].map ? (
              characterGridRows[similarGroup].map((similarChar, index) => (
                <Paper
                  key={index}
                  sx={{
                    padding: '15px',
                    position: 'relative',
                    backgroundColor:
                      !similarChar.similarId &&
                      theme.palette.background.charSelectAdmin,
                  }}
                >
                  <Box position='absolute' fontSize='10px' left='4px' top='2px'>
                    {similarChar.similarId}
                  </Box>
                  <Typography variant='lessonStartPaperItemChinese'>
                    {similarChar.charChinese}
                  </Typography>
                  <Button
                    size='small'
                    onClick={() => handleDeleteChar(similarGroup, similarChar)}
                    sx={{
                      textTransform: 'none',
                      minWidth: 0,
                      padding: 0,
                      width: '12px',
                      lineHeight: 1.2,
                      color: theme.palette.tertiary.main,
                      position: 'absolute',
                      fontSize: '11px',
                      right: '2px',
                      top: '2px',
                    }}
                  >
                    ×
                  </Button>
                  <Box color={theme.palette.primary.dark}>
                    {similarChar.keyword || ''}
                  </Box>
                  <Box color={theme.palette.tertiary.main}>
                    {similarChar.primitiveMeaning || ''}
                  </Box>
                </Paper>
              ))
            ) : (
              <div>{JSON.stringify(characterGridRows[similarGroup])}</div>
            )}
            {!searchMode && (
              <Button
                size='small'
                onClick={() => setSearchMode(similarGroup)}
                sx={{
                  minWidth: '0',
                  color: theme.palette.primary.contrastText,
                  backgroundColor: theme.palette.primary.main,
                }}
              >
                +
              </Button>
            )}
          </Box>

          {searchMode === similarGroup && (
            <TextField
              label='Keress karakterre, kulcsszóra vagy alapelemre...'
              variant='filled'
              size='small'
              value={searchTermSimilar}
              onChange={event => setSearchTermSimilar(event.target.value)}
              onKeyDown={event => handleSearch(event, similarGroup)}
              onBlur={() => setSearchMode(null)}
              sx={{ justifyContent: 'center', marginTop: '15px' }}
            />
          )}
        </Paper>
      ))}
    </ListWrapper>
  )
}

export default SimilarList
