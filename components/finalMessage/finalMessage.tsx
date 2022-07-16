import React, { useState } from 'react'
import { Typography } from '@mui/material'
import { StyledEditButton, StyledFinalMessageContent, StyledTextArea } from '../../styles/common'

type FinalMessageProps = {
    id: string,
    to: string,
    subject: string,
    content: string,
    parentCallback: Function,
};

export default function FinalMessage
({ id, to, subject, content, parentCallback }: FinalMessageProps) {
  const toMessage = to
  const subjectMessage = subject
  const idMail = id

  const [isEditing, setIsEditing] = useState(false)
  const [messageContent, setMessageContent] = useState(content)

  const handleEditButton = () => {
    setIsEditing(true)
  }

  const handleEditMessage = (e: any) => {
    setMessageContent(e.target.value)
  }

  const handleSubmitButton = () => {
    setIsEditing(false)
    parentCallback(idMail, to, subject, messageContent)
  }

  return (
    <>
            <StyledEditButton
                variant="contained"
                size="small"
                onClick={isEditing ? handleSubmitButton : handleEditButton}
            >
                {isEditing ? 'Save' : 'Edit'}
            </StyledEditButton>
            <Typography variant="body1">To: {toMessage}</Typography>
            <Typography variant="body1">Subject: {subjectMessage}</Typography>
            <br />
            <Typography variant="body1">Content:</Typography>
            <br />
            <Typography variant="body1">

                {isEditing
                  ? <div>
                        <StyledTextArea
                            value={messageContent}
                            id="outlined-basic"
                            onChange={handleEditMessage}
                        />
                    </div>

                  : <div>
                        <StyledFinalMessageContent>

                            {messageContent}
                        </StyledFinalMessageContent>
                    </div>

                }
            </Typography>
            </>
  )
}
