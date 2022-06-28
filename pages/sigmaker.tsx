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
import { icons } from '../styles/icons'
import { SignatureData } from '../lib/types'
import { StyledPageContainer, StyledButton } from '../styles/common'
import {
  StyledContentContainer,
  StyledGmailHeader,
  StyledLogoContainer,
  StyledTable,
  StyledSignatureName,
  StyledLogoImage,
  StyledSignatureText,
  StyledPhoneNumber,
  StyledLinkContainer,
  StyledLink,
  StyledGrid,
} from '../pageStyles/sigmaker.styles'
import { signIn, signOut, useSession } from 'next-auth/react'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Layout from '../components/layout/Layout'

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

  const { data: session } = useSession()
  if (!session) {
    return (
      <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>
    )
  }

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
    <TextValidator
      label={label}
      onChange={handleChange}
      name={name}
      type="text"
      validators={['required']}
      errorMessages={['Required.']}
      value={value}
    />
  )

  const createSignature = () => {
    if (signatureData) {
      return (
        <div>
          <StyledGmailHeader variant="h4">
            Paste this into Gmail!
          </StyledGmailHeader>
          <StyledPageContainer>
            <StyledTable cellPadding={0} cellSpacing={0}>
              <tbody>
                <tr>
                  <StyledLogoContainer valign="top">
                    <StyledLogoImage
                      id="preview-image-url"
                      src={icons.HBP_LOGO.image}
                      alt={icons.HBP_LOGO.altText}
                    />
                  </StyledLogoContainer>
                  <StyledContentContainer>
                    <table cellPadding={0} cellSpacing={0}>
                      <tbody>
                        <tr>
                          <StyledSignatureName colSpan={2}>
                            {signatureData.fullName}
                          </StyledSignatureName>
                        </tr>
                        <tr>
                          <StyledSignatureText colSpan={2}>
                            {signatureData.title}
                          </StyledSignatureText>
                        </tr>
                        <tr>
                          <StyledSignatureText colSpan={2}>
                            <strong>HackBeanpot, Inc.</strong>
                          </StyledSignatureText>
                        </tr>
                        <tr>
                          <StyledPhoneNumber>
                            {signatureData.phone}
                          </StyledPhoneNumber>
                        </tr>
                        <tr>
                          <StyledLinkContainer valign="top">
                            <StyledLink
                              href="https://hackbeanpot.com"
                              target="_blank"
                            >
                              www.hackbeanpot.com
                            </StyledLink>
                          </StyledLinkContainer>
                        </tr>
                        <tr>
                          <StyledSignatureText>
                            <StyledLink href={`mailto:${signatureData.email}@hackbeanpot.com`}>
                              <a>{signatureData.email}@hackbeanpot.com</a>
                            </StyledLink>
                          </StyledSignatureText>
                        </tr>
                      </tbody>
                    </table>
                  </StyledContentContainer>
                </tr>
              </tbody>
            </StyledTable>
          </StyledPageContainer>
        </div>
      )
    }
  }

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
              >
                Generate signature!
              </StyledButton>
            </Stack>
          </ValidatorForm>
          <div>
            <br />
            <br />
            <button onClick={() => signOut()}>Sign out</button>
          </div>
          </Grid>
          <Grid item xs={12} md={6}>
            {<div>{createSignature()}</div>}
          </Grid>
        </StyledGrid>
      </StyledPageContainer>
    </ThemeProvider>
    </Layout>
  )
}

export default Sigmaker
