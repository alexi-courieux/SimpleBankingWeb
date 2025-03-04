import { Component } from 'react';
import { Container, Typography, Box, Button, Stack, ButtonGroup } from '@mui/material';
import './App.css';
import DashboardPage from './pages/DashboardPage';
import CreateAccountPage from './pages/CreateAccountPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TransferPage from './pages/TransferPage';
import WithdrawPage from './pages/WithdrawPage';
import DepositPage from './pages/DepositPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <Router>
        <Container maxWidth="lg">
          <Box sx={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: 'white', py: 2, textAlign: 'center' }}>
            <a href="/">
              <Typography variant="h4" component="h1">
                Simple Banking
              </Typography>
            </a>
            <Stack direction={'row'} spacing={2} sx={{ my: 1 }} justifyContent={'center'}>
              <Button variant="contained" color="primary" href="/account" disabled={window.location.pathname === '/account' || window.location.pathname === '/'}>
                Accounts
              </Button>
              <Button variant="contained" color="primary" href="/account/new" disabled={window.location.pathname === '/account/new'}>
                Create Account
              </Button>
            </Stack>
            <Stack direction={'row'} spacing={2} sx={{ my: 1 }} justifyContent={'center'}>
              <ButtonGroup variant="contained" color="secondary">
              <Button variant="contained" color="secondary" href="/transfer" disabled={window.location.pathname === '/transfer'}>
                Transfer
              </Button>
              <Button variant="contained" color="secondary" href="/withdraw" disabled={window.location.pathname === '/withdraw'}>
                Withdraw
              </Button>
              <Button variant="contained" color="secondary" href="/deposit" disabled={window.location.pathname === '/deposit'}>
                Deposit
              </Button>
              </ButtonGroup>
            </Stack>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/account" element={<DashboardPage />} />
              <Route path="/account/new" element={<CreateAccountPage />} />
              <Route path="/transfer" element={<TransferPage />} />
              <Route path="/transfer/:fromAccountNumber/:toAccountNumber" element={<TransferPage />} />
              <Route path="/withdraw" element={<WithdrawPage />} />
              <Route path="/withdraw/:accountNumber" element={<WithdrawPage />} />
              <Route path="/deposit" element={<DepositPage />} />
              <Route path="/deposit/:accountNumber" element={<DepositPage />} />
            </Routes>
          </Box>
        </Container>
      </Router>
    );
  }
}

export default App;