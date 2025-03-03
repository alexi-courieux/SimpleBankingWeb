import { Component } from 'react';
import { Container, Typography, Box } from '@mui/material';
import './App.css';
import DashboardPage from './pages/DashboardPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
          <Box sx={{ my: 4, textAlign: 'center' }}>
            <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
              Simple Banking
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/about" element={<div>About</div>} />
              <Route path="/users" element={<div>Users</div>} />
            </Routes>
          </Box>
        </Container>
      </Router>
    );
  }
}

export default App;