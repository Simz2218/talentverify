import React, { useState, useEffect, useContext } from 'react';
import MaterialTable, { MTableToolbar } from '@material-table/core';
import { FaUserPlus, FaBuilding, FaEdit, FaTrash, FaUpload } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import { fetchEmployees, fetchUsers, fetchDepartments,fetchEmployeeHistory, updateEmployee, deleteEmployee, updateDepartment, deleteDepartment, uploadEmployeeData, } from './api';
import {jwtDecode} from 'jwt-decode'; // Correct import statement for jwtDecode
import Swal from 'sweetalert2';

const Homepage = () => {
  const [employees, setEmployees] = useState([]);
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [employeeHistory, setEmployeeHistory] = useState([]);
  const { authTokens } = useContext(AuthContext);
  const token = localStorage.getItem("authTokens");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [employeesResponse, usersResponse, departmentsResponse,employeeHistoryResponseResponse] = await Promise.all([
          fetchEmployees(authTokens),
          fetchUsers(authTokens),
          fetchDepartments(authTokens),
          fetchEmployeeHistory(authTokens)
        ]);

        setEmployees(employeesResponse.data);
        setUsers(usersResponse.data);
        setDepartments(departmentsResponse.data);
        setEmployeeHistory(employeeHistoryResponseResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [authTokens]);

  useEffect(() => {
    if (token) {
      const decode = jwtDecode(token);
      setUsername(decode.username);
    }
  }, [token]);

  const handleEmployeeUpdate = async (newData, oldData) => {
    try {
      await updateEmployee(authTokens, oldData.employment_id, newData);
      setEmployees(prev => prev.map(emp => (emp.employment_id === oldData.employment_id ? newData : emp)));
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleEmployeeDelete = async (oldData) => {
    try {
      await deleteEmployee(authTokens, oldData.employment_id);
      setEmployees(prev => prev.filter(emp => emp.employment_id !== oldData.employment_id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleDepartmentUpdate = async (newData, oldData) => {
    try {
      await updateDepartment(authTokens, oldData.department_id, newData);
      setDepartments(prev => prev.map(dept => (dept.department_id === oldData.department_id ? newData : dept)));
    } catch (error) {
      console.error('Error updating department:', error);
    }
  };

  const handleDepartmentDelete = async (oldData) => {
    try {
      await deleteDepartment(authTokens, oldData.department_id);
      setDepartments(prev => prev.filter(dept => dept.department_id !== oldData.department_id));
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };

  const handleUpload = async (e) => {
    try {
      const file = e.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        await uploadEmployeeData(authTokens, formData);
        
        
     

        // Refresh data after upload
        const [employeesResponse, usersResponse, departmentsResponse] = await Promise.all([
          fetchEmployees(authTokens),
          fetchUsers(authTokens),
          fetchDepartments(authTokens),
        ]);

        setEmployees(employeesResponse.data);
        setUsers(usersResponse.data);
        setDepartments(departmentsResponse.data);
      }
    } catch (error) {
      console.error('Error uploading employees:', error);
    }
  };

  const employeeColumns = [
    { title: 'Company', field: 'company', filtering: true },
    { title: 'First Name', field: 'first_name', filtering: true },
    { title: 'Last Name', field: 'last_name', filtering: true },
    { title: 'Employee ID', field: 'employee_id', filtering: true },
    { title: 'Department', field: 'department_id', filtering: true },
    { title: 'Role', field: 'role', filtering: true },
    { title: 'Start Date', field: 'date_started_role', filtering: true },
    { title: 'End Date', field: 'date_left_role', filtering: true },
    { title: 'Duties', field: 'duties', filtering: true },
    { title: 'Employed', field: 'employment_status', filtering: true },
    { title: 'Employment ID', field: 'employment_id', filtering: true },
    {
      title: 'Actions',
      field: 'actions',
      sorting: false,
      filtering: false,
      render: (rowData) => (
        <div className="flex items-center">
          <button className="text-blue-500 hover:text-blue-700 mr-2">
            <FaEdit />
          </button>
          <button className="text-red-500 hover:text-red-700" onClick={() => handleEmployeeDelete(rowData)}>
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  const userColumns = [
    { title: 'Username', field: 'username', filtering: true },
    { title: 'Email', field: 'email', filtering: true },
    { title: 'User ID', field: 'employment_id', filtering: true },
    { title: 'Company User', field: 'company_user_status', filtering: true },
  ];

  const departmentColumns = [
    { title: 'Company', field: 'company', filtering: true },
    { title: 'Department Name', field: 'department_name', filtering: true },
    { title: 'Department ID', field: 'department_id', filtering: true },
    {
      title: 'Actions',
      field: 'actions',
      sorting: false,
      filtering: false,
      render: (rowData) => (
        <div className="flex items-center">
          <button className="text-blue-500 hover:text-blue-700 mr-2">
            <FaEdit />
          </button>
          <button className="text-red-500 hover:text-red-700" onClick={() => handleDepartmentDelete(rowData)}>
            <FaTrash />
          </button>
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
    { title: 'Employment ID', field: 'employment_id' },
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

        <div className="flex items-center mb-4">
  <FaUserPlus className="mr-2" />
  <label className="cursor-pointer hover:text-white-300">
    <span className="font-bold text-white">Upload Employees</span> <FaUpload className="ml-1" />
    <input type="file" className="hidden" onChange={handleUpload} />
  </label>
</div>

        
      </div>

      <div className="flex h-screen">
        <div className="sidebar bg-gray-800 text-white p-4 flex-shrink-0">
          <h2 className="text-2xl font-bold mb-4">Actions</h2>
          <div className="flex items-center mb-4">
            <FaUserPlus className="mr-2" />
            <a href="/employees" className="hover:text-gray-300">
              Add Employee
            </a>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <FaBuilding className="mr-2" />
          <a href="/adddepartment" className="hover:text-gray-300">
            Add Department
          </a>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
        <h1 style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '50px' }}>Employees</h1>
          <MaterialTable
            title="Employees"
            data={employees}
            columns={employeeColumns}
            options={{
              pageSize: 10,
              pageSizeOptions: [5, 10, 20, 50, 100],
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
              filtering: true,
            }}
            components={{
              Toolbar: props => (
                <div className="flex justify-between items-center">
                  <MTableToolbar {...props} />
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      props.data.forEach(row => {
                        if (row.tableData.editing) {
                          handleEmployeeUpdate(row, row.tableData.original);
                        }
                      });
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              ),
            }}
            editable={{
              onRowUpdate: handleEmployeeUpdate,
              onRowDelete: handleEmployeeDelete,
            }}
          />
          <h1 style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '50px' }}>Users</h1>
          <MaterialTable
            title="Users"
            data={users}
            columns={userColumns}
            options={{
              pageSize: 10,
              pageSizeOptions: [5, 10, 20, 50, 100],
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
              filtering: true,
            }}
          />
          <h1 style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '50px' }}>Departments</h1>
          <MaterialTable
            title="Departments"
            data={departments}
            columns={departmentColumns}
            options={{
              pageSize: 10,
              pageSizeOptions: [5, 10, 20, 50, 100],
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
              filtering: true,
            }}
            editable={{
              onRowUpdate: handleDepartmentUpdate,
              onRowDelete: handleDepartmentDelete,
            }}
            
          />
          <h1 style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '50px' }}>History</h1>
          <MaterialTable
          title="History"
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
              filtering: true,
            }}
            />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
