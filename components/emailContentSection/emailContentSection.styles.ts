import DeleteIcon from '@mui/icons-material/Delete'
import { styled } from '@mui/material/styles'
import { theme } from '../../styles/theme'
import { Typography } from '@mui/material'

const StyledDeleteIcon = styled(DeleteIcon)({
  marginBottom: -5,
  marginLeft: 5,
  cursor: 'pointer'
})

const StyledLoadingContainer = styled('div')({
  display: 'flex',
  marginTop: 20,
  marginBottom: 20
})

const StyledLoadingTypography = styled(Typography)({
  color: theme.palette.HBPNavy.main,
  marginLeft: 15
})

export { StyledDeleteIcon, StyledLoadingContainer, StyledLoadingTypography }
