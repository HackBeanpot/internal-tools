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

// interface CsvCol {
//     email: string;
// }

type CSVCabinTableProps = {
    headers: String[];
    cols: String[];
}

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
            rows[entryIndex]
        })
    })

    console.log(rows)




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
                        <TableRow>
                            
                        </TableRow>
                    </TableBody>
                </Table>

            </TableContainer>
        </>
    )
}