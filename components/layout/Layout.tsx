import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import { signOut } from 'next-auth/react'
import PropTypes from 'prop-types'
import { Props } from 'next/script'
import { theme } from '../../styles/theme'
import { ThemeProvider } from '@mui/material'
import {
  StyledToolbar,
  StyledSignOutButton,
  StyledToolbarRightDiv
} from '../../styles/common'
import { LogoIconWhite } from '../../public/assets/logo-icon-white'

export default function Layout ({ children }: Props) {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <StyledToolbar>
          <LogoIconWhite/>
          <StyledToolbarRightDiv>
          <StyledSignOutButton onClick={() => signOut()}>
            Sign out
          </StyledSignOutButton>
          </StyledToolbarRightDiv>

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
