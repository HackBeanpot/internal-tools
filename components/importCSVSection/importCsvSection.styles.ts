import { styled } from '@mui/material/styles'
import { StyledButton } from '../../styles/common'

const StyledCsvButton = styled(StyledButton)({
  marginLeft: 5,
  marginRight: 5
})

const StyledCsvButtonsContainer = styled('div')({
  display: 'flex'
})

const SectionContainer = styled('div')({
  marginTop: 30,
  marginBottom: 30
})

export {
  StyledCsvButton, StyledCsvButtonsContainer, SectionContainer
}
