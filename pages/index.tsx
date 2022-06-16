import React from 'react'
import { ThemeProvider, Divider, Typography, Link } from '@mui/material'
import type { NextPage } from 'next'
import { StyledPageContainer } from '../styles/common'
import { theme } from '../styles/theme'

const Home: NextPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <StyledPageContainer>
        <Typography variant="h3">Tools</Typography>
        <Divider light />
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
        </ul>
      </StyledPageContainer>
    </ThemeProvider>
  )
}

export default Home
