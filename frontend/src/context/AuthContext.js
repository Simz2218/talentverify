import { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

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
        body: JSON.stringify({
          email,
          password,
        }),
      });
      data = await response.json();

      if (response.status === 200) {
        console.log("Logged in");
        setAuthTokens(data);
        setUser(JSON.parse(localStorage.getItem("authTokens")));

        localStorage.setItem("authTokens", JSON.stringify(data));
        history.push("/");
      } else {
        console.log(response.status);
        console.log("There was an error");
        alert("Something went wrong" + response.status);
      }
    } catch (error) {
      console.error("Error in loginUser:", error);
    }
  };

  const registerUser = async (
    email,
    username,
    password,
    password2,
    company,
    employment_id
  ) => {
    let response;
    try {
      response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
          password2,
          company,
          employment_id,
        }),
      });
      if (response.status === 201) {
        history.push("/login");
      } else {
        console.log(response.status);
        console.log("there was an issue with the server");
        alert("something went wrong" + response.status);
      }
    } catch (error) {
      console.error("Error in registerUser:", error);
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    localStorage.removeItem("authTokens");
    history.push("/login");
  };

  const registerCompany = async (
    company_name,
    registration_number,
    registration_date,
    address,
    contact_person,
    email_address,
    contact_phone,
    
  ) => {
    let response;
    try {
      response = await fetch("http://127.0.0.1:8000/api/registerco/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company_name,
          registration_number,
          registration_date,
          address,
          contact_person,
          email_address,
          contact_phone,
          
        }),
      });
      if (response.status === 201) {
        // Handle successful company registration

        history.push("/login");
      } else {
        console.log(response.status);
        console.log("there was an issue with the server");
        alert("something went wrong" + response.status);
      }
    } catch (error) {
      console.error("Error in registerCompany:", error);
    }
  };

  const addDepartments = async (
    company,
    department_name,

  ) => {
    let response;
    try {
      response = await fetch("http://127.0.0.1:8000/api/department/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company,
          department_name,
        }),
      });
      if (response.status === 201) {
        history.push("/login");
      } else {
        console.log(response.status);
        console.log("there was an issue with the server");
        alert("something went wrong" + response.status);
      }
    } catch (error) {
      console.error("Error in registerUser:", error);
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
