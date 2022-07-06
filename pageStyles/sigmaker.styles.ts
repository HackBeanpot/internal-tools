import { FormControl, Grid, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { TextValidator } from 'react-material-ui-form-validator';
import Link from 'next/link'

const StyledGmailHeader = styled(Typography)({
  paddingBottom: 16
})

const StyledTable = styled('table')(({ theme }) => ({
  background: 'none',
  borderWidth: 0,
  border: 0,
  margin: 0,
  padding: 0,
  [theme.breakpoints.up('xs')]: {
    marginLeft: -25
  }
}))

const StyledLogoContainer = styled('td')({
  paddingRight: 24,
  border: 0
})

const StyledContentContainer = styled('td')({
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 12,
  paddingRight: 0,
  lineHeight: '21px'
})

const StyledSignatureName = styled('td')(({ theme }) => ({
  color: theme.palette.HBPNavy.main,
  fontWeight: 'bold',
  fontSize: 18,
  fontFamily: '\'Nunito Sans\', Helvetica, sans-serif'
}))

const StyledLogoImage = styled('img')({
  height: 132
})

const StyledSignatureText = styled('td')(({ theme }) => ({
  color: theme.palette.HBPNavy.main,
  fontSize: 14,
  fontFamily: theme.typography.fontFamily
}))

const StyledPhoneNumber = styled('td')(({ theme }) => ({
  color: theme.palette.HBPNavy.main,
  textDecoration: 'none',
  fontSize: 14,
  fontFamily: theme.typography.fontFamily
}))

const StyledLinkContainer = styled('td')(({ theme }) => ({
  verticalAlign: 'top',
  color: theme.palette.HBPNavy.main,
  fontSize: 14,
  fontFamily: theme.typography.fontFamily
}))

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.Mist.main,
  textDecoration: 'none',
  fontWeight: 'normal',
  fontSize: 14
}))

const StyledInputField = styled(TextField)({
  width: '25ch'
})

const StyledGrid = styled(Grid)({
  rowGap: 3
})

const StyledFormControl = styled(FormControl)({
  marginTop: 40,
  marginBottom: 40
})

const StyledTextValidator = styled(TextValidator)({
  width: 280
})

export {
  StyledGmailHeader,
  StyledTable,
  StyledLogoContainer,
  StyledContentContainer,
  StyledSignatureName,
  StyledLogoImage,
  StyledSignatureText,
  StyledPhoneNumber,
  StyledLinkContainer,
  StyledLink,
  StyledInputField,
  StyledGrid,
  StyledFormControl,
  StyledTextValidator
}
