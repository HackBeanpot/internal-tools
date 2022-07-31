
import { styled } from '@mui/material/styles'
import { Typography } from '@mui/material'
import { theme } from '../../styles/theme'

const StyledResultMessage = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isError'
})<{ isError?: boolean; }>(({ isError }) => ({
  color: isError ? theme.palette.Red.main : theme.palette.Mist.main,
  paddingTop: 50
}))

const StyledDateTimeDiv = styled('div')({
  marginTop: 15,
  marginBottom: 50
})

export {
  StyledDateTimeDiv, StyledResultMessage
}
