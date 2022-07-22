import type { NextPage } from 'next'
import React, { ChangeEvent, useState } from 'react'
import {
  Divider,
  Grid,
  Stack,
  ThemeProvider,
  Typography
} from '@mui/material'
import { theme } from '../styles/theme'
import { SignatureData } from '../lib/types'
import { StyledPageContainer, StyledButton } from '../styles/common'
import {
  StyledGrid,
  StyledTextValidator
} from '../pageStyles/sigmaker.styles'
import { ValidatorForm } from 'react-material-ui-form-validator'
import Layout from '../components/layout/Layout'
import { GetServerSideProps } from 'next'
import { getServerSideSessionOrRedirect } from '../server/getServerSideSessionOrRedirect'
import EmailSignature from '../components/emailSignature/emailSignature'

const Sigmaker: NextPage = () => {
  const [formData, setFormData] = useState<SignatureData>({
    fullName: '',
    title: '',
    phone: '',
    email: ''
  })
  const [signatureData, setSignatureData] = useState<undefined | SignatureData>(
    undefined
  )

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = () => {
    setSignatureData(formData)
    setFormData({
      fullName: '',
      title: '',
      phone: '',
      email: ''
    })
  }

  const createValidatedInputField = (name: string, value: string, label: string) => (
    <StyledTextValidator
      label={label}
      onChange={handleChange}
      name={name}
      type="text"
      validators={['required']}
      errorMessages={['Required.']}
      value={value}
    />
  )

  return (
    <Layout>
    <ThemeProvider theme={theme}>
      <StyledPageContainer>
        <Typography variant="h3"> Signature Maker </Typography>
        <Divider />
        <br />
        <StyledGrid container spacing={2}>
          <Grid item xs={12} md={6}>
          <ValidatorForm
                onSubmit={handleSubmit}
            >
            <Stack spacing={3}>
              <Typography variant="h5"> Enter your info here! </Typography>
              {createValidatedInputField('fullName', formData.fullName, 'Full name')}
              {createValidatedInputField('title', formData.title, 'Title')}
              {createValidatedInputField('phone', formData.phone, 'Phone')}
              {createValidatedInputField('email', formData.email, 'Email (@hackbeanpot.com)')}
              <StyledButton
                size="large"
                color="info"
                variant="contained"
                type="submit"
                width="medium"
              >
                Generate signature!
              </StyledButton>
            </Stack>
          </ValidatorForm>
          </Grid>
          <Grid item xs={12} md={6}>
            <EmailSignature signatureData={signatureData} />
          </Grid>
        </StyledGrid>
      </StyledPageContainer>
    </ThemeProvider>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = getServerSideSessionOrRedirect
export default Sigmaker
