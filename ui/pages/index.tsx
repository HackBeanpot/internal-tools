import React from 'react'
import { ThemeProvider, Divider, Typography, Link } from '@mui/material'
import type { NextPage } from 'next'
import { StyledPageContainer } from '../styles/common'
import { theme } from '../styles/theme'
import { TextContainer } from '../pageStyles/home.styles'
import Layout from '../components/layout/Layout'
import { GetServerSideProps } from 'next'
import { icons } from '../styles/icons'
import { getServerSideSessionOrRedirect } from '../server/getServerSideSessionOrRedirect'

const Home: NextPage = () => {
  return (
    <Layout>
    <ThemeProvider theme={theme}>
      <StyledPageContainer>
        <Typography variant="h3">Tools</Typography>
        <Divider light />
        <TextContainer>
          <Typography variant="body1">
            🛠 Internal tools + useful things for core members like…
              <img
                id="preview-image-url"
                src={icons.Salute.image}
                alt={icons.Salute.altText}
              />
          </Typography>
          <ul>
            <li>
              <Typography variant="body1">
                <Link href="/sigmaker" underline="hover">
                  An email signature generator
                </Link>
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                <Link href="/emailSender" underline="hover">
                  An email sender
                </Link>
              </Typography>
            </li>
          </ul>
        </TextContainer>
      </StyledPageContainer>
    </ThemeProvider>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = getServerSideSessionOrRedirect

export default Home
