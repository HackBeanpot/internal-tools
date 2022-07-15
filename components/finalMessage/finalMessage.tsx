import React, { useState } from 'react'

import { Typography, Button } from '@mui/material'

import { StyledFinalMessageContent, StyledTextArea } from '../../pageStyles/emailSender.styles'

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
    console.log(idMail)
    parentCallback(idMail, to, subject, messageContent)
  }

  return (
        <div>
            <Typography variant="body1">To:{toMessage}</Typography>
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
                            label="Email subject"
                            variant="outlined"
                            onChange={handleEditMessage}>

                        </StyledTextArea>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={handleSubmitButton}
                        >
                            Save
                        </Button>
                    </div>

                  : <div>
                        <StyledFinalMessageContent>

                            {messageContent}
                        </StyledFinalMessageContent>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={handleEditButton}
                        >
                            Edit
                        </Button>
                    </div>

                }
            </Typography>
        </div>
  )
}
