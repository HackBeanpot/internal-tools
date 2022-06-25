
export interface SignatureData {
    fullName: string
    title: string
    phone: string
    email: string
}

export interface CsvRow {
    email: string;
    subject: string
}

export interface ReplaceObj {
    toReplace: string;
    headerName: string;
}

export interface Message {
    to: string;
    subject: string;
    content: string;
}
