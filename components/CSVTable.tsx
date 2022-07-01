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
            <TableCell>email</TableCell>
            <TableCell align="right">subject</TableCell>
            <TableCell align="right">name</TableCell>
            <TableCell align="right">company</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.subject}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.company}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
