import React from 'react'
import { ThemeProvider, Divider, Typography, Link } from '@mui/material'
import type { NextPage } from 'next'
import { StyledPageContainer } from '../styles/common'
import { theme } from '../styles/theme'
import { TextContainer } from '../pageStyles/home.styles'
import Layout from '../components/layout/Layout'
<<<<<<< HEAD

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
=======
import { GetServerSideProps } from 'next'
import { getServerSideSessionOrRedirect } from '../server/getServerSideSessionOrRedirect'

const Home: NextPage = () => {
>>>>>>> 3cf60ef (REmoved unused imports.)
  return (
    <Layout>
    <ThemeProvider theme={theme}>
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
    </Layout>
  )
}

<<<<<<< HEAD
=======
export const getServerSideProps: GetServerSideProps = getServerSideSessionOrRedirect

>>>>>>> 3cf60ef (REmoved unused imports.)
export default Home
