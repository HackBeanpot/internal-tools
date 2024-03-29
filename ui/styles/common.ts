import { styled } from '@mui/system'
import { Button, Container, TextareaAutosize, Toolbar, Typography, TextField, TableRow }
  from '@mui/material'
import { theme } from './theme'

const StyledPageContainer = styled(Container)({
  marginTop: 40,
  marginBottom: 40
})

const StyledSubHeader = styled(Typography)({
  paddingBottom: 25
})

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'bgColor'
})<{ bgColor?: string; width?: string }>(({ bgColor, width }) => ({
  backgroundColor: bgColor || theme.palette.DarkGreen.main,
  color: theme.palette.White.main,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: theme.palette.Mist.main
  },
  width: width === 'medium' ? 200 : 100
}))

const StyledBoldTypograhy = styled(Typography)({
  fontWeight: 600
})

const SectionContainer = styled('div')({
  marginTop: 30,
  marginBottom: 30
})

const StyledTextArea = styled(TextareaAutosize)({
  width: '100%'
})

const StyledEditButton = styled(Button)({
  float: 'right'
})

const StyledFinalMessageContent = styled('div')({
  whiteSpace: 'pre-wrap'
})

const StyledToolbar = styled(Toolbar)({
  backgroundColor: theme.palette.HBPNavy.main
})

const StyledSignOutButton = styled(Button)({
  color: theme.palette.White.main,
  backgroundColor: theme.palette.HBPCTA.main,
  float: 'right',
  marginLeft: '-50%'
})

const StyledToolbarRightDiv = styled('div')({
  flex: '1'
})

const StyledHeaderLogoImage = styled('img')({
  height: 80,
  alignItems: 'left',
  float: 'left',
  margin: '0 15px 0 0'
})
const StyledTextField = styled(TextField)({
  width: 280
})

const StyledErrorMessage = styled(Typography)({
  color: theme.palette.Red.main
})

const StyledTableHeader = styled(TableRow)({
  backgroundColor: theme.palette.Grey.main
})

export {
  StyledPageContainer, StyledButton, StyledBoldTypograhy, SectionContainer, StyledTextArea,
  StyledFinalMessageContent, StyledEditButton, StyledToolbar, StyledSignOutButton,
  StyledHeaderLogoImage, StyledToolbarRightDiv, StyledSubHeader, StyledTextField,
  StyledErrorMessage, StyledTableHeader
}
