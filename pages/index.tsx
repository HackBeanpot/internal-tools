import React from 'react'
import { ThemeProvider, Divider, Typography, Link, Button } from '@mui/material'
import type { NextPage } from 'next'
import { StyledPageContainer } from '../styles/common'
import { theme } from '../styles/theme'
import { signIn, signOut, useSession } from 'next-auth/react'
import { TextContainer } from '../pageStyles/home.styles'
import Layout from '../components/layout/Layout'

const Home: NextPage = () => {
  const { data: session } = useSession()
  if (!session) {
    return (
      <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>
    )
  }
  return (
    <ThemeProvider theme={theme}>
      <Layout>
      <Button variant="contained" color = "secondary">
          <Button onClick={() => signOut()}>Sign out</Button>
          </Button>
          </Layout>
      <StyledPageContainer>
        <Typography variant="h3">Tools</Typography>
        <Divider light />
        <TextContainer>
          <Typography variant="body1">
            🛠 Internal tools + useful things for core members like…
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
  )
}

export default Home
