export const fetchAccounts = async (page, pageSize, sortBy, sortDir, filter) => {
    try {
        const response = await fetch(`http://172.23.41.51:8080/api/v1/account?page=${page + 1}&size=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}&filter=${filter}`);
        const result = await response.json();
        return { accounts: result.accounts, totalItems: result.totalItems };
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const createAccount = async (accountNumber, accountHolder, balance) => {
    try {
        const response = await fetch('http://172.23.41.51:8080/api/v1/account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ accountNumber, accountHolder, balance }),
        });
        const result = await response.json();
        return result;
    }
    catch (error) {
        console.error('Error creating account:', error);
        throw error;
    }
};

export const deposit = async (accountNumber, amount) => {
    const response = await fetch('http://172.23.41.51:8080/api/v1/account/deposit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accountNumber, amount }),
    });

    if (!response.ok) {
        const error = await response.json();
        console.error('response ok:', response.ok);
        console.error('Error depositing:', error);
        throw new Error(error.message);
    }
};

export const withdraw  = async (accountNumber, amount) => {
    const response = await fetch('http://172.23.41.51:8080/api/v1/account/withdraw', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accountNumber, amount }),
    });

    if (!response.ok) {
        const error = await response.json();
        console.error('response ok:', response.ok);
        console.error('Error depositing:', error);
        throw new Error(error.message);
    }
};

export const transfer  = async (fromAccountNumber, toAccountNumber, amount) => {
    const response = await fetch('http://172.23.41.51:8080/api/v1/account/transfer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fromAccountNumber, toAccountNumber, amount }),
    });

    if (!response.ok) {
        const error = await response.json();
        console.error('response ok:', response.ok);
        console.error('Error depositing:', error);
        throw new Error(error.message);
    }
};