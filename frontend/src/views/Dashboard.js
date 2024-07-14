import React, { useState, useEffect, useContext } from 'react';
import MaterialTable from '@material-table/core';
import { FaEdit } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import { fetchEmployee, fetchEmployeesHistory, updateEmployee } from './api';
import {jwtDecode} from 'jwt-decode';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeHistory, setEmployeeHistory] = useState([]);
  const { authTokens } = useContext(AuthContext);
  const token =localStorage.getItem("authTokens");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [employeesResponse, employeeHistoryResponse] = await Promise.all([
          fetchEmployee(authTokens),
          fetchEmployeesHistory(authTokens),
        ]);

        setEmployees(employeesResponse.data);
        setEmployeeHistory(employeeHistoryResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [authTokens]);

  const handleEmployeeUpdate = async (newData, oldData) => {
    try {
      await updateEmployee(authTokens, oldData.id, newData);
      setEmployees((prev) => prev.map((emp) => (emp.id === oldData.id ? newData : emp)));
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  if (token){
    const decode =jwtDecode(token)
    var employment_id= decode.employment_id
    var username=decode.username
  }

  const employeeColumns = [
    { title: 'First Name', field: 'first_name' },
    { title: 'Last Name', field: 'last_name' },
    { title: 'Employee ID', field: 'employee_id' },
    { title: 'Department', field: 'department_id' },
    { title: 'Role', field: 'role' },
    { title: 'Duties', field: 'duties' },
    { title: 'Employment Status', field: 'employment_status' },
    {
      title: 'Edit',
      field: 'Edit',
      render: (rowData) => (
        <div>
          <FaEdit />
        </div>
      ),
    },
  ];

  const employeeHistoryColumns = [
    { title: 'Company', field: 'company_id' },
    { title: 'Department', field: 'department_id' },
    { title: 'Roles', field: 'roles' },
    { title: 'Duties', field: 'duties' },
    { title: 'Date Started', field: 'date_started_role' },
    { title: 'Date Left', field: 'date_left_role' },
  ];

  return (
    <div
      className="flex h-screen"
      style={{
        backgroundImage: `url('https://i.imgur.com/BrSZUnO.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="sidebar bg-gray-800 text-white p-4 flex-shrink-0">
        {authTokens && (
          <>
            
          </>
        )}
      </div>
      <div className="flex-1 p-1 overflow-y-auto">
        <h1 style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '50px' }}>Employee:{username}</h1>
        <MaterialTable
        title={employment_id}
          data={employees}
          columns={employeeColumns}
          options={{
            pageSize: 10,
            headerStyle: {
              backgroundColor: '#f5f5f5',
              color: '#333',
              fontWeight: 'bold',
            },
            rowStyle: {
              backgroundColor: '#fff',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            },
          }}
          editable={{
            onRowUpdate: handleEmployeeUpdate,
          }}
        />

        <h1 style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '50px' }}>History</h1>
        <MaterialTable
        title={employment_id}
          data={employeeHistory}
          columns={employeeHistoryColumns}
          options={{
            pageSize: 10,
            headerStyle: {
              backgroundColor: '#f5f5f5',
              color: '#333',
              fontWeight: 'bold',
            },
            rowStyle: {
              backgroundColor: '#fff',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
