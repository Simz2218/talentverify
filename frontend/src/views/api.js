import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const getConfig = (authTokens) => ({
  headers: {
    Authorization: `Bearer ${authTokens.access}`,
  },
});

export const fetchEmployees = (authTokens) => axios.get(`${API_BASE_URL}/employees2/`, getConfig(authTokens));
export const fetchUsers = (authTokens) => axios.get(`${API_BASE_URL}/users/`, getConfig(authTokens));
export const fetchDepartments = (authTokens) => axios.get(`${API_BASE_URL}/departments/`, getConfig(authTokens));
export const fetchEmployeeHistory = (authTokens) => axios.get(`${API_BASE_URL}/employeehistory/`, getConfig(authTokens));
export const fetchEmployeesHistory = (authTokens) => axios.get(`${API_BASE_URL}/employeedashboard/`, getConfig(authTokens));
export const fetchEmployee = (authTokens) => axios.get(`${API_BASE_URL}/employee/`, getConfig(authTokens));

export const updateEmployee = (authTokens, employment_id, data) => axios.put(`${API_BASE_URL}/employees/${employment_id}/`, data, getConfig(authTokens));
export const deleteEmployee = (authTokens, employment_id) => axios.delete(`${API_BASE_URL}/employees/${employment_id}/`, getConfig(authTokens));

export const updateDepartment = (authTokens, department_id, data) => axios.put(`${API_BASE_URL}/departments/${department_id}/`, data, getConfig(authTokens));
export const deleteDepartment = (authTokens, department_id) => axios.delete(`${API_BASE_URL}/departments/${department_id}/`, getConfig(authTokens));

export const uploadEmployeeData = (authTokens, file) => {
  const formData = new FormData();
  formData.append('file', file);

  
  return axios.post(`${API_BASE_URL}/uploademployees/`, formData, getConfig(authTokens));
};
