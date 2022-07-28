import React from 'react'
import { StyledFinalMessagesContainer } from './displayMessages.styles'

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
