import React from 'react'
import { StyledSubHeader } from '../../pageStyles/emailSender.styles'
import { SectionContainer, StyledButton } from '../../styles/common'

type PrintMessageProps = {
    length: number,
    createMessages: any,

}

export default function PrintMessage ({ length, createMessages } :PrintMessageProps) {
  return (
    <SectionContainer>
      <StyledSubHeader variant="h5">4) Verify final messages</StyledSubHeader>
      <StyledButton
        color="info"
        variant="contained"
        onClick={createMessages}
        disabled={length === 0}
        width="medium"
      >
        Print final messages
      </StyledButton>
    </SectionContainer>
  )
}
