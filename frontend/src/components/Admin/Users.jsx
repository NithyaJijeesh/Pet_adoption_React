import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import AdminNav from './AdminNav';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'Email', minWidth: 100 },
  {
    id: 'population',
    label: 'Phone',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Address',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'User',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'density',
    label: 'Action',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(name, email, phone, address, user, action) {
//   const density = population / size;
  return { name, email, phone, address, user, action };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263, 'donor'),
  createData('China', 'CN', 1403500365, 9596961, 'buyer'),
  createData('Italy', 'IT', 60483973, 301340, 'buyer'),
  createData('United States', 'US', 327167434, 9833520, 'buyer'),
  createData('Canada', 'CA', 37602103, 9984670, 'donor'),
  createData('Canada', 'CA', 37602103, 9984670, 'donor'),
  createData('Australia', 'AU', 25475400, 7692024, 'buyer'),
  createData('Germany', 'DE', 83019200, 357578, 'buyer'),
  createData('Ireland', 'IE', 4857000, 70273, 'buyer'),
  createData('Mexico', 'MX', 126577691, 1972550, 'buyer'),
  createData('Japan', 'JP', 126317000, 377973, 'buyer'),
  createData('France', 'FR', 67022000, 640679, 'donor'),
  createData('United Kingdom', 'GB', 67545757, 242495, 'buyer'),
  createData('Russia', 'RU', 146793744, 17098246, 'donor'),
  createData('Nigeria', 'NG', 200962417, 923768, 'buyer'),
  createData('Brazil', 'BR', 210147125, 8515767, 'buyer'),
  createData('United States', 'US', 327167434, 9833520, 'buyer'),
 
];

export default function Users() {
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

  const content = (
    <Paper py={5} sx={{ width: '100%', overflow: 'hidden', borderRadius: '10px', backgroundColor:'seashell' }}>
        <h2 sx={{ fontFamily : 'cursive', color: '#1b2b5d'}}>User Details</h2>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, backgroundColor:'#1b2b5d', color: 'seashell' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
            //   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

    </Paper>
  )

  return (
        <AdminNav  content={content}/>
    );   
}
