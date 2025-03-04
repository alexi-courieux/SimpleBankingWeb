import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, TextField, Button, Typography, Stack } from '@mui/material';
import { withdraw } from '../services/accountService';

const WithdrawPage = () => {
    const { accountNumber } = useParams();
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [account, setAccount] = useState(accountNumber);

    const handleAccountChange = (e) => {
        setAccount(e.target.value);
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };


    const handleSubmit = (e) => {
        setError('');
        setSuccess('');
        e.preventDefault();
        if (amount <= 0) {
            setError('Please enter a valid amount.');
            setSuccess('');
        } else {
            withdraw(account, amount)
                .then(() => {
                    setAmount('');
                    setSuccess(`Successfully withdrawn $${amount} from account ${account}.`);
                })
                .catch((error) => {
                    console.error('Error withdrawing:', error);
                    setError('Error withdrawing. Please try again.');
                });
        }
    };

    return (
        <Container maxWidth="sm">
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        label="Account Number"
                        type='number'
                        variant="outlined"
                        value={account}
                        disabled={accountNumber}
                        onChange={handleAccountChange}
                        fullWidth
                        required
                        autoComplete='off'
                    />
                    <TextField
                        label="Withdraw Amount"
                        type="number"
                        variant="outlined"
                        value={amount}
                        onChange={handleAmountChange}
                        fullWidth
                        required
                        autoComplete='off'
                    />
                    {error && <Typography color="error">{error}</Typography>}
                    {success && <Typography color="success">{success}</Typography>}
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Withdraw
                    </Button>
                </Stack>
            </form>
        </Container>
    );
};

export default WithdrawPage;