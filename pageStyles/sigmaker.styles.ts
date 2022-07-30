import { FormControl, Grid, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { TextValidator } from 'react-material-ui-form-validator'

const StyledGmailHeader = styled(Typography)({
  paddingBottom: 16
})

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

const StyledLogoImage = styled('img')({
  height: 132
})

export {
  StyledGmailHeader,
  StyledInputField,
  StyledGrid,
  StyledFormControl,
  StyledTextValidator,
  StyledLogoImage
}
