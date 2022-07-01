import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

function createData (
  email: string,
  subject: string,
  name: string,
  company: string
) {
  return { email, subject, name, company }
}

const rows = [
  createData('example@facebook.com', 'Sponsoring HackBeanpot', 'Danaerys', 'Facebook'),
  createData('example@google.com', 'Sponsoring HackBeanpot', 'Jaime', 'Google'),
  createData('example@appfolio.com', 'Sponsoring HackBeanpot', 'Tyrion', 'Appfolio')
]

export default function CSVTable () {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell align="left">email</TableCell>
            <TableCell align="left">subject</TableCell>
            <TableCell align="left">name</TableCell>
            <TableCell align="left">company</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.subject}</TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.company}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
