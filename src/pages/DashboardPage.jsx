import React, { useState, useEffect } from 'react';
import { fetchAccounts } from '../services/accountService';
import DashboardTable from '../components/DashboardTable';
import { TextField, Box } from '@mui/material';

const DashboardPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const [sortBy, setSortBy] = useState('balance');
    const [sortDir, setSortDir] = useState('desc');
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchAccounts(page, pageSize, sortBy, sortDir, filter);
                setData(result.accounts);
                setTotalRows(result.totalItems);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page, pageSize, sortBy, sortDir, filter]);

    const handlePageChange = (_, newPage) => {
        setPage(newPage);
    };

    const handlePageSizeChange = (event) => {
        setPageSize(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
        setPage(0);
    };

    const handleSortChange = (sortBy) => {
        const sortDir = sortBy[0].desc ? 'desc' : 'asc';
        setSortBy(sortBy[0].id);
        setSortDir(sortDir);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div style={{ width: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', gap: 2, position: 'sticky', top: 150, pt: 1, zIndex: 1, backgroundColor: 'white', textAlign: 'center' }}>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={filter}
                    onChange={handleFilterChange}
                    fullWidth
                    autoComplete='off'
                />
            </Box>
            <DashboardTable
                data={data}
                page={page}
                pageSize={pageSize}
                totalRows={totalRows}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                onSortChange={handleSortChange}
                sortBy={sortBy}
                sortDir={sortDir}
            />
        </div>
    );
};

export default DashboardPage;