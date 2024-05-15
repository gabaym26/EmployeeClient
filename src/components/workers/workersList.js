import { useState, useEffect } from 'react';
import * as React from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { DataGrid } from '@mui/x-data-grid';
import { getEmployees, deleteEmployee } from '../service/service.js';
import EditIcon from '@mui/icons-material/Edit';
import DialogAdding from './dialogAdding';
import { useContext } from 'react';
import { IsOpenned } from '../../App';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from "react-redux";
import { TextField } from '@mui/material';

var XLSX = require("xlsx");

export default function DataTable() {
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(false);
  const [employee, setEmployee] = useState([]);
  const isOpened = useContext(IsOpenned).isOpened;
  const setIsOpened = useContext(IsOpenned).setIsOpened;
  const [open, setOpen] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const employees = useSelector(s => s.employee.employees)
  const columns = [
    {
      field: 'delete',
      headerName: 'Delete',
      width: 120,
      renderCell: (params) => (
        <DeleteForeverIcon
          color="primary"
          style={{ cursor: 'pointer' }}
          onClick={() => handleDelete(params.id)}
        />
      ),
    },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 120,
      renderCell: (params) => (
        <EditIcon
          color="primary"
          style={{ cursor: 'pointer' }}
          onClick={() => handleOpen(params)}
        />
      ),
    },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    { field: 'identity', headerName: 'Identity', width: 90 },
    {
      field: 'startDate',
      headerName: 'Start Date',
      type: 'dateT',
      width: 120,
      valueGetter: (params) => {
        return dayjs(params?.value).format('YYYY-MM-DD');
      },
    }];

  useEffect(() => {
    const fetchEmployees = async () => {
      if (employees.length === 0) {
        dispatch(getEmployees());
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete = (employeeId) => {
    dispatch(deleteEmployee(employeeId));
    dispatch(getEmployees());
  };

  const handleOpen = async (employee) => {
    setIsOpened(false);
    setEmployee(employee);
    setIsOpened(true);
  };

  const sendExcel = () => {
    const data = employees.map(({ firstName, lastName, identity, startDate }) => ({
      'First Name': firstName,
      'Last Name': lastName,
      'Identity': identity,
      'Start Date': dayjs(startDate).format('YYYY-MM-DD'),
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'employees.xlsx';
    a.click();
  };

  const filteredEmployees = employees.filter(employee => {
    return (
      employee.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchInput.toLowerCase()) ||
      employee.identity.toLowerCase().includes(searchInput.toLowerCase()) ||
      employee.firstName.toLowerCase().startsWith(searchInput.toLowerCase()) ||
      employee.lastName.toLowerCase().startsWith(searchInput.toLowerCase()) ||
      employee.identity.toLowerCase().startsWith(searchInput.toLowerCase())
    );
  });
  
  return (
    <>
      {isOpened && <><DialogAdding employee={employee?.row}></DialogAdding></>}
      <br />
      <TextField
        type="text"
        label="Search..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <br />
      <DataGrid
        rows={filteredEmployees}
        columns={columns}
        pageSize={5}
        onPageChange={(newPage) => console.log(newPage)}
        pagination
        paginationMode="server"
        rowCount={100}
      />
      <IconButton
        aria-label="expand row"
        size="small"
        onClick={() => setOpen(!open)}
      />
      <Button variant="outlined" onClick={handleOpen}>
        Add New Employee
      </Button>
      <Button onClick={sendExcel} variant="outlined">Exported To An Excel File</Button>
    </>
  );
}