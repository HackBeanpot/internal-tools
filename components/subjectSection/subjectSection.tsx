import React from 'react'
import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { StyledSubHeader, StyledTextField } from '../../pageStyles/emailSender.styles'
import { SectionContainer } from '../../styles/common'

type SubjectSectionProps = {
  handleEmailStandard: any,
  subjectCustomization: boolean,
  handleEmailSubject: any
};

export default function SubjectSection ({
  handleEmailStandard,
  subjectCustomization,
  handleEmailSubject
}: SubjectSectionProps) {
  return (
    <>
      <SectionContainer>
        <StyledSubHeader variant="h5">1) Email subject</StyledSubHeader>
        <FormLabel id="choose-email-subject">
          Use customized or standard email subjects?
        </FormLabel>
        <RadioGroup
          aria-labelledby="choose-email-subject"
          name="email-subject"
          onChange={handleEmailStandard}
          defaultValue="customized"
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
            onChange={handleEmailSubject}
          />
        </div>
    }
     </SectionContainer>
    </>
  )
}
