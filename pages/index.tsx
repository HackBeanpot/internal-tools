import React from 'react'
import type { NextPage } from 'next'
import { ThemeProvider, Divider, Typography } from '@mui/material'
import { theme } from '../styles/theme'
import { signIn, signOut, useSession } from 'next-auth/react'

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
  return <ThemeProvider theme={theme}>
    <div className="tool-box">
      <Typography variant = "h3">Tools</Typography>
      <Divider light />
      <Typography variant="body1" component="p">
        🛠 Internal tools + useful things for core members like…
      </Typography>
      <Typography variant="body1" component="ul">
        <li>
          <a href="/sigmaker">An email signature generator</a>
          (last updated September 2019)
        </li>
        <button onClick={() => signOut()}>Sign out</button>
      </Typography>
    </div>
  </ThemeProvider>
}

export default Home
