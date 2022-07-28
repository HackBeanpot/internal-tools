import React from 'react'
import { StyledFinalMessagesContainer } from '../../pageStyles/emailSender.styles'

type DisplayMessagesProps = {
  displayMessages: any;
};

export default function DisplayMessages ({
  displayMessages
}: DisplayMessagesProps) {
  return (
    <StyledFinalMessagesContainer>
      {displayMessages()}
    </StyledFinalMessagesContainer>
  )
}
