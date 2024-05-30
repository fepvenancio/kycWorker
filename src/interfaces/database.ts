export interface Client {
    id: number;
    creator: string;
}

export interface Provider {
    id: number;
    name: string;
}

export interface Relation {
    id: number;
    address: string;
    provider_id: number;
    client_id: number;
    submissionId: string;
    yearOfBirth: number;
    countryCode: number;
    isAdult: number;
    creditScore: number;
}

export interface Info {
    success: boolean;
    meta: {
        duration: number;
    }
}

export interface Address {
    address: string;
}

export interface ProviderData {
    name: string,
    yearOfBirth: number,
    country: string,
    provider_id: number,
    submission_id: string,
    annual_Income: number,
    monthly_Inhand_Salary: number,
    num_Bank_Accounts: number,
    num_Credit_Cards: number,
    interest_Rate: number,
    num_Loans: number,
    delay_From_Due_Date: number,
    num_Delayed_Payments: number,
    credit_Mix: number,
    outstanding_Debt: number,
    credit_History_Year: number,
    monthly_Balance: number
}
