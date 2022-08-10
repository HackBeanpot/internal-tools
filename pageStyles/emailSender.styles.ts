import { Table, TableRow, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { theme } from '../styles/theme'

const StyledTable = styled(Table)({
  minWidth: 650
})

const StyledTableRow = styled(TableRow)({
  '&:last-child td, &:last-child th': {
    border: 0
  }
})

const StyledTableContainer = styled('div')({
  marginBottom: 50
})

const StyledErrorMessage = styled(Typography)({
  color: theme.palette.Red.main
})

const StyledFinalMessageContent = styled('div')({
  whiteSpace: 'pre-wrap'
})

export {
  StyledTableContainer, StyledTable, StyledTableRow, StyledFinalMessageContent, StyledErrorMessage
}
