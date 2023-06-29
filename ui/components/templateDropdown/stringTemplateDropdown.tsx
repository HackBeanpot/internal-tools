import * as React from 'react'
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  Stack
} from '@mui/material'
import { StyledFormControl } from './templateDropdown.styles'

type TemplateDropdownProps = {
  templates: string[]
}

export default function StringTemplateDropdown ({ templates }: TemplateDropdownProps) {
  const [template, setTemplate] = React.useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setTemplate(event.target.value)
  }



  return (
    <>
      <StyledFormControl>
        <Select
          value={template}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            <em>Select Option</em>
          </MenuItem>
          {templates.map((item: string, index) => (
            <MenuItem key={index} value={item}>
              <Stack direction="row" spacing={2}>
                <Typography variant="body1">
                  {item}
                </Typography>
              </Stack>
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>
    </>
  )
}
