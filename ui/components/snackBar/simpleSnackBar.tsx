import * as React from 'react'
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

interface SimpleSnackBarProps {
  message: string;
  verticalPos: SnackbarOrigin['vertical'];
  horizontalPos: SnackbarOrigin['horizontal'];
}

export default function SimpleSnackBar ({ message, verticalPos, horizontalPos }
  : SimpleSnackBarProps) {
  const [open, setOpen] = React.useState(true)

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const action = (
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
  )

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: verticalPos,
          horizontal: horizontalPos
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </div>
  )
}
