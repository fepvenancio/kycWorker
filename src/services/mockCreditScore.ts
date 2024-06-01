import { CreditScore, FormCSData } from '../types/sharedTypes';

export async function getCreditScore(userCreditScoreData: CreditScore): Promise<number> {
    const formCSData: FormCSData = {
        Annual_Income: userCreditScoreData.annual_Income,
        Monthly_Inhand_Salary: userCreditScoreData.monthly_Inhand_Salary,
        Num_Bank_Accounts: userCreditScoreData.num_Bank_Accounts,
        Num_Credit_Card: userCreditScoreData.num_Credit_Cards,
        Interest_Rate: userCreditScoreData.interest_Rate,
        Num_of_Loan: userCreditScoreData.num_Loans,
        Delay_from_due_date: userCreditScoreData.delay_From_Due_Date,
        Num_of_Delayed_Payment: userCreditScoreData.num_Delayed_Payments,
        Credit_Mix: userCreditScoreData.credit_Mix,
        Outstanding_Debt: userCreditScoreData.outstanding_Debt,
        Credit_History_Year: userCreditScoreData.credit_History_Year,
        Monthly_Balance: userCreditScoreData.monthly_Balance,
    };

    let formBody = Object.entries(formCSData).map(([key, value]) =>
        encodeURIComponent(key) + "=" + encodeURIComponent(value)
    )
        .join("&");


    const apiUrl = `http://13.49.227.187/credit`;
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formBody,
        });

        if (!response.ok) {
            const errorDetails = await response.json();
            console.error('API request failed with status:', response.status);
            console.error('Error details:', errorDetails);
            return 0;
        }

        const data: number = await response.json();
        console.log('Credit score:', data);
        return data;
    } catch (error) {
        console.error('Error occurred during API request:', error);
        return 0;
    }
}
