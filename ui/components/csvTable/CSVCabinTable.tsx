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
import { nanoid } from 'nanoid';
import { StyledTableHeader } from '../../styles/common';

// interface CsvCol {
//     email: string;
// }

type CSVCabinTableProps = {
    headers: String[];
    cols: String[];
}

// const useStyles : any = makeStyles({
//     header : { 
//         align:'left',
//         border:'1px solid grey',
//         backgroundColor: 'grey'
//     },
//     row : {
//         align:"left",
//         border: "1px solid grey"
//     }  
// });

export default function CSVCabinTable({ headers, cols }: CSVCabinTableProps) {
    const headerNames = headers
    const colValues = ["hello", "hi", "how are u"]
    const cabinValues = {
        'Cabin1': ["email1-1", "email1-2"],
        'Cabin2': ["email2-1", "email2-2", "email2-3"],
        'Cabin3': ["email3-1", "email3-2"],
        'Cabin4': ["email4-1", "email4-2"],
        'Cabin5': [],
        'Cabin6': ["email6-1", "email6-2"],
    }

    // vvvvvvvvvvvv trying to make rows of data//
    let rows : any[] = [{}]
    Object.values(cabinValues).forEach((value, index) => {
        value.forEach((entry, entryIndex) => {
            if(rows.length < entryIndex + 1) rows.push({})
            rows[entryIndex][index] = entry
        })
    })

    // const classes = useStyles();

    return (

        <>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <StyledTableHeader>
                            {headerNames.map((header: any) => (
                                <TableCell sx={{border: '1px solid grey'}}>
                                    {header}
                                </TableCell>
                            ))}
                        </StyledTableHeader>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={nanoid()}>
                                {Object.keys(cabinValues).map((cabin, cabinIndex) => (
                                <TableCell align='left' sx={{border: '1px solid grey'}}>
                                    {(row[cabinIndex]) || ''}
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