import React from 'react'
import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { StyledSubHeader } from '../../pageStyles/emailSender.styles'
import { SectionContainer } from '../../styles/common'

type SubjectSectionProps = {
  handleEmailStandard: any;
  printStandardEmailSubject: any;
};

export default function SubjectSection ({
  handleEmailStandard,
  printStandardEmailSubject
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
        <div>{printStandardEmailSubject()}</div>
      </SectionContainer>
    </>
  )
}
