import { Divider, Table, TableRow, TextareaAutosize, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { StyledButton } from '../styles/common'

const SectionContainer = styled('div')({
  marginTop: 30,
  marginBottom: 30
})

const StyledTextArea = styled(TextareaAutosize)({
  width: '100%'
})

const StyledCsvButton = styled(StyledButton)({
  marginLeft: 5,
  marginRight: 5
})

const StyledCsvButtonsContainer = styled('div')({
  display: 'flex'
})

const StyledSubHeader = styled(Typography)({
  paddingBottom: 25
})

const StyledFinalMessagesContainer = styled('div')({
  marginTop: 50,
  marginBottom: 50
})

const StyledTableContainer = styled('div')({
  marginBottom: 50
})

const StyledFinalMessageContent = styled('div')({
  whiteSpace: 'pre-wrap'
})

const StyledDivider = styled(Divider)({
  marginTop: 50,
  marginBottom: 50
})

const StyledTable = styled(Table)({
  minWidth: 650
})

const StyledTableRow = styled(TableRow)({
  '&:last-child td, &:last-child th': { border: 0 }
})

export {
  SectionContainer, StyledTextArea, StyledCsvButton, StyledCsvButtonsContainer, StyledSubHeader,
  StyledFinalMessagesContainer, StyledTableContainer, StyledDivider, StyledTable, StyledTableRow,
  StyledFinalMessageContent
}
