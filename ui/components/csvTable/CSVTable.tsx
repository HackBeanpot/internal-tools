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
import { CsvRow } from '../../lib/types'

type CSVTableProps = {
  headers: String[];
  rows: CsvRow[]; 
};

export default function CSVTable ({ headers, rows }: CSVTableProps) {
  const headerNames = headers
  const rowValues = rows
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {headerNames.map((header: any) => (
                <TableCell align="left" key={nanoid()}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowValues.map((item: any) => (
              <TableRow key={nanoid()}>
                {Object.values(item).map((val: any) => (
                  <TableCell key={nanoid()} align="left">
                    {val}
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
