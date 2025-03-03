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