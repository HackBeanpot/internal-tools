import React from 'react'
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material'
import EmailSignatureForm from '../emailSignature/emailSignatureForm'
import { SectionContainer, StyledTextArea, StyledSubHeader } from '../../styles/common'

type EmailContentProps = {
  setMessage: any;
  useSignature: boolean;
  setUseSignature: any;
  setSignatureData: any;
};

export default function EmailContent ({
  setMessage, useSignature, setUseSignature, setSignatureData
}: EmailContentProps) {
  return (
    <SectionContainer>
      <StyledSubHeader variant="h5">2) Enter email content</StyledSubHeader>
      <StyledTextArea
        aria-label="message-text-area"
        placeholder="Paste in message"
        onChange={(e) => setMessage(e.target.value)}
        minRows={20}
      />
      <br />
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={useSignature}
              onChange={(e) => setUseSignature(e.target.checked)}
            />
          }
          label="Use HackBeanpot email signature?"
        />
      </FormGroup>
      <br />
      {useSignature && <EmailSignatureForm setSignatureData={setSignatureData} embedded />}
    </SectionContainer>
  )
}
