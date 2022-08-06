import React, { ChangeEvent, useState } from 'react'
import { FormControlLabel, FormLabel, Radio, RadioGroup, Button } from '@mui/material'
import { StyledSubHeader, StyledTextField } from '../../pageStyles/emailSender.styles'
import { SectionContainer } from '../../styles/common'

type EmailHeadeSectionProps = {
  handleEmailStandard: any,
  subjectCustomization: boolean,
  handleEmailSubject: any
  handleEmailHeader: any
};

export default function SubjectSection ({
  handleEmailStandard,
  subjectCustomization,
  handleEmailSubject,
  handleEmailHeader
}: EmailHeadeSectionProps) {
  const [ccRecipents, setCcRecipents] = useState('')
  const [bccRecipents, setBccRecipents] = useState('')

  const HandleRecipents = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.id === 'cc' ? setCcRecipents(e.target.value) : setBccRecipents(e.target.value)
  }

  return (
    <>
      <SectionContainer>
        <StyledSubHeader variant="h5">1) Email Header</StyledSubHeader>

        <RadioGroup
          aria-labelledby="choose-email-subject"
          name="email-subject"
          onChange={handleEmailStandard}
        >
          <FormControlLabel
            value="customized"
            control={<Radio />}
            label="Customized (add subjects from CSV)"
          />
          <FormControlLabel
            value="standard"
            control={<Radio />}
            label="Standard (enter one subject for all emails)"
          />
        </RadioGroup>
        <br />
      </SectionContainer>
      <SectionContainer>
        {!subjectCustomization &&
          <div>
            <StyledSubHeader variant="h5">
              1b) Enter standard email subject
            </StyledSubHeader>
            <StyledTextField
              id="outlined-basic"
              label="Email subject"
              variant="outlined"
              onSubmit={handleEmailSubject}
            />
          </div>
        }
      </SectionContainer>

      <SectionContainer>
      <FormLabel id="choose-email-subject">
        Enter cc and bcc recipents below
      </FormLabel>
      <StyledSubHeader variant="h5">
        1c) Enter cc recipents
      </StyledSubHeader>
      <StyledTextField
              id="cc"
              label="Email cc recipents"
              variant="outlined"
              onChange={HandleRecipents}
      />
            <StyledSubHeader variant="h5">
        1c) Enter bcc recipents
      </StyledSubHeader>
      <StyledTextField
              id="bcc"
              label="Email bcc recipents"
              variant="outlined"
              onChange={HandleRecipents}

      />
                <Button
                variant="contained"
                component="span"
                onClick={ () => {
                  handleEmailHeader(ccRecipents, bccRecipents)
                }
                }>
            Add
          </Button>
      </SectionContainer>
    </>
  )
}