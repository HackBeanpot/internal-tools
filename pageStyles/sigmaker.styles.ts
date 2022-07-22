import { FormControl, Grid, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import { TextValidator } from 'react-material-ui-form-validator'

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
  StyledInputField,
  StyledGrid,
  StyledFormControl,
  StyledTextValidator
}
