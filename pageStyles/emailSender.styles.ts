import { Divider, Table, TableRow, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { theme } from '../styles/theme'

const SectionContainer = styled('div')({
  marginTop: 30,
  marginBottom: 30
})

const StyledDivider = styled(Divider)({
  marginTop: 50,
  marginBottom: 50
})

const StyledSubHeader = styled(Typography)({
  paddingBottom: 25
})

const StyledTable = styled(Table)({
  minWidth: 650
})

const StyledTableRow = styled(TableRow)({
  '&:last-child td, &:last-child th': {
    border: 0
  }
})

const StyledTextField = styled(TextField)({
  width: 280
})

const StyledTableContainer = styled('div')({
  marginBottom: 50
})

const StyledErrorMessage = styled(Typography)({
  color: theme.palette.Red.main
})

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

const StyledFinalMessageContent = styled('div')({
  whiteSpace: 'pre-wrap'
})

export {
  SectionContainer, StyledTextField, StyledSubHeader, StyledTableContainer, StyledDivider,
  StyledTable, StyledTableRow, StyledFinalMessageContent, StyledErrorMessage, StyledResultMessage,
  StyledDateTimeDiv
}
