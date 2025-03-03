import { useReactTable, getCoreRowModel, getSortedRowModel } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TableSortLabel } from '@mui/material';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import './DashboardTable.css';

const columns = [
    { accessorKey: 'accountNumber', header: 'Account Number' },
    { accessorKey: 'accountHolder', header: 'Holder' },
    { accessorKey: 'balance', header: 'Balance' },
];

const TableHeader = ({ table, onSortChange }) => (
    <TableHead>
        {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                    <TableCell
                        key={header.id}
                        sx={{ textAlign: 'center', cursor: 'pointer' }}
                        sortDirection={header.column.getIsSorted() ? (header.column.getIsSorted() === 'desc' ? 'desc' : 'asc') : false}
                    >
                        {header.isPlaceholder ? null : (
                            <TableSortLabel
                                active={header.column.getIsSorted()}
                                direction={header.column.getIsSorted() === 'desc' ? 'desc' : 'asc'}
                                onClick={() => {
                                    const isDesc = header.column.getIsSorted() === 'desc';
                                    onSortChange([{ id: header.column.id, desc: !isDesc }]);
                                }}
                            >
                                {header.column.columnDef.header}
                            </TableSortLabel>
                        )}
                    </TableCell>
                ))}
            </TableRow>
        ))}
    </TableHead>
);

TableHeader.propTypes = {
    table: PropTypes.object.isRequired,
    onSortChange: PropTypes.func.isRequired,
};

const TableBodyContent = ({ table }) => (
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
);

TableBodyContent.propTypes = {
    table: PropTypes.object.isRequired,
};

const DashboardTable = ({ data, page, pageSize, totalRows, onPageChange, onPageSizeChange, onSortChange, sortBy, sortDir }) => {
    const sorting = useMemo(() => [{ id: sortBy, desc: sortDir === 'desc' }], [sortBy, sortDir]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: onSortChange,
        state: {
            sorting,
        },
    });

    return (
        <>
            <TableContainer component={Paper} sx={{ my: 4, width: '100%' }}>
                <Table sx={{ width: '100%' }}>
                    <TableHeader table={table} onSortChange={onSortChange} />
                    <TableBodyContent table={table} />
                </Table>
            </TableContainer>
            <TablePagination
                className='table-footer'
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

export default DashboardTable;