import React from 'react'
import { StyledSubHeader } from '../../pageStyles/emailSender.styles'
import { SectionContainer, StyledTextArea } from '../../styles/common'

type EmailContentProps = {
    setMessage: any,

}

export default function EmailContent ({ setMessage } :EmailContentProps) {
  return (
    <SectionContainer>
              <StyledSubHeader variant="h5">
                2) Enter email content
              </StyledSubHeader>
              <StyledTextArea
                aria-label="message-text-area"
                placeholder="Paste in message"
                onChange={(e) => setMessage(e.target.value)}
                minRows={20}
              />
            </SectionContainer>
  )
}
