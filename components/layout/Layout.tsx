import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { signOut } from 'next-auth/react'
import PropTypes from 'prop-types'
import { Props } from 'next/script'
import { theme } from '../../styles/theme'
import { ThemeProvider } from '@mui/material'
import { StyledButton, StyledToolbar } from '../../styles/common'

export default function Layout ({ children }: Props) {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <StyledToolbar>
          <StyledButton bgColor={theme.palette.Mist.main} onClick={() => signOut()}>
            Sign out
          </StyledButton>
        </StyledToolbar>
      </AppBar>
      {children}
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element.isRequired
  ])
}
