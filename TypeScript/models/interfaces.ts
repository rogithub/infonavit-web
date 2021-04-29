export interface Credit {
    id: number,
    creditNumber: number,
    startDate: number,
    creditName: string,
    interestRatePercent: number,
    montlyPaymentByEmployer: number,
    montlyPaymentByEmployee: number,
    totalCreditAmount: number,
    years: number
}

export interface Payment {
    id: number,
    creditId: number,
    paymentDate: number,
    number: number,
    isPaymentOnTime: boolean,
    isViaPayrol: boolean,
    amount: number,
    documentId: number,
    comments: string,
}

export interface Document {
    id: number,
    fileName: string,
    createdDate: number
}