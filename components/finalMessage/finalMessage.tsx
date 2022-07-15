import React, { useState } from 'react'

import { Typography, Button } from '@mui/material'

import { StyledFinalMessageContent, StyledTextField } from '../../pageStyles/emailSender.styles'

type FinalMessageProps = {
    id: string,
    to: string,
    subject: string,
    content: string,
    parentCallback: Function,
};

export default function FinalMessage
({ id, to, subject, content, parentCallback }: FinalMessageProps) {
  console.log(parentCallback)
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
    parentCallback(id, messageContent)
  }

  return (
        <div id={idMail}>
            <Typography variant="body1">To:{toMessage}</Typography>
            <Typography variant="body1">Subject: {subjectMessage}</Typography>
            <br />
            <Typography variant="body1">Content:</Typography>
            <br />
            <Typography variant="body1">

                {isEditing
                  ? <div>
                        <StyledTextField
                            value={messageContent}
                            id="outlined-basic"
                            label="Email subject"
                            variant="outlined"
                            onChange={handleEditMessage}>

                        </StyledTextField>
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
