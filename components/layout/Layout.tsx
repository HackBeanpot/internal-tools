import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { signOut } from 'next-auth/react'
import PropTypes from 'prop-types'
import { Props } from 'next/script'
import { theme } from '../../styles/theme'
import { ThemeProvider, Divider, Typography, Link, Button } from '@mui/material'
import { StyledButton } from '../../styles/common'

export default function Layout ({ children }: Props) {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
        </Toolbar>
      </AppBar>
        <StyledButton bgColor={theme.palette.HBPNavy.main} onClick={() => signOut}>
            </StyledButton>
      { children }
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element.isRequired
  ])
}
