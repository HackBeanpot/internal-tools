import React from 'react'
import { ThemeProvider, Divider, Typography, Link } from '@mui/material'
import type { NextPage } from 'next'
import { StyledPageContainer } from '../styles/common'
import { theme } from '../styles/theme'
import { StyledTypographyBody1 } from '../pageStyles/home.styles'

const Home: NextPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <StyledPageContainer>
        <Typography variant="h3">
          Tools
        </Typography>
        <Divider light />
        <StyledTypographyBody1 variant="body1">
          🛠 Internal tools + useful things for core members like…
        </StyledTypographyBody1>
        <ul>
          <li>
            <Link href="/sigmaker" underline="hover">
              <StyledTypographyBody1 variant="body1">
                An email signature generator
              </StyledTypographyBody1>
            </Link>
          </li>
        </ul>
      </StyledPageContainer>
    </ThemeProvider>
  )
}

export default Home
