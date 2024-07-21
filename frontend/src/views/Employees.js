import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';

function Employees() {
  const [company, setCompany] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [employee_id, setEmployee_id] = useState("");
  const [department_id, setDepartment_id] = useState("");
  const [role, setRole] = useState("");
  const [date_started_role, setDate_started_role] = useState("");
  const [date_left_role, setDate_left_role] = useState("");
  const [duties, setDuties] = useState("");
  const [employment_status, setEmployment_status] = useState(false);
  const [errors, setErrors] = useState({});

  const { employees } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await employees(
      company, first_name, last_name, employee_id, department_id,
      role, date_started_role, date_left_role, duties, employment_status
    );

    if (response.status === 201) {
      
    } else if (response.status === 400) {
      const errorData = await response.json();
      setErrors(errorData);
    }
  };

  return (
    <section className="vh-100" style={{ backgroundImage: `url("https://i.imgur.com/tIoEy5A.jpg")`, backgroundSize: "cover" }}>
      <div className="container py-6 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1.5rem" }}>
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
                      <p className="mb-5 pb-lg-2" style={{ color: "red" }}>
                        After Creation save copy of Company id and Employment ID for creation of User{" "}
                      </p>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Company ID"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                        />
                        {errors.company && <div className="text-danger">{errors.company}</div>}
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="First Name"
                          value={first_name}
                          onChange={(e) => setFirst_name(e.target.value)}
                        />
                        {errors.first_name && <div className="text-danger">{errors.first_name}</div>}
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Last Name"
                          value={last_name}
                          onChange={(e) => setLast_name(e.target.value)}
                        />
                        {errors.last_name && <div className="text-danger">{errors.last_name}</div>}
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Employee ID"
                          value={employee_id}
                          onChange={(e) => setEmployee_id(e.target.value)}
                        />
                        {errors.employee_id && <div className="text-danger">{errors.employee_id}</div>}
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Department ID"
                          value={department_id}
                          onChange={(e) => setDepartment_id(e.target.value)}
                        />
                        {errors.department_id && <div className="text-danger">{errors.department_id}</div>}
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Role"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                        />
                        {errors.role && <div className="text-danger">{errors.role}</div>}
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="date"
                          className="form-control form-control-lg"
                          placeholder="Date Started Role"
                          value={date_started_role}
                          onChange={(e) => setDate_started_role(e.target.value)}
                        />
                        {errors.date_started_role && <div className="text-danger">{errors.date_started_role}</div>}
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="date"
                          className="form-control form-control-lg"
                          placeholder="Date Left Role"
                          value={date_left_role}
                          onChange={(e) => setDate_left_role(e.target.value)}
                        />
                        {errors.date_left_role && <div className="text-danger">{errors.date_left_role}</div>}
                      </div>
                      <div className="form-outline mb-4">
                        <textarea
                          className="form-control form-control-lg"
                          placeholder="Duties"
                          value={duties}
                          onChange={(e) => setDuties(e.target.value)}
                        />
                        {errors.duties && <div className="text-danger">{errors.duties}</div>}
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-check-label" htmlFor="employmentStatus">Employment Status:</label>
                        <input
                          type="checkbox"
                          id="employmentStatus"
                          className="form-check-input"
                          checked={employment_status}
                          onChange={(e) => setEmployment_status(e.target.checked)}
                        />
                        {errors.employment_status && <div className="text-danger">{errors.employment_status}</div>}
                      </div>
                      <div className="pt-1 mb-4">
                        <button className="btn btn-dark btn-lg btn-block" type="submit">
                          Add Employee
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

export default Employees;
