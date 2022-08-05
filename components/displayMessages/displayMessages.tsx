import React from 'react'
import { Message, SignatureData } from '../../lib/types'
import { StyledDivider, StyledErrorMessage } from '../../pageStyles/emailSender.styles'
import { StyledFinalMessagesContainer } from './displayMessages.styles'
import FinalMessage from '../../components/finalMessage/finalMessage'
import EmailSignature from '../emailSignature/emailSignature'
import { nanoid } from 'nanoid'

type DisplayMessagesProps = {
  finalMessages: Message[],
  editFinalMessages: any,
  getErrorMessage: any,
  useSignature: boolean,
  signatureData: SignatureData | undefined
};

export default function DisplayMessages ({
  finalMessages, editFinalMessages, getErrorMessage, useSignature, signatureData
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
              cc={msg.cc}
              bcc={msg.bcc}
              subject={msg.subject}
              parentCallback={editFinalMessages}
              content={msg.content}
            />
            {useSignature && (
              <>
                <br />
                <br />
                <EmailSignature signatureData={signatureData} />
              </>
            )}
          </div>
))}    </StyledFinalMessagesContainer>
  )
}
