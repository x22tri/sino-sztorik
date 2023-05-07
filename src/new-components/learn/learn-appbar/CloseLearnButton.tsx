import Box from '@mui/material/Box'
import { Button, Modal, Typography } from '@mui/material'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import {
  LEARN_EXIT_MODAL_BODY,
  LEARN_EXIT_MODAL_CANCEL_BUTTON,
  LEARN_EXIT_MODAL_EXIT_BUTTON,
  LEARN_EXIT_MODAL_TITLE,
} from '../../shared/strings'
import { useState } from 'react'
import ToolbarButton from '../../shared/components/ToolbarButton'

export function CloseLearnButton() {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <ToolbarButton
        icon={faClose}
        onClick={() => setOpenModal(true)}
        tooltip={LEARN_EXIT_MODAL_EXIT_BUTTON}
        sx={{ justifySelf: 'flex-end' }}
      />

      <Modal onClose={() => setOpenModal(false)} open={openModal}>
        <Box
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 5,
            left: '50%',
            maxWidth: 'calc(100vw - 10px)',
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

          <Typography marginTop={2}>{LEARN_EXIT_MODAL_BODY}</Typography>

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
