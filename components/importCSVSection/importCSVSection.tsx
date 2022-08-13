import { Button } from '@mui/material'
import React from 'react'
import { StyledSubHeader } from '../../styles/common'

import {
  StyledCsvButton,
  StyledCsvButtonsContainer,
  SectionContainer
} from './importCsvSection.styles'

type ImportCSVSectionProps = {
  file: boolean;
  handleImportCsv: any;
  handleUploadCsv: any;
};

export default function ImportCSVSection ({
  file,
  handleImportCsv,
  handleUploadCsv
}: ImportCSVSectionProps) {
  return (
    <SectionContainer>
      <StyledSubHeader variant="h5">3) Upload and import csv</StyledSubHeader>
      <StyledCsvButtonsContainer>
        <input
          style={{ display: 'none' }}
          id="contained-button-file"
          accept={'.csv'}
          type="file"
          onChange={handleUploadCsv}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" component="span">
            Upload
          </Button>
        </label>
        <StyledCsvButton
          variant="contained"
          width="medium"
          disabled={file}
          onClick={(e) => {
            handleImportCsv(e)
          }}
        >
          Import CSV!
        </StyledCsvButton>
      </StyledCsvButtonsContainer>
    </SectionContainer>
  )
}
