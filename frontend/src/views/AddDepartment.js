import React, { useState, useContext } from 'react';

import AuthContext from '../context/AuthContext';
import Swal from 'sweetalert2';

function AddDepartment() {
  const [company, setCompany] = useState("");
  const [department_name, setDepartment_name] = useState("");
  const [errors, setErrors] = useState({});

  const { addDepartments } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await addDepartments (company, department_name);


    if (response.status === 201) {
      
    } else if (response.status === 400) {
      const errorData = await response.json();
      setErrors(errorData);
    }
  };

  return (
    
      
      <section className="vh-100" style={{ backgroundImage: `url("https://i.imgur.com/8S4tZTT.jpg")`, backgroundSize: "cover" }}>
          <div className="container py-6 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col col-xl-10">
                <div
                  className="card"
                  style={{ borderRadius: "0.5rem", backgroundColor: "#BBC6F4" }}
                >
                  <div className="row g-0">
                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                      <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={handleSubmit}>
                          <div className="d-flex align-items-center mb-3 pb-1">
                            <i
                              className="fas fa-cubes fa-2x me-3"
                              style={{ color: "#ff6219" }}
                            />
                            <span className="h2 fw-bold mb-0">Departments</span>
                          </div>
                          <h5
                            className="fw-normal mb-3 pb-3"
                            style={{ letterSpacing: 1 }}
                          >
                            Add Department
                          </h5>
                          <p className="mb-5 pb-lg-2" style={{ color: "red" }}>
                                After Creation save copy of Company id AND Department ID for creation of Employee{" "}
                                
                              </p>
                          <div className="form-outline mb-4">
                            <input
                              type="text"
                              id="department-name-input"
                              className="form-control form-control-lg"
                              placeholder="Name"
                              onChange={(e) => setDepartment_name(e.target.value)}
                              
                            />
                            {errors.department_name && <div className="text-danger">{errors.department_name}</div>}
                          </div>
                          <div className="form-outline mb-4">
                            <input
                              type="text"
                              id="company-input"
                              className="form-control form-control-lg"
                              placeholder="Company_ID"
                              onChange={(e) => setCompany(e.target.value)}
                            />
                            {errors.company && <div className="text-danger">{errors.company}</div>}
                          </div>
                          <div className="pt-1 mb-4">
                            <button
                              className="btn btn-dark btn-lg btn-block"
                              type="submit"
                            >
                              Add Department
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
      
    
  );
}

export default AddDepartment;