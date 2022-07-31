import React, { ChangeEventHandler } from 'react'
import { FileObject } from '../../lib/types'
import {
  StyledLoadingTypography,
  StyledLoadingContainer,
  StyledDeleteIcon
} from './emailContentSection.styles'
import { SectionContainer, StyledTextArea, StyledSubHeader } from '../../styles/common'
import { TailSpin } from 'react-loader-spinner'
import { Button, Typography } from '@mui/material'

type EmailContentProps = {
  setMessage: any;
  attachments: FileObject[];
  handleUploadAttachment: ChangeEventHandler<HTMLInputElement>;
  setAttachments: Function;
  uploadingAttachment: boolean;
};

export default function EmailContent ({
  setMessage,
  attachments,
  handleUploadAttachment,
  setAttachments,
  uploadingAttachment
}: EmailContentProps) {
  return (
    <SectionContainer>
      <StyledSubHeader variant="h5">2) Enter email content</StyledSubHeader>
      <input
        style={{ display: 'none' }}
        id="attachment-button"
        type="file"
        onChange={handleUploadAttachment}
      />
      <label htmlFor="attachment-button">
        <Button variant="contained" component="span">
          Upload Attachment
        </Button>
      </label>
      <br />
      <br />

      <div data-tip="TailSpin" data-for="happyFace" className="loaderBox"></div>
      {uploadingAttachment
        ? (
        <StyledLoadingContainer>
          <TailSpin color="navy" height={30} width={30} />
          <StyledLoadingTypography variant="body1">
            uploading attachment...
          </StyledLoadingTypography>
        </StyledLoadingContainer>
          )
        : (
            ''
          )}
      {attachments.length > 0
        ? attachments.map((attachment) => (
            <div key={attachment.id}>
              <Typography variant="body1">
                {attachment.file.name} attached!
                <StyledDeleteIcon
                  onClick={() => {
                    setAttachments((prev: FileObject[]) =>
                      prev.filter((curr) => curr.id !== attachment.id)
                    )
                  }}
                />
              </Typography>
              <br />
            </div>
        ))
        : ''}
      <StyledTextArea
        aria-label="message-text-area"
        placeholder="Paste in message"
        onChange={(e) => setMessage(e.target.value)}
        minRows={20}
      />
    </SectionContainer>
  )
}
