import Box from '@mui/material/Box'
import { Button, IconButton, Modal, Typography } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { useNavButtonStyling } from '../../shared/utility-functions'
import {
  LEARN_EXIT_MODAL_BODY,
  LEARN_EXIT_MODAL_CANCEL_BUTTON,
  LEARN_EXIT_MODAL_EXIT_BUTTON,
  LEARN_EXIT_MODAL_TITLE,
} from '../../shared/strings'
import { useState } from 'react'

export function CloseButton() {
  const [openModal, setOpenModal] = useState(false)
  const navButtonStyling = useNavButtonStyling()

  return (
    <>
      <IconButton
        onClick={() => setOpenModal(true)}
        size='large'
        sx={{ mx: 1, pl: 0, justifySelf: 'flex-end', ...navButtonStyling }}
      >
        <FontAwesomeIcon icon={faClose} />
      </IconButton>

      <Modal onClose={() => setOpenModal(false)} open={openModal}>
        <Box
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 5,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            p: 4,
            position: 'absolute',
            width: 400,
          }}
        >
          <Typography variant='h5' component='h2'>
            {LEARN_EXIT_MODAL_TITLE}
          </Typography>
          <Typography sx={{ mt: 2 }}>{LEARN_EXIT_MODAL_BODY}</Typography>
          <Box display='flex' gap={2} sx={{ flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'flex-end', mt: 4 }}>
            <Button onClick={() => setOpenModal(false)}>{LEARN_EXIT_MODAL_CANCEL_BUTTON}</Button>

            <Button href='/' variant='contained'>
              {LEARN_EXIT_MODAL_EXIT_BUTTON}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
