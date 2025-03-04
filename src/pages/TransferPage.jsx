import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, TextField, Button, Typography, Stack, IconButton } from '@mui/material';
import { transfer } from '../services/accountService';
import SwapVertIcon from '@mui/icons-material/SwapVert';

const TransferPage = () => {
    const { fromAccountNumber, toAccountNumber } = useParams();
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [fromAccount, setFromAccount] = useState(fromAccountNumber || '');
    const [toAccount, setToAccount] = useState(toAccountNumber || '');

    const handleFromAccountChange = (e) => {
        setFromAccount(e.target.value);
    };

    const handleToAccountChange = (e) => {
        setToAccount(e.target.value);
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleSwapAccounts = () => {
        const temp = fromAccount;
        setFromAccount(toAccount);
        setToAccount(temp);
    };

    const handleSubmit = (e) => {
        setError('');
        setSuccess('');
        e.preventDefault();
        if (amount <= 0) {
            setError('Please enter a valid amount.');
            setSuccess('');
        } else {
            transfer(fromAccount, toAccount, amount)
                .then(() => {
                    setAmount('');
                    setSuccess(`Successfully transferred $${amount} from account ${fromAccount} to account ${toAccount}.`);
                })
                .catch((error) => {
                    console.error('Error transferring:', error);
                    setError('Error transferring. Please try again.');
                });
        }
    };

    return (
        <Container maxWidth="sm">
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        label="From Account Number"
                        type='number'
                        variant="outlined"
                        value={fromAccount}
                        disabled={!!fromAccountNumber}
                        onChange={handleFromAccountChange}
                        fullWidth
                        required
                        autoComplete='off'
                        size='small'
                    />
                    <IconButton onClick={handleSwapAccounts} sx={{ alignSelf: 'center', m: 0, p: 0 }}>
                        <SwapVertIcon />
                    </IconButton>
                    <TextField
                        label="To Account Number"
                        type='number'
                        variant="outlined"
                        value={toAccount}
                        disabled={!!toAccountNumber}
                        onChange={handleToAccountChange}
                        fullWidth
                        required
                        autoComplete='off'
                        size='small'
                    />
                    <TextField
                        label="Transfer Amount"
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
                        Transfer
                    </Button>
                </Stack>
            </form>
        </Container>
    );
};

export default TransferPage;