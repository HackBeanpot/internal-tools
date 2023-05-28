import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledSubHeader = styled(Typography)({
  paddingBottom: 5
})

const StyledLink = styled('a')(({ theme }) => ({
  color: theme.palette.Mist.main
}))

export {
  StyledSubHeader,
  StyledLink
}
