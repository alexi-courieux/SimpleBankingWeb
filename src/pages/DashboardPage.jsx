import React, { Component } from 'react';
import { useReactTable, getCoreRowModel, getSortedRowModel } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TextField, Box } from '@mui/material';
import PropTypes from 'prop-types';

const columns = [
    { accessorKey: 'accountNumber', header: 'Account Number' },
    { accessorKey: 'accountHolder', header: 'Holder' },
    { accessorKey: 'balance', header: 'Balance' },
];

const DashboardTable = ({ data, page, pageSize, totalRows, onPageChange, onPageSizeChange, onSortChange, sortBy, sortDir }) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: onSortChange,
    });

    return (
        <>
            <TableContainer component={Paper} sx={{ my: 4, width: '100%' }}>
                <Table sx={{ width: '100%' }}>
                    <TableHead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <TableCell key={header.id} sx={{ textAlign: 'center' }}>
                                        {header.isPlaceholder ? null : header.column.columnDef.header}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody>
                        {table.getRowModel().rows.map(row => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <TableCell key={cell.id} sx={{ textAlign: 'center' }}>
                                        {cell.column.columnDef.cell(cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={totalRows}
                page={page}
                onPageChange={onPageChange}
                rowsPerPage={pageSize}
                onRowsPerPageChange={onPageSizeChange}
            />
        </>
    );
};

DashboardTable.propTypes = {
    data: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    totalRows: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    onPageSizeChange: PropTypes.func.isRequired,
    onSortChange: PropTypes.func.isRequired,
    sortBy: PropTypes.string.isRequired,
    sortDir: PropTypes.string.isRequired,
};

class DashboardPage extends Component {
    state = {
        data: [],
        loading: true,
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
            const response = await fetch(`http://172.23.41.51:8080/api/v1/account?page=${page + 1}&size=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}&filter=${filter}`);
            const result = await response.json();
            this.setState({ data: result.accounts, totalRows: result.totalItems, loading: false });
            console.log('Data fetched:', result);
        } catch (error) {
            console.error('Error fetching data:', error);
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

    handleSortChange = (columnId, direction) => {
        this.setState({ sortBy: columnId, sortDir: direction }, this.fetchData);
    };

    render() {
        const { data, loading, page, pageSize, totalRows, filter } = this.state;

        console.log('Data:', data);
        console.log('Loading:', loading);
        console.log('Page:', page);
        console.log('Page size:', pageSize);
        console.log('Total rows:', totalRows);

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
                    sortBy={this.state.sortBy}
                    sortDir={this.state.sortDir}
                />
            </div>
        );
    }
}

export default DashboardPage;