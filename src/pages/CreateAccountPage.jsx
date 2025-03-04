import React, { useState } from 'react';
import { Stack, TextField, InputAdornment, IconButton, Button } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { createAccount } from '../services/accountService';

const CreateAccountPage = () => {
    const [formData, setFormData] = useState({
        accountNumber: '',
        accountHolder: '',
        balance: 0.00,
    });

    const handleGenerateAccountNumber = () => {
        const randomAccountNumber = Math.floor(10000000 + Math.random() * 90000000).toString();
        setFormData({ ...formData, accountNumber: randomAccountNumber });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createAccount(formData.accountNumber, formData.accountHolder, formData.balance)
            .then(() => {
                window.history.back();
            })
            .catch((error) => {
                console.error('Error creating account:', error);
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Stack direction={'column'} spacing={2}>
                    <TextField
                        label="Account Number"
                        type='number'
                        variant="outlined"
                        value={formData.accountNumber}
                        onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleGenerateAccountNumber}>
                                            <AutorenewIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        }}
                    />
                    <TextField
                        label="Account Holder"
                        variant="outlined"
                        value={formData.accountHolder}
                        onChange={(e) => setFormData({ ...formData, accountHolder: e.target.value })}
                        placeholder='John Doe'
                    />
                    <TextField
                        label="Balance"
                        type='number'
                        variant="outlined"
                        value={formData.balance}
                        onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                    />
                    <Stack direction={'row'} spacing={2}>
                        <Button variant="contained" color="secondary" onClick={() => window.history.back()}>
                            Cancel
                        </Button>
                        <Button type='submit' variant="contained" color="primary">
                            Create Account
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </div>
    );
};

export default CreateAccountPage;