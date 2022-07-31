import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Stack,
  TextField
} from '@mui/material'
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import React from 'react'
import { ResultMessage } from '../../lib/types'
import {
  StyledDateTimeDiv,
  StyledResultMessage
} from './sendEmails.styles'
import { SectionContainer, StyledButton, StyledSubHeader } from '../../styles/common'

type SendEmailsProps = {
  setCheckedDeliveryBox: any;
  checkedDeliveryBox: boolean;
  dateTime: Date | null;
  handleClickOpen: any;
  setDeliveryDateTime: any;
  finalMessagesLength: boolean;
  errorMessagesLength: boolean;
  handleClose: any;
  sendEmails: any;
  resultMessage: ResultMessage;
  open: boolean;
};

export default function SendEmails ({
  setCheckedDeliveryBox,
  checkedDeliveryBox,
  dateTime,
  handleClickOpen,
  setDeliveryDateTime,
  finalMessagesLength,
  errorMessagesLength,
  handleClose,
  sendEmails,
  resultMessage,
  open
}: SendEmailsProps) {
  return (
    <SectionContainer>
      <StyledSubHeader variant="h5">5) Send emails</StyledSubHeader>
      <FormLabel id="choose-email-subject">
        Use customized or standard email subjects?
      </FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              onChange={(e) => setCheckedDeliveryBox(e.target.checked)}
            />
          }
          label="Select custom delivery time"
        />
      </FormGroup>
      {checkedDeliveryBox && (
        <StyledDateTimeDiv>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <DateTimePicker
                label="Select date and time"
                value={dateTime}
                onChange={(dateTime: Date | null) => {
                  setDeliveryDateTime(dateTime)
                }}
                renderInput={(params: any) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </StyledDateTimeDiv>
      )}
      <StyledButton
        color="info"
        variant="contained"
        onClick={() => {
          handleClickOpen()
        }}
        width="medium"
        disabled={finalMessagesLength || errorMessagesLength}
      >
        Send!
      </StyledButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to send all emails?
        </DialogTitle>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            No
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              handleClose()
              sendEmails()
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <StyledResultMessage variant="h5" isError={resultMessage.isError}>
        {resultMessage.message}
      </StyledResultMessage>
    </SectionContainer>
  )
}
