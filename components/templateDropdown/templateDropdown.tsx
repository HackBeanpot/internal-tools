import * as React from 'react'
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  Stack
} from '@mui/material'
import { MessageTemplate } from '../../lib/types'
import { StyledFormControl } from './templateDropdown.styles'

type TemplateDropdownProps = {
  templates: MessageTemplate[]
}

export default function TemplateDropdown ({ templates }: TemplateDropdownProps) {
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
            <em>Select Template</em>
          </MenuItem>
          {templates.map((item: MessageTemplate) => (
            <MenuItem key={item.messageID}>
              <Stack direction="row" spacing={2}>
                <Typography variant="body1">
                  {item.title}
                </Typography>
                <Typography variant="body1">
                  {item.timestamp.toLocaleString()}
                </Typography>
              </Stack>
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>
    </>
  )
}
