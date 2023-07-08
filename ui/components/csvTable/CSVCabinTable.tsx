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
};

export default function CSVCabinTable ({ headers }: CSVCabinTableProps) {
  const headerNames = headers
  const cabinValues = {
    Cabin1: ['email1-1', 'email1-2'],
    Cabin2: ['email2-1', 'email2-2', 'email2-3'],
    Cabin3: ['email3-1', 'email3-2'],
    Cabin4: ['email4-1', 'email4-2'],
    Cabin5: [],
    Cabin6: ['email6-1', 'email6-2']
  }

  const rows: any[] = [{}]
  Object.values(cabinValues).forEach((value, index) => {
    value.forEach((entry, entryIndex) => {
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
                {Object.keys(cabinValues).map((cabin, cabinIndex) => (
                  <TableCell
                    key={nanoid()}
                    style={
                      cabinIndex < Object.keys(cabinValues).length - 1
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