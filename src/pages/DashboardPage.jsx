import React, { Component } from 'react';
import { fetchAccounts } from '../services/accountService';
import DashboardTable from '../components/DashboardTable';
import { TextField, Box } from '@mui/material';

class DashboardPage extends Component {
    state = {
        data: [],
        loading: true,
        error: null,
        page: 0,
        pageSize: 10,
        totalRows: 0,
        sortBy: 'balance',
        sortDir: 'desc',
        filter: '',
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        const { page, pageSize, sortBy, sortDir, filter } = this.state;
        try {
            const result = await fetchAccounts(page, pageSize, sortBy, sortDir, filter);
            this.setState({ data: result.accounts, totalRows: result.totalItems });
        } catch (error) {
            this.setState({ error });
        } finally {
            this.setState({ loading: false });
        }
    };

    handlePageChange = (_, newPage) => {
        this.setState({ page: newPage }, this.fetchData);
    };

    handlePageSizeChange = (event) => {
        this.setState({ pageSize: parseInt(event.target.value, 10), page: 0 }, this.fetchData);
    };

    handleFilterChange = (event) => {
        this.setState({ filter: event.target.value, page: 0 }, this.fetchData);
    };

    handleSortChange = (sortBy) => {
        console.log('sortBy', sortBy);
        const sortDir = sortBy[0].desc ? 'desc' : 'asc';
        this.setState({ sortBy: sortBy[0].id, sortDir }, this.fetchData);
    };

    render() {
        const { data, loading, page, pageSize, totalRows, filter, sortBy, sortDir } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        return (
            <div style={{ width: '100%' }}>
                <Box sx={{ my: 2 }}>
                    <TextField
                        label="Search"
                        variant="outlined"
                        value={filter}
                        onChange={this.handleFilterChange}
                        fullWidth
                    />
                </Box>
                <DashboardTable
                    data={data}
                    page={page}
                    pageSize={pageSize}
                    totalRows={totalRows}
                    onPageChange={this.handlePageChange}
                    onPageSizeChange={this.handlePageSizeChange}
                    onSortChange={this.handleSortChange}
                    sortBy={sortBy}
                    sortDir={sortDir}
                />
            </div>
        );
    }
}

export default DashboardPage;