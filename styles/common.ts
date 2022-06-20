import { styled } from '@mui/system'
import { Button, Container, Typography } from '@mui/material'
import { theme } from './theme'

const StyledPageContainer = styled(Container)({
  marginTop: 40,
  marginBottom: 40
})

const StyledButton = styled(Button)(({
  backgroundColor: theme.palette.DarkGreen.main,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: theme.palette.Mist.main
  },
  width: 200
}))

const StyledBoldTypograhy = styled(Typography)({
  fontWeight: 600
})

export { StyledPageContainer, StyledButton, StyledBoldTypograhy }
