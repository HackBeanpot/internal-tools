import React from 'react'
import { Message } from '../../lib/types'
import { StyledErrorMessage } from '../../styles/common'
import { StyledDivider, StyledFinalMessagesContainer } from './displayMessages.styles'
import FinalMessage from '../../components/finalMessage/finalMessage'
import { nanoid } from 'nanoid'

type DisplayMessagesProps = {
  finalMessages: Message[],
  editFinalMessages: any,
  getErrorMessage: any
};

export default function DisplayMessages ({
  finalMessages, editFinalMessages, getErrorMessage
}: DisplayMessagesProps) {
  return (
    <StyledFinalMessagesContainer>
{finalMessages.map((msg) => (
          <div key={nanoid()}>
            <StyledDivider />
            {getErrorMessage(msg.id) && (
              <StyledErrorMessage>
                Error: {getErrorMessage(msg.id)}
              </StyledErrorMessage>
            )}
            <FinalMessage
              id={msg.id}
              to={msg.to}
              subject={msg.subject}
              parentCallback={editFinalMessages}
              content={msg.content}
            />
          </div>
))}    </StyledFinalMessagesContainer>
  )
}
