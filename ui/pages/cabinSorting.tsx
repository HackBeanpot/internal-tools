import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import { Button, Divider, ThemeProvider, Typography } from '@mui/material'
import { theme } from '../styles/theme'
import { StyledButton, StyledPageContainer } from '../styles/common'
import { CSVLink } from 'react-csv'
import CSVCabinTable from '../components/csvTable/CSVCabinTable'
import SelectedCabin from '../components/templateDropdown/selectedCabin'
import BackArrow from '../components/backArrow/backArrow'
import axios from 'axios'

export default function CabinSorting () {
  
  type HackerEmails = {
    emails: string[]
  }
  
  type GetGroupedHackersResponse = {
    data: HackerEmails[]
  }


  const cabinHeaders: string[] = [
    'Cabin 1',
    'Cabin 2',
    'Cabin 3',
    'Cabin 4',
    'Cabin 5',
    'Cabin 6'
  ]

  const [cabinValues, setCabinValues] = useState<HackerEmails>([])

  async function updateCabinValues () {
    axios.get<GetGroupedHackersResponse>(process.env.GROUPED_HACKERS_URL!).then(groupedHackersResponse => {
      setCabinValues(groupedHackersResponse.data)
    })
  }

  useEffect(() => {
    updateCabinValues()
  }, [])

  const rows: string[][] = [[]]
  Object.values(cabinValues).forEach((value: any, index: number) => {
    value.forEach((entry: string, entryIndex: number) => {
      if (rows.length < entryIndex + 1) rows.push([])
      rows[entryIndex][index] = entry
    })
  })

  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <StyledPageContainer>
          <BackArrow />
          <Typography variant="h3">Cabin Sorting Tool</Typography>
          <Divider />
          <br />
          <Typography variant="h6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim description of the tool.
          </Typography>
          <br />
          <div style={{ justifyContent: 'space-between' }}>
            <StyledButton
              size="large"
              color="info"
              variant="contained"
              type="submit"
              sx={{ width: '16em' }}
            >
              Regenerate Sorted Hackers
            </StyledButton>
            <span style={{ float: 'right' }}>
              <CSVLink data={rows} headers={cabinHeaders} separator={','}>
                <Button
                  variant="contained"
                  component="span"
                  size="large"
                  style={{ textTransform: 'none', width: '10em' }}
                >
                  Export CSV
                </Button>
              </CSVLink>
            </span>
          </div>
          <br />
          <CSVCabinTable headers={cabinHeaders} cabinValues={cabinValues} />
          <br />
          <Typography variant="h5">Copy email list</Typography>
          <br />
          <SelectedCabin cabinNames={cabinHeaders} cabinValues={cabinValues} />
        </StyledPageContainer>
      </ThemeProvider>
    </Layout>
  )
}
