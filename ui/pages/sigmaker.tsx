import type { NextPage } from 'next'
import React, { useState } from 'react'
import {
  Divider,
  Grid,
  ThemeProvider,
  Typography
} from '@mui/material'
import { theme } from '../styles/theme'
import { SignatureData } from '../lib/types'
import { StyledPageContainer } from '../styles/common'
import {
  StyledGrid,
  StyledGmailHeader
} from '../pageStyles/sigmaker.styles'
import Layout from '../components/layout/Layout'
import { GetServerSideProps } from 'next'
import { getServerSideSessionOrRedirect } from '../server/getServerSideSessionOrRedirect'
import EmailSignature from '../components/emailSignature/emailSignature'
import { icons } from '../styles/icons'
import EmailSignatureForm from '../components/emailSignature/emailSignatureForm'
import BackArrow from '../components/backArrow/backArrow'

const Sigmaker: NextPage = () => {
  const [signatureData, setSignatureData] = useState<undefined | SignatureData>(
    undefined
  )

  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <StyledPageContainer>
          <BackArrow />
          <Typography variant="h3"> Signature Maker </Typography>
          <Divider />
          <br />
          <StyledGrid container spacing={2}>
            <Grid item xs={12} md={6}>
              <EmailSignatureForm
                setSignatureData={setSignatureData}
                embedded={false}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledGmailHeader variant="h4">
                Paste this into Gmail!
                <img
                  id="preview-image-url"
                  src={icons.Salute.image}
                  alt={icons.Salute.altText}
                />
              </StyledGmailHeader>
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
