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
        Swal.fire('Error', `Wrong details ,Please Check Your Details And Try again!`, 'error, check your details and try again');
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
        Swal.fire('Error', `Wrong details ,Please Check Your Details And Try again!`, 'error');
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
        const response_data = await response.json();
        Swal.fire('Company Added Successfully!',`Company:${response_data.company_name} Company ID:${response_data.company_id}`, '', 'success');
      
        history.push("/adddepartment");
      } else {
        console.log(response.status);
        Swal.fire('Error', `Wrong details ,Please Check Your Details And Try again!`, 'error');
      }
    } catch (error) {
      console.error("Error in registerCompany:", error);
      Swal.fire('Error', 'An unexpected error occurred.', 'error');
    }
    return response;
  };

  const addDepartments = async (company, department_name) => {
    let response;
    try {
      response = await fetch("http://127.0.0.1:8000/api/department/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ company, department_name }),
      });
      
      if (response.status === 201) {
        
        
        const response_data = await response.json();
        Swal.fire('Department Added Successfully!',`Company ID:${response_data.company} Department ID:${response_data.department_id}`, '', 'success');
      
        history.push(authTokens ? "/homepage" : "/employees");
      } else {
        console.log(response.status);
        Swal.fire('Error', `Wrong details ,Please Check Your Details And Try again!`, 'error');
      }
    } catch (error) {
      console.error("Error in addDepartments:", error);
      Swal.fire('Error', 'An unexpected error occurred.', 'error');
    }
    return response;
  };

  const employees = async (company, first_name, last_name, employee_id, department_id, role, date_started_role, date_left_role, duties, employment_status) => {
    let response;
    try {
      response = await fetch("http://127.0.0.1:8000/api/addEmployee/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company, first_name, last_name, employee_id, department_id, role, date_started_role, date_left_role, duties, employment_status
        }),
      });
      if (response.status === 201) {
        const response_data = await response.json();
        Swal.fire('Employee Added Successfully!',`Company ID:${response_data.company} Employment ID:${response_data.employment_id}`, '', 'success');
        
        history.push(authTokens ? "/homepage" : "/login");
      } else {
        Swal.fire('Error', `Wrong details ,Please Check Your Details And Try again!`, 'error');
      }
    } catch (error) {
      console.error("Error in employees:", error);
      Swal.fire('Error', 'An unexpected error occurred.', 'error');
    }
    return response;
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
