import { styled, Typography } from '@mui/material'
import { theme } from '../../styles/theme'

const StyledDateTimeDiv = styled('div')({
  marginTop: 15,
  marginBottom: 50
})

const StyledResultMessage = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isError'
})<{ isError?: boolean; }>(({ isError }) => ({
  color: isError ? theme.palette.Red.main : theme.palette.Mist.main,
  paddingTop: 50
}))

export {
  StyledDateTimeDiv, StyledResultMessage
}
