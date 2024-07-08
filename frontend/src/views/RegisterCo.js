import React, { useState ,useContext} from 'react';
import { useHistory,Link } from 'react-router-dom';
import Modal from 'react-modal';
import AuthContext from '../context/AuthContext';

function RegisterCo() {
    
    const [company_name, setCompany_name] = useState("");
    const [registration_number, setRegistration_number] = useState("");
    const [registration_date, setRegistration_date] = useState("");

    const [address, setAddress] = useState("");
    const [contact_person, setContact_person] = useState("");
    const[email_address,setEmail_address] = useState("");
    const [contact_phone, setContact_phone] = useState("");

  
  
    const { registerCompany } = useContext(AuthContext);
  
    console.log(company_name);
    console.log(registration_number);
    console.log(registration_date);
    console.log(address);
    console.log(contact_person);
    console.log(email_address);
    console.log(contact_phone);
    

  
   

    const handleSubmit = async (e) => {
        e.preventDefault();
        registerCompany(company_name,registration_number,registration_date,address,contact_person,email_address,contact_phone);
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
                            src="https://i.imgur.com/xmVKsvx.jpg"
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
                                  Welcome to <b> TalentVerify👋</b>
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
                                  id="company-name-input"
                                  className="form-control form-control-lg"
                                  placeholder="Company Name"
                                  onChange={(e) => setCompany_name(e.target.value)}
                                />
                              </div>
                              <div className="form-outline mb-4">
                                <input
                                  type="text"
                                  id="registration-date-input"
                                  className="form-control form-control-lg"
                                  placeholder="Registration Date:yyyy-mm-dd"
                                  onChange={(e) => setRegistration_date(e.target.value)}
                                />
                              </div>
                              <div className="form-outline mb-4">
                                <input
                                  type="text"
                                  id="address-input"
                                  className="form-control form-control-lg"
                                  placeholder="Address"
                                  onChange={(e) => setAddress(e.target.value)}
                                />
                              </div>
                              <div className="form-outline mb-4">
                                <input
                                  type="text"
                                  id="registration-number-input"
                                  className="form-control form-control-lg"
                                  placeholder="Registration Number"
                                  onChange={(e) => setRegistration_number(e.target.value)}
                                />
                              </div>
                              <div className="form-outline mb-4">
                                <input
                                  type="email"
                                  id="email-address-input"
                                  className="form-control form-control-lg"
                                  placeholder="Email"
                                  onChange={(e) => setEmail_address(e.target.value)}
                                />
                              </div>
    
                              <div className="form-outline mb-4">
                                <input
                                  type="text"
                                  id="contact-person-input"
                                  className="form-control form-control-lg"
                                  placeholder="Contact Person"
                                  onChange={(e) => setContact_person(e.target.value)}
                                />
                              </div>
                              <div className="form-outline mb-4">
                                <input
                                  type="text"
                                  id="contact-phone-input"
                                  className="form-control form-control-lg"
                                  placeholder="Phone"
                                  onChange={(e) => setContact_phone(e.target.value)}
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
                              <a className="small text-muted" href="#!">
                                Forgot password?
                              </a>
                              <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                                Already have an account?{" "}
                                <Link to="/login" style={{ color: "#393f81" }}>
                                  Login Now
                                </Link>
                              </p>
                              <a href="#!" className="small text-muted">
                                Terms of use.
                              </a>
                              <a href="#!" className="small text-muted">
                                Privacy policy
                              </a>
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

}export default RegisterCo
    