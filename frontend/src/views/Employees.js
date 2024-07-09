import React, { useState ,useContext} from 'react';
import { useHistory,Link } from 'react-router-dom';
import Modal from 'react-modal';
import AuthContext from '../context/AuthContext';

function Employees() {
    const [company, setCompany] = useState("");
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
   
    const [employee_id, setEmployee_id] = useState("");
    const [department_id,setDepartment_id] = useState("");
    const [role, setRole] = useState("");
    const[date_started_role,setDate_started_role] = useState("");
    const [date_left_role, setDate_left_role] = useState("");
    const[duties, setDuties] = useState("");
    const [employment_status, setEmployment_status] = useState("");

  
  
    const {employees } = useContext(AuthContext);
    
  
    console.log(company);
    console.log(first_name);
    console.log(last_name);
    console.log(employee_id);
    console.log(department_id);
    console.log(role);
    console.log(date_started_role);
    console.log(date_left_role);
    console.log(duties);
    console.log(employment_status);
    

  
   

    const handleSubmit = async (e) => {
        e.preventDefault();
        employees(company,first_name, last_name,employee_id,department_id,role,date_started_role,date_left_role,duties,employment_status);
    };

    return (
        <div>
          <>
          <section className="vh-100" style={{ backgroundImage: `url("https://i.imgur.com/tIoEy5A.jpg")`, backgroundSize: "cover" }}>
              <div className="container py-6 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col col-xl-10">
                    <div className="card" style={{ borderRadius: "1rem" }}>
                      <div className="row g-0">
                        <div className="col-md-6 col-lg-5 d-none d-md-block">
                          <img
                            src="https://i.imgur.com/zS15p1m.jpg"
                            alt="login form"
                            className="img-fluid"
                            style={{
                              borderRadius: "1rem 0 0 1rem",
                              width: "100%",
                              height: "100%",
                              objectFit: "cover"
                            }}
                          />
                        </div>
                        <div className="col-md-6 col-lg-7 d-flex align-items-center">
                          <div className="card-body p-4 p-lg-5 text-black">
                            <form onSubmit={handleSubmit}>
                              <div className="d-flex align-items-center mb-3 pb-1">
                                <i
                                  className="fas fa-cubes fa-2x me-3"
                                  style={{ color: "#ff6219" }}
                                />
                                <span className="h2 fw-bold mb-0">
                                  Add Employees to Your Company
                                </span>
                              </div>
                              <h5
                                className="fw-normal mb-3 pb-3"
                                style={{ letterSpacing: 1 }}
                              >
                                Sign Up
                              </h5>
                              <div className="form-outline mb-4">
                                <input
                                  type="text"
                                  id="company-input"
                                  className="form-control form-control-lg"
                                  placeholder="Company ID"
                                  onChange={(e) => setCompany(e.target.value)}
                                />
                              </div>
                              <div className="form-outline mb-4">
                                <input
                                  type="text"
                                  id="department-id-input"
                                  className="form-control form-control-lg"
                                  placeholder="Department ID"
                                  onChange={(e) => setDepartment_id(e.target.value)}
                                />
                              </div>
                              <div className="form-outline mb-4">
                                <input
                                  type="text"
                                  id="first-name-input"
                                  className="form-control form-control-lg"
                                  placeholder="First Name"
                                  onChange={(e) => setFirst_name(e.target.value)}
                                />
                              </div>
                              <div className="form-outline mb-4">
                                <input
                                  type="text"
                                  id="last-name-input"
                                  className="form-control form-control-lg"
                                  placeholder="Last Name"
                                  onChange={(e) => setLast_name(e.target.value)}
                                />
                              </div>
                              <div className="form-outline mb-4">
                                <input
                                  type="text"
                                  id="employee-id-input"
                                  className="form-control form-control-lg"
                                  placeholder="National ID"
                                  onChange={(e) => setEmployee_id(e.target.value)}
                                />
                              </div>
                              <div className="form-outline mb-4">
                                <input
                                  type="text"
                                  id="role-input"
                                  className="form-control form-control-lg"
                                  placeholder="Role"
                                  onChange={(e) => setRole(e.target.value)}
                                />
                              </div>
    
                              <div className="form-outline mb-4">
                                <input
                                  type="date"
                                  id="date-started-role-input"
                                  className="form-control form-control-lg"
                                  placeholder="Date 'yyyy-mm-dd'"
                                  onChange={(e) => setDate_started_role(e.target.value)}
                                />
                              </div>
                              <div className="form-outline mb-4">
                                <input
                                  type="date"
                                  id="date-left-role-input"
                                  className="form-control form-control-lg"
                                  placeholder="Date Left Role"
                                  onChange={(e) => setDate_left_role(e.target.value)}
                                />
                              </div>
                              <div className="form-outline mb-4">
                                <input
                                  type="checkbox"
                                  id="employment-status-input"
                                  className="form-check-input"
                                  checked={employment_status}
                                 
                                  onChange={(e) => setEmployment_status(e.target.checked)}
                                />
                                <label htmlFor="employment-status-input" className="form-check-label">
                                    Employed
                                </label>
                              </div>
                              <div className="form-outline mb-4">
                                <input
                                  type="text"
                                  id="duties-input"
                                  className="form-control form-control-lg"
                                  placeholder="Duties"
                                  onChange={(e) => setDuties(e.target.value)}
                                />
                              </div>
                              
                              
                              <div className="pt-1 mb-4">
                                <button
                                  className="btn btn-dark btn-lg btn-block"
                                  type="submit"
                                >
                                  Register
                                </button>
                              </div>
                              
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <footer className="bg-light text-center text-lg-start">
              {/* Copyright */}
              <div
                className="text-center p..."
              >
                {/* Content */}
              </div>
              {/* Copyright */}
            </footer>
          </>
        </div>
    );

}export default Employees
    