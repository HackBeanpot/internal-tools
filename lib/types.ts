
export interface SignatureData {
    fullName: string
    title: string
    phone: string
    email: string
}

export interface EmailHeader {
    cc: string
    bcc: string
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
    id: string;
    to: string;
    cc: string;
    bcc: string;
    subject: string;
    content: string;
}

export interface ErrorMessage {
    id: string;
    message: string;
}

export interface ResultMessage {
   isError: boolean;
   message: string;
}
