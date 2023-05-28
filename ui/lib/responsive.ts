import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

function useIsMobileSm () {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.up('xs'))
}

function useIsMobile () {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.up('sm'))
}

function useIsTablet () {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.up('md'))
}

function useIsDesktop () {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.up('lg'))
}

function useIsDesktopLg () {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.up('xl'))
}

export {
  useIsMobileSm,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  useIsDesktopLg
}
