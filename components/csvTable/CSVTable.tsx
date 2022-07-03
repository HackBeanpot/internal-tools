import * as React from 'react'
import { Table, TableBody, TableCell, Paper, TableContainer, TableHead, TableRow } from '@mui/material'
// import { Props } from 'next/script'
// import PropTypes from 'prop-types'

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

// new version but doesn't work
// export default function CSVTable({ headers }: Props) {
//   return (
//     { headers.map((header)) => (
//       <TableContainer component={Paper}>
//         <Table aria-label="simple table">
//           <TableHead>
//             <TableRow>

//               <TableCell align="left">{header}</TableCell>

//           //  <TableCell align="left">email</TableCell>
//           //   <TableCell align="left">subject</TableCell>
//           //   <TableCell align="left">name</TableCell>
//           //   <TableCell align="left">company</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.map((row) => (
//               <TableRow
//                 key={row.name}
//               >

//                 <TableCell align="left">{row.header}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     )
//   })
// }

export default function CSVTable () {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
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

// CSVTable.propTypes = {
//   children: PropTypes.oneOfType([
//     PropTypes.arrayOf(PropTypes.element),
//     PropTypes.element.isRequired
//   ])
// }
