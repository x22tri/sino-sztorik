import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Formik, Field, Form, useField, useFormikContext } from 'formik'

import { useTheme } from '@mui/styles'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import InputAdornment from '@mui/material/InputAdornment'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

import PodcastsIcon from '@mui/icons-material/Podcasts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube, faKey } from '@fortawesome/free-solid-svg-icons'

import PopupTooltip from '../../auxiliaries/PopupTooltip'
import { keywordPrimitiveStatusFinder } from '../../auxiliaries/keywordPrimitiveStatusFinder'
import { StoryTextEditor } from './StoryTextEditor'
import { AdditionalInfoMenu } from './AdditionalInfoMenu'
import {
  LowEmphasisButton,
  SecondaryColorButton,
} from '../../component-library/GenericComponents'

const emptyLineDictionary = {
  phrases: { phraseChinese: '', phraseHungarian: '' },
  otherUses: { otherUseHungarian: '', pinyin: '' },
}

const deleteEmptyLines = (values, name, emptyLineDictionary) => {
  values[name] = emptyLineDictionary[name]
    ? values[name].filter(
        element =>
          !Object.keys(emptyLineDictionary[name]).every(
            key => emptyLineDictionary[name][key] === element[key]
          )
      )
    : values[name].filter(element => element !== '')
}

const validate = values => {
  const errors = {}
  if (!values.charChinese) errors.charChinese = 'Kötelező írásjelet megadni.'
  if (!values.keyword && !values.primitiveMeaning)
    errors.primitiveMeaning =
      'Kötelező kulcsszavat vagy alapelemként vett jelentést megadni.'
  if (
    values.otherUses.some(
      otherUse => otherUse.pinyin && !otherUse.otherUseHungarian
    )
  )
    errors.otherUses = 'Az egyéb jelentés nem maradhat üresen.'
  if (
    values.phrases.some(
      phrase => phrase.phraseChinese && !phrase.phraseHungarian
    ) ||
    values.phrases.some(
      phrase => !phrase.phraseChinese && phrase.phraseHungarian
    )
  ) {
    errors.phrases = 'Mind a kifejezést, mind a jelentését meg kell adni.'
  }

  if (
    values.phrases.some(
      phrase => !phrase.phraseChinese?.includes(values.charChinese)
    )
  )
    errors.phrases =
      'Egy vagy több kifejezésben nincs benne a jelenlegi írásjel.'
  if (
    new Set(values.phrases.map(phrase => phrase.phraseChinese)).size !==
    values.phrases.length
  )
    errors.phrases = 'Ugyanaz a kifejezés többször szerepel.'
  // console.log(values.otherUses)
  return errors
}

const AdminTextInput = ({ ...props }) => {
  const [field, meta] = useField(props)
  return (
    <TextField
      {...field}
      {...props}
      size='small'
      onKeyDown={e => e.nativeEvent.stopImmediatePropagation()}
      helperText={meta.touched && meta.error ? meta.error : null}
    />
  )
}

const ProductivePhoneticCheckbox = ({ name }) => {
  const [field] = useField({ name, type: 'checkbox' })
  const theme = useTheme()
  return (
    <PopupTooltip title={'Produktív fonetikai elem a karakter?'}>
      <Box position='absolute'>
        <Checkbox
          {...field}
          icon={
            <PodcastsIcon
              sx={{ opacity: 0.1, color: theme.palette.primary.lowPrioText }}
            />
          }
          checkedIcon={
            <PodcastsIcon sx={{ color: theme.palette.primary.lowPrioText }} />
          }
        />
      </Box>
    </PopupTooltip>
  )
}

const AutomaticConstituentField = ({ name, label }) => {
  const [field] = useField({ name, label })
  return (
    <TextField
      {...field}
      {...{ label }}
      disabled
      InputLabelProps={{ shrink: true }}
      size='small'
      sx={{ width: '100%' }}
    />
  )
}

const AutomaticConstituentOverrideCheckbox = ({ name }) => {
  const [field] = useField({ name, type: 'checkbox' })
  const theme = useTheme()
  return (
    <FormControlLabel
      control={<Checkbox {...field} {...{ name }} />}
      labelPlacement='top'
      label='Felülírás?'
      sx={{
        '& .MuiFormControlLabel-label': {
          fontSize: 12,
          marginTop: '-9px',
          cursor: 'default',
          color: theme.palette.text.secondary,
        },
        '& .MuiCheckbox-root': { marginTop: '-8px' },
      }}
    />
  )
}

const ManualConstituentField = ({ label, name, ...props }) => {
  const {
    values: { automaticConstituentOverrideCheckbox },
  } = useFormikContext()
  const [field] = useField({ name })

  return (
    <TextField
      {...field}
      {...{ label }}
      {...props}
      size='small'
      onKeyDown={e => e.nativeEvent.stopImmediatePropagation()}
      // Whenever automaticConstituentOverrideCheckbox is changed, hide/show the stored values and disable/enable the field.
      disabled={!automaticConstituentOverrideCheckbox}
      sx={{ display: !automaticConstituentOverrideCheckbox && 'none' }}
    />
  )
}

const CharacterEditScreen = () => {
  const theme = useTheme()
  const [isLoading, setIsLoading] = useState(true)
  const [snackbar, setSnackbar] = useState(null)
  const [resetSignal, setResetSignal] = useState(false)
  const { state } = useLocation()

  let char = state?.row || null

  // This function is run on blur in the StoryTextEditor. It finds automatic constituents on a Slate-formatted story.
  const findAutomaticConstituentsInLeaves = leafStoryArray => {
    if (!Array.isArray(leafStoryArray)) return null
    else {
      let tempConstituentsArray = []
      leafStoryArray.map(
        segment =>
          segment?.constituent &&
          !tempConstituentsArray.includes(segment?.constituent) &&
          tempConstituentsArray.push(segment.constituent)
      )
      return tempConstituentsArray
    }
  }

  // This function converts the story as it is found in the database to leaves that Slate can process.
  const convertDatabaseStoryToLeaves = initialValue => {
    let storyArray = initialValue.slice().split(/[{}]/) // Create a copy of the string that arrives from the database and find all parts in brackets.
    let tempConstituentsArray = []

    let storyInLeaves = storyArray.map(element => {
      if (!element.includes('|')) return { text: element }
      else {
        let [reference, textToDisplay] = element.split('|')

        if (reference === 'k') return { text: textToDisplay, keyword: true }
        else if (reference === 'p')
          return { text: textToDisplay, primitive: true }
        else if (reference) {
          if (!tempConstituentsArray.includes(reference))
            tempConstituentsArray.push(reference)
          return { text: textToDisplay, constituent: reference }
        } else return 'Hiba'
      }
    })
    return [tempConstituentsArray, [{ children: storyInLeaves }]]
  }

  // The function that submits the changes.
  const handleSaveChanges = async request => {
    console.log(request)

    // Delete empty lines before sending.
    const propertiesToCheck = [
      'phrases',
      'otherUses',
      'similarMeaning',
      'similarAppearance',
    ]
    propertiesToCheck.forEach(property =>
      deleteEmptyLines(request, property, emptyLineDictionary)
    )

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/admin/character/${char?.charId}/update`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(request),
        }
      )
      if (response) {
        // console.log(response)
        let responseJSON = await response.json()
        setSnackbar({
          children: responseJSON.message,
          severity: response.ok ? 'success' : 'error',
        })
      }
    } catch (error) {
      console.log(error)
      setSnackbar({ children: 'Hiba történt a mentéskor.', severity: 'error' })
    }
  }

  // On mount, get the additional info for the character.
  useEffect(() => {
    if (!char?.charId) return null
    else {
      const fetchAllLessons = async () => {
        try {
          const fetchedInfo = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/admin/additional-info/${char.charId}`
          )
          const fetchedInfoJSON = await fetchedInfo.json()

          // Merge the additional info with our character object.
          for (var key in fetchedInfoJSON.additionalCharInfo)
            char.character[key] = await fetchedInfoJSON.additionalCharInfo[key]

          // Signal that all info is loaded.
          setIsLoading(false)
        } catch (err) {
          console.log(err)
        }
      }
      fetchAllLessons()
    }
  }, [char])

  if (isLoading) return <div>Betöltés...</div>
  else if (!char) return <div>Hiba</div>
  else {
    let {
      constituents,
      charChinese,
      frequency,
      pinyin,
      productivePhonetic,
      keyword,
      primitiveMeaning,
      notes,
      explanation,
      otherUses,
      similarAppearance,
      similarMeaning,
      phrases,
    } = char

    const borderColors = {
      none: 'transparent',
      primitiveOnly: theme.palette.tertiary.main,
      keywordOnly: theme.palette.primary.dark,
      keywordAndPrimitive: `linear-gradient(to bottom, ${theme.palette.primary.dark}, 70%, ${theme.palette.tertiary.main})`,
    }

    const initialValues = {
      constituents: constituents || '',
      automaticConstituents: convertDatabaseStoryToLeaves(char.story)[0] || '',
      automaticConstituentOverrideCheckbox: !!constituents,
      frequency: frequency || '',
      otherUses: otherUses || [],
      similarAppearance: similarAppearance || [],
      similarMeaning: similarMeaning || [],
      phrases: phrases || [],
      charChinese: charChinese || '',
      pinyin: pinyin || '',
      productivePhonetic: productivePhonetic || false,
      keyword: keyword || '',
      primitiveMeaning: primitiveMeaning || '',
      story: convertDatabaseStoryToLeaves(char.story)[1] || [{ text: '' }],
      explanation: explanation || '',
      notes: notes || '',
    }

    return (
      <Box backgroundColor={theme.palette.background.paper}>
        <Formik
          enableReinitialize
          {...{ initialValues, validate }}
          onSubmit={values => handleSaveChanges(values)}
        >
          {({ errors, values, resetForm, setFieldValue }) => (
            <Form>
              <DialogTitle
                display='flex'
                sx={{ justifyContent: 'space-between' }}
              >
                <Box>Karakterszerkesztő</Box>
                <Box display='flex' gap={2}>
                  <LowEmphasisButton
                    onClick={() => {
                      resetForm(initialValues)
                      setResetSignal(true)
                    }}
                    text='Változtatások elvetése'
                  />
                  <SecondaryColorButton
                    type='submit'
                    text='Változtatások mentése'
                  />
                </Box>
              </DialogTitle>
              <DialogContent sx={{ height: '600px' }}>
                <Box marginTop='20px'>
                  <Grid container spacing={5}>
                    <Grid item xs={3}>
                      <Box
                        display='flex'
                        flexDirection='row'
                        flexWrap='nowrap'
                        width='100%'
                      >
                        <AutomaticConstituentField
                          label='A történetből generált alapelemek'
                          name='automaticConstituents'
                        />
                        <AutomaticConstituentOverrideCheckbox name='automaticConstituentOverrideCheckbox' />
                      </Box>
                      <Box marginTop='10px'>
                        <ManualConstituentField
                          label='Adj meg alapelemeket manuálisan...'
                          name='constituents'
                          type='text'
                          style={{ width: '100%', marginBottom: '10px' }}
                        />
                        <AdminTextInput
                          label='Gyakoriság'
                          name='frequency'
                          type='text'
                          sx={{ marginTop: '8px', width: '100%' }}
                        />
                        <AdditionalInfoMenu {...{ errors, values }} />
                      </Box>
                    </Grid>

                    <Grid item xs={6}>
                      <Stack spacing={3} alignItems='center'>
                        <Box
                          maxWidth='150px'
                          borderRadius='20px'
                          padding='6px'
                          textAlign='center'
                          marginBottom='10px'
                          sx={{
                            background:
                              borderColors[
                                keywordPrimitiveStatusFinder(values)
                              ],
                          }}
                        >
                          <Box
                            position='relative'
                            borderRadius='14px'
                            padding='6px 0'
                            display='flex'
                            flexDirection='column'
                            backgroundColor={theme.palette.background.paper}
                          >
                            <ProductivePhoneticCheckbox name='productivePhonetic' />
                            <AdminTextInput
                              label='Kiejtés'
                              name='pinyin'
                              type='text'
                              inputProps={{
                                style: {
                                  textAlign: 'center',
                                  fontStyle: 'italic',
                                },
                              }}
                            />
                            <AdminTextInput
                              label='Írásjel'
                              name='charChinese'
                              type='text'
                              inputProps={{
                                style: {
                                  fontSize: 40,
                                  textAlign: 'center',
                                  fontWeight: 'bold',
                                },
                              }}
                            />
                          </Box>
                        </Box>

                        <Grid container>
                          <Grid item xs={4} />

                          <Grid item xs={4} sx={{ px: '15px' }}>
                            {/* <Box display='flex' alignItems='center'> */}
                            {/* {values.keyword && !values.explanation && (
                            <Box component='span' position='absolute' left='5px' top='7px' zIndex='9000'>
                            <PopupTooltip title={'Értelmezés hozzáadása a kulcsszóhoz'}>
                                <IconButton size='small' onClick={() => setFieldValue('explanation', ' ')}>
                                    <FontAwesomeIcon icon={faQuestion} color={theme.palette.primary.main} />
                                </IconButton>
                            </PopupTooltip>
                            </Box>)} */}
                            <AdminTextInput
                              label='Kulcsszó'
                              name='keyword'
                              type='text'
                              sx={{ width: '100%' }}
                              inputProps={{
                                style: {
                                  fontWeight: 'bold',
                                  textAlign: 'center',
                                  color: theme.palette.primary.dark,
                                },
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment
                                    position='start'
                                    sx={{
                                      position: 'absolute',
                                      display: !values.keyword && 'none',
                                    }}
                                  >
                                    <FontAwesomeIcon
                                      icon={faKey}
                                      color={theme.palette.primary.dark}
                                    />
                                  </InputAdornment>
                                ),
                              }}
                            />
                            <Box marginBottom='20px' />
                            <AdminTextInput
                              label='Jelentés alapelemként'
                              name='primitiveMeaning'
                              type='text'
                              sx={{ width: '100%' }}
                              inputProps={{
                                style: {
                                  fontWeight: 'bold',
                                  textAlign: 'center',
                                  color: theme.palette.tertiary.main,
                                },
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment
                                    position='start'
                                    sx={{
                                      position: 'absolute',
                                      display:
                                        !values.primitiveMeaning && 'none',
                                    }}
                                  >
                                    <FontAwesomeIcon
                                      icon={faCube}
                                      color={theme.palette.tertiary.main}
                                    />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>

                          {/* <Grid item xs={4}>
                        {values.explanation &&
                        <AdminTextInput label="A kulcsszó magyarázata" name="explanation" type="text" multiline
                            onBlur={() => setFieldValue('explanation', values.explanation.trim())}
                            sx={{ width: '100%', height: '100%', 
                            '& .MuiInputBase-formControl': { height: '100%', alignItems: 'start' } 
                            }}
                        />}
                        
                    </Grid> */}
                        </Grid>
                      </Stack>

                      <Divider variant='middle' sx={{ margin: '30px 0' }} />

                      <Stack spacing={3} alignItems='center'>
                        <Field
                          label='Történet'
                          name='story'
                          multiline
                          sx={{ width: '100%' }}
                          as={StoryTextEditor}
                          {...{
                            findAutomaticConstituentsInLeaves,
                            resetSignal,
                            setResetSignal,
                            setFieldValue,
                            values,
                          }}
                        />
                        {/* <AdminTextInput label="Megjegyzések" name="notes" type="text" multiline sx={{ width: '100%', marginTop: '10px' }} /> */}
                      </Stack>
                    </Grid>
                    <Grid item xs={3}></Grid>
                  </Grid>
                </Box>
              </DialogContent>
            </Form>
          )}
        </Formik>

        {!!snackbar && (
          <Snackbar
            open
            onClose={() => setSnackbar(null)}
            autoHideDuration={2000}
          >
            <Alert {...snackbar} onClose={() => setSnackbar(null)} />
          </Snackbar>
        )}
      </Box>
    )
  }
}

export {
  AdminTextInput,
  CharacterEditScreen,
  deleteEmptyLines,
  emptyLineDictionary,
}
