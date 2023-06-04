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
import { useStore } from '../../shared/logic/useStore'
import { LESSON_SELECT_PATH } from '../../shared/paths'

export function CloseLearnButton() {
  const [openModal, setOpenModal] = useState(false)
  const { flashbackChar } = useStore('flashback')

  return (
    <>
      <ToolbarButton
        icon={faClose}
        onClick={() => setOpenModal(true)}
        tooltip={LEARN_EXIT_MODAL_EXIT_BUTTON}
        sx={{ justifySelf: 'flex-end', color: flashbackChar ? 'primary.300' : undefined }}
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
          <Typography variant='h5' component='h2' fontWeight='bold'>
            {LEARN_EXIT_MODAL_TITLE}
          </Typography>

          <Typography marginTop={2}>{LEARN_EXIT_MODAL_BODY}</Typography>

          <Box display='flex' gap={2} sx={{ flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'flex-end', mt: 4 }}>
            <Button variant='text' onClick={() => setOpenModal(false)}>
              {LEARN_EXIT_MODAL_CANCEL_BUTTON}
            </Button>

            <Button href={LESSON_SELECT_PATH} variant='contained'>
              {LEARN_EXIT_MODAL_EXIT_BUTTON}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
