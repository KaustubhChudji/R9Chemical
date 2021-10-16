import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
//import TableSortLabel from '@mui/material/TableSortLabel';
import Navbar from '../login/Navbar';
import Upload from '../Pages/Upload';
import ExportTabeBtn from '../Pages/ExportTableBtn';
// import DateRangePicker from '../Pages/DateRangePicker';
import axios from 'axios';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';

const columns = [
  { id: 'Date', field: 'date', label: 'Date', format: ('DD/MM/YYYY') },
  { id: 'Product', field: 'productName', label: 'Product', minWidth: 100 },
  { id: 'Producer', field: 'producer', label: 'Producer', },
  { id: 'Grade', field: 'grade', label: 'Grade', minWidth: 6, },
  { id: 'Category', field: 'category', label: 'Category', minWidth: 7, },
  { id: 'TradingMode', field: 'tradingMode', label: 'Trading Mode', minWidth: 22, },
  { id: 'MarketPort', field: 'market', label: 'Market / Port', minWidth: 15, },
  { id: 'Price', field: 'price', label: 'Price', minWidth: 5, },
  { id: 'Unit', field: 'unitType', label: 'Unit', minWidth: 5, },
  { id: 'Change', field: '', label: 'Change', minWidth: 6, },
];

;
function createData(Date, Product, Producer, Grade, Category, TradingMode, MarketPort, Price, Unit, Change) {
  //const density = population / size;
  return { Date, Product, Producer, Grade, Category, TradingMode, MarketPort, Price, Unit, Change };
}

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));




export default function StickyHeadTable() {
  const startValue = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  const endValue = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  const minDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 30);

  const maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

  const fetchInventory = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: ' '
    };
    await fetch('/productInfo/findAllRecordDate', requestOptions)
      .then(async response => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await response.json();
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
        }
        for (var i = 0; i < data.length; i++) {
          rows.push(createData(data[i].date, data[i].productName, data[i].producer, data[i].grade, data[i].category, data[i].tradingMode, data[i].market, data[i].price, data[i].unitType, ''));
        }
        console.log('rows', rows)
        console.log(page)
        setRows(rows);
        setMycount(rows.length)

      })
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState([]);
  const [mycount, setMycount] = useState(0);

  useEffect(async () => {
    await fetchInventory();
  }, []);

  const onChange = (props) => {

    if (props.event && props.event.target.classList.contains("e-apply")) {
      const startDate = props.startDate.getDate() + '-' + props.startDate.getMonth() + '-' + props.startDate.getFullYear();
      const endDate =props.endDate.getDate() + '-' + props.endDate.getMonth() + '-' + props.endDate.getFullYear();
      let productFilter= { 'recordStartDate': startDate, 'recordEndDate': endDate };
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productFilter)
      }
      
      setRows([]);
      let rows=[];

      fetch('/productInfo/findAllRecordDateBetween', requestOptions)
        .then(async response => {
          const isJson = response.headers.get('content-type')?.includes('application/json');
          const data = isJson && await response.json();

          if (!response.ok) {
            const error = (data && data.message) || response.status;
          }
          for (var i = 0; i < data.length; i++) {
            rows.push(createData(data[i].date, data[i].productName, data[i].producer, data[i].grade, data[i].category, data[i].tradingMode, data[i].market, data[i].price, data[i].unitType, ''));
          }
          setRows(rows);
          setMycount(rows.length);          
        })
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let TbleStyle = { marginTop: "2em", marginLeft: "2.5em", marginRight: "2.3em" }
  let GridStyle = { boxShadow: "none" }

  return (

    <div>
      <Navbar />
      <Upload />

      <div style={TbleStyle}>

        <Grid container spacing={2} direction="row" justifyContent="flex-end" alignItems="center">
          <Grid item xs={6} md={4} >
            <Item style={GridStyle}>
              <DateRangePickerComponent id="datepicker" placeholder="Enter Date Range"
                startDate={startValue}
                endDate={endValue}
                min={minDate}
                max={maxDate}
                minDays={0}
                maxDays={30}
                format="dd-MM-yyyy"
                change={onChange}
              ></DateRangePickerComponent>
            </Item>
          </Grid>
          <Grid item xs={6} md={2} style={GridStyle}>
            <Item style={GridStyle}><ExportTabeBtn /></Item>
          </Grid>
        </Grid>

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table" >
              <TableHead>
                <TableRow>

                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody >
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    if (row != undefined) {
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
                    }
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
}
