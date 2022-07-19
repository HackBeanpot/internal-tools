import { styled } from '@mui/system'
import { Button, Container, TextareaAutosize, Toolbar, Typography } from '@mui/material'
import { theme } from './theme'


const StyledPageContainer = styled(Container)({
  marginTop: 40,
  marginBottom: 40
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

export {
  StyledPageContainer, StyledButton, StyledBoldTypograhy, SectionContainer, StyledTextArea,
  StyledFinalMessageContent, StyledEditButton, StyledToolbar
}
