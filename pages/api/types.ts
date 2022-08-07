export interface Message {
    messageID: number
    title: string
    message: string
    timestamp: Date
    createdBy: string
}

export interface Response {
    status: number
    message: any
}
