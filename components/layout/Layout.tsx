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
  StyledHeaderLogoImage,
  StyledToolbarRightDiv
} from '../../styles/common'
import { icons } from '../../styles/icons'

export default function Layout ({ children }: Props) {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <StyledToolbar>
          <StyledHeaderLogoImage
            id="preview-image-url"
            src={icons.HBP_LOGO.image}
            alt={icons.HBP_LOGO.altText}
          />
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
