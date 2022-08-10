import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { MessageTemplate } from '../../lib/types'
import { Typography, Stack } from '@mui/material'

type TemplateDropdownProps = {
  templates: MessageTemplate[]
}

export default function TemplateDropdown ({ templates }: TemplateDropdownProps) {
  const [template, setTemplate] = React.useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setTemplate(event.target.value)
  }

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 400 }}>
        <InputLabel id="demo-simple-select-standard-label">Select Template</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={template}
          onChange={handleChange}
          label="Select Template"
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
      </FormControl>
    </div>
  )
}