import { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const history = useHistory();

  const loginUser = async (email, password) => {
    let response;
    let data;
    try {
      response = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      data = await response.json();

      if (response.status === 200) {
        console.log("Logged in");
        setAuthTokens(data);
        setUser(data);
        localStorage.setItem("authTokens", JSON.stringify(data));
        localStorage.setItem("user",JSON.stringify(data))
        Swal.fire('Login Successful', 'success');
        history.push("/dashboard");
      
      } else {
        console.log(response.status);
        Swal.fire('Error', 'Something went wrong' + response.status, 'error, check your details and try again');
      }
    } catch (error) {
      console.error("Error in loginUser:", error);
      Swal.fire('Error', 'An unexpected error occurred.', 'error');
    }
  };

  const registerUser = async (email, username, password, password2, company, employment_id) => {
    let response;
    try {
      response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password, password2, company, employment_id }),
      });
      if (response.status === 201) {
        Swal.fire('Registration successful!', '', 'success');
        history.push("/login");
      } else {
        console.log(response.status);
        Swal.fire('Error', 'Something went wrong' + response.status, 'error');
      }
    } catch (error) {
      console.error("Error in registerUser:", error);
      Swal.fire('Error', 'An unexpected error occurred.', 'error');
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    localStorage.removeItem("authTokens");
    localStorage.removeItem("user");
    history.push("/login");
  };

  const registerCompany = async (company_name, registration_number, registration_date, address, contact_person, email_address, contact_phone) => {
    let response;
    try {
      response = await fetch("http://127.0.0.1:8000/api/registerco/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ company_name, registration_number, registration_date, address, contact_person, email_address, contact_phone }),
      });
      if (response.status === 201) {
        const data = await response.json();
        Swal.fire('Company registration successful!', '', 'success');
        history.push("/adddepartment");
        return data.company_id; // Return the company_id for use in addDepartments
      } else {
        console.log(response.status);
        Swal.fire('Error', 'Something went wrong' + response.status, 'error');
      }
    } catch (error) {
      console.error("Error in registerCompany:", error);
      Swal.fire('Error', 'An unexpected error occurred.', 'error');
    }
  };

  const addDepartments = async (company_id, department_name) => {
    let response;
    try {
      response = await fetch("http://127.0.0.1:8000/api/department/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ company_id, department_name }),
      });
      if (response.status === 201) {
        Swal.fire('Department added successfully!', '', 'success');
        history.push(authTokens ? "/homepage" : "/employees");
        return company_id; // Return company_id for use in employees
      } else {
        console.log(response.status);
        Swal.fire('Error', 'Something went wrong' + response.status, 'error');
      }
    } catch (error) {
      console.error("Error in addDepartments:", error);
      Swal.fire('Error', 'An unexpected error occurred.', 'error');
    }
  };

  const employees = async (company_id, first_name, last_name, employee_id, department_id, role, date_started_role, date_left_role, duties, employment_status) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/addEmployee/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company: company_id, // Use company_id as company ID
          first_name,
          last_name,
          employee_id: `${company_id}-${employee_id}`, // Combine company_id and employee_id
          department_id: company_id, // Use company_id as department_id
          role,
          date_started_role,
          date_left_role,
          duties,
          employment_status
        }),
      });
      if (response.status === 201) {
        const data = await response.json();
        Swal.fire('Employee added successfully!', `Employment ID: ${data.employment_id}, Company ID: ${company_id}`, 'success');
        history.push("/register"); // Redirect to register page to add new user
      } else {
        Swal.fire('Error', `Something went wrong: ${response.status}`, 'error');
      }
    } catch (error) {
      console.error("Error in employees:", error);
      Swal.fire('Error', 'An unexpected error occurred.', 'error');
    }
  };

  const ContextData = {
    user,
    setUser,
    authTokens,
    registerUser,
    loginUser,
    logoutUser,
    registerCompany,
    addDepartments,
    employees,
  };

  useEffect(() => {
    if (authTokens) {
      setUser(JSON.parse(localStorage.getItem("authTokens")));
    }
  }, [authTokens]);

  return (
    <AuthContext.Provider value={ContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
