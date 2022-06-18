import React, { useContext, useState } from 'react'
import { Formik, Form, useField } from 'formik'

import AuthContext from '../context/AuthContext'

import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

import { SecondaryColorLoadingButton } from '../component-library/GenericComponents'

const loginRoute = `${process.env.REACT_APP_BACKEND_URL}/users/login`
const signupRoute = `${process.env.REACT_APP_BACKEND_URL}/users/signup`

function AuthPage({
  signupOrLoginState,
  setSignupOrLoginState,
  closeAuthModal,
}) {
  const theme = useTheme()

  // Setting up the authentication state.
  const auth = useContext(AuthContext)
  const [authError, setAuthError] = useState()
  const [loading, setLoading] = useState(false)

  // The function that sends a login or signup request to the backend.
  const sendAuthRequest = async values => {
    try {
      setLoading(true)
      const response = await fetch(
        signupOrLoginState === 'login' ? loginRoute : signupRoute,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body:
            signupOrLoginState === 'login'
              ? JSON.stringify({
                  email: values.email,
                  password: values.password,
                })
              : JSON.stringify({
                  email: values.email,
                  password: values.password,
                  displayName: values.displayName,
                }),
        }
      )

      const responseData = await response.json()
      if (!response.ok) {
        setLoading(false)
        setAuthError(responseData.message)
        setTimeout(() => setAuthError(''), 5000)
      } else {
        setLoading(false)
        auth.login(responseData.userId, responseData.token)
      }
    } catch (err) {
      setLoading(false)
      setAuthError('Hiba történt. Kérjük, próbálkozz később.')
      setTimeout(() => setAuthError(''), 5000)
      throw new Error(err)
    }
  }

  // The validator for the email, password and displayName fields.
  const validate = values => {
    const errors = {}

    if (!values.email) {
      errors.email = 'Nem adtál meg e-mail-címet.'
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'A megadott e-mail-cím érvénytelen.'
    }

    if (!values.password) {
      errors.password = 'Nem adtál meg jelszót.'
    } else if (values.password.length < 6 && signupOrLoginState === 'signup') {
      errors.password = 'Legalább 6 karakterből kell állnia.'
    }

    if (
      values.password &&
      !values.confirmPassword &&
      signupOrLoginState === 'signup'
    ) {
      errors.confirmPassword = 'Kérjük, erősítsd meg jelszavad.'
    } else if (
      values.password &&
      values.confirmPassword !== values.password &&
      signupOrLoginState === 'signup'
    ) {
      errors.confirmPassword = 'A jelszók nem egyeznek.'
    }

    if (!values.displayName && signupOrLoginState === 'signup') {
      errors.displayName = 'Nem adtál meg nevet.'
    }

    return errors
  }

  const AuthTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props)
    return (
      <TextField
        {...field}
        {...{ label }}
        {...props}
        sx={{
          '& .MuiFormHelperText-root': { marginTop: '5px' },
        }}
        helperText={meta.touched && meta.error ? meta.error : null}
      />
    )
  }

  return (
    <Modal
      sx={{ maxWidth: '600px', margin: '100px auto' }}
      open={!!signupOrLoginState}
      onClose={closeAuthModal}
    >
      <Paper sx={{ padding: '30px 0', textAlign: 'center' }}>
        <Typography variant='h5' marginBottom='25px'>
          Add meg adataidat a belépéshez:
        </Typography>
        <Formik
          initialValues={{
            email: '',
            password: '',
            confirmPassword: '',
            displayName: '',
          }}
          {...{ validate }}
          onSubmit={values => sendAuthRequest(values)}
        >
          <Form>
            <Box
              display='flex'
              flexDirection='column'
              alignItems='center'
              marginTop='10px'
            >
              <Stack spacing={2} marginBottom='25px'>
                <AuthTextInput label='E-mail-cím' name='email' type='email' />
                <AuthTextInput label='Jelszó' name='password' type='password' />
                {signupOrLoginState === 'signup' && (
                  <AuthTextInput
                    label='Jelszó megerősítése'
                    name='confirmPassword'
                    type='password'
                  />
                )}
                {signupOrLoginState === 'signup' && (
                  <AuthTextInput
                    label='Hogyan szólíthatunk?'
                    name='displayName'
                    type='text'
                  />
                )}
              </Stack>

              {/* <Button type='submit' style={{backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText, marginTop: '25px'}}>
              {signupOrLoginState === 'login' ? 'Bejelentkezés' : 'Fiók létrehozása'}
            </Button> */}

              <SecondaryColorLoadingButton
                {...{ loading }}
                type='submit'
                text={
                  signupOrLoginState === 'login'
                    ? 'Bejelentkezés'
                    : 'Fiók létrehozása'
                }
              />

              {authError && <Box>{authError}</Box>}
              {signupOrLoginState === 'login' ? (
                <>
                  <Box marginTop='30px'>
                    <span>Még nincs fiókod?</span>
                    <Box
                      component='span'
                      sx={{
                        cursor: 'pointer',
                        color: theme.palette.primary.link,
                        '&:hover': { opacity: 0.8 },
                      }}
                      onClick={() => setSignupOrLoginState('signup')}
                    >
                      {' '}
                      Hozz létre új fiókot
                    </Box>
                  </Box>
                </>
              ) : (
                <>
                  <Box marginTop='30px'>
                    <span>Már van fiókod?</span>
                    <Box
                      component='span'
                      sx={{
                        cursor: 'pointer',
                        color: theme.palette.primary.link,
                        '&:hover': { opacity: 0.8 },
                      }}
                      onClick={() => setSignupOrLoginState('login')}
                    >
                      {' '}
                      Jelentkezz be
                    </Box>
                  </Box>
                </>
              )}
            </Box>
          </Form>
        </Formik>
      </Paper>
    </Modal>
  )
}

export default AuthPage
