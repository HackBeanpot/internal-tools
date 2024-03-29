import * as React from 'react'
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  Stack,
  InputLabel
} from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CheckIcon from '@mui/icons-material/Check'
import { StyledFormControl } from './templateDropdown.styles'
import { theme } from '../../styles/theme'
import SimpleSnackBar from '../snackBar/simpleSnackBar'

type SelectedCabinProps = {
  cabinNames: string[];
  cabinValues: string[][];
};

export default function SelectedCabin ({ cabinNames, cabinValues }: SelectedCabinProps) {
  const [selectedItem, setSelectedItem] = React.useState(-1)
  const [copied, setCopied] = React.useState(false)

  const [openSnackBar, setOpenSnackBar] = React.useState(false)

  const handleChange = (event: SelectChangeEvent) => {
    const str = event.target.value
    setSelectedItem(Number(str.charAt(str.length - 1)))
    setCopied(false)
    setOpenSnackBar(false)
  }

  const [hoverCopy, setHoverCopy] = React.useState(false)

  return (
    <>
      <StyledFormControl style={{ width: '9em', display: 'inline-block' }}>
        <InputLabel>Cabin</InputLabel>
        <Select
          value={cabinNames[selectedItem]}
          onChange={handleChange}
          label="Cabin"
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          style={{
            width: '9em',
            backgroundColor: theme.palette.Grey.main,
            fontSize: '0.9em'
          }}
        >
          {cabinNames.map((item: string, index) => (
            <MenuItem key={index} value={item} style={{ fontSize: '0.9em' }}>
              <Stack direction="row" spacing={2}>
                <Typography style={{ fontSize: '0.9em' }}>{item}</Typography>
              </Stack>
            </MenuItem>
          ))}
        </Select>
        {copied
          ? (
          <span
            style={{
              color: 'green',
              marginLeft: '1em',
              position: 'absolute',
              top: '21%'
            }}
          >
            <CheckIcon fontSize="medium" />
          </span>
            )
          : (
              selectedItem && (
            <span
              style={{
                marginLeft: '1em',
                position: 'absolute',
                top: '21%',
                cursor: hoverCopy ? 'pointer' : 'none'
              }}
              onClick={() => {
                navigator.clipboard.writeText(cabinValues[selectedItem].toString())
                setCopied(true)
                setOpenSnackBar(true)
              }}
              onMouseEnter={() => setHoverCopy(true)}
              onMouseLeave={() => setHoverCopy(false)}
            >
              <span color="#5e5d5d">
                <ContentCopyIcon fontSize="medium" />
              </span>
            </span>
              )
            )}

        {openSnackBar && (
          <SimpleSnackBar
            message="Copied to Clipboard"
            verticalPos="bottom"
            horizontalPos="left"
          />
        )}
      </StyledFormControl>
    </>
  )
}
