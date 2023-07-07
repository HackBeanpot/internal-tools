import * as React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  Paper,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import { nanoid } from 'nanoid'
import { StyledTableHeader } from '../../styles/common'

type CSVCabinTableProps = {
  headers: String[];
  cabinValues: any;
};

export default function CSVCabinTable ({ headers, cabinValues }: CSVCabinTableProps) {
  const headerNames = headers
  const cabinEmails = cabinValues

  const rows: any[] = [{}]
  Object.values(cabinEmails).forEach((value: any, index: number) => {
    value.forEach((entry: string, entryIndex: number) => {
      if (rows.length < entryIndex + 1) rows.push({})
      rows[entryIndex][index] = entry
    })
  })

  return (
    <>
      <TableContainer
        component={Paper}
        elevation={0}
        style={{
          borderTop: '1px solid #B9B9B9',
          borderRight: '1px solid #B9B9B9',
          borderLeft: '1px solid #B9B9B9'
        }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <StyledTableHeader>
              {headerNames.map((header: any, headerIndex: number) => (
                <TableCell
                  key={nanoid()}
                  style={
                    headerIndex < headerNames.length - 1
                      ? {
                          padding: '9px',
                          borderRight: '1px solid #B9B9B9',
                          borderBottom: '1px solid #B9B9B9'
                        }
                      : {
                          padding: '9px',
                          borderBottom: '1px solid #B9B9B9'
                        }
                  }
                >
                  {header}
                </TableCell>
              ))}
            </StyledTableHeader>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={nanoid()}>
                {Object.keys(cabinEmails).map((cabin, cabinIndex) => (
                  <TableCell
                    key={nanoid()}
                    style={
                      cabinIndex < Object.keys(cabinEmails).length - 1
                        ? {
                            padding: '9px',
                            borderRight: '1px solid #B9B9B9',
                            borderBottom: '1px solid #B9B9B9'
                          }
                        : {
                            padding: '9px',
                            borderBottom: '1px solid #B9B9B9'
                          }
                    }
                  >
                    {row[cabinIndex] || ''}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
