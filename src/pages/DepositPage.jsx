import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, TextField, Button, Typography, Stack } from '@mui/material';
import { deposit } from '../services/accountService';

const DepositPage = () => {
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
            deposit(account, amount)
                .then(() => {
                    setAmount('');
                    setSuccess(`Successfully deposited $${amount} to account ${account}.`);
                })
                .catch((error) => {
                    console.error('Error depositing:', error);
                    setError('Error depositing. Please try again.');
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
                        label="Deposit Amount"
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
                        Deposit
                    </Button>
                </Stack>
            </form>
        </Container>
    );
};

export default DepositPage;