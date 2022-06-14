import { styled } from '@mui/system'
import { Button, Container } from "@mui/material"

const StyledPageContainer = styled(Container)({
  marginTop: 40,
  marginBottom: 40
})

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.DarkGreen.main,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: theme.palette.Mist.main
  }
}))

export { StyledPageContainer, StyledButton }
