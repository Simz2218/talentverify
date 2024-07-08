import {useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

function Registerpage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [company, setCompany] = useState("");
  const [employment_id, setEmployment_id] = useState("");

  const { registerUser } = useContext(AuthContext);

  console.log(email);
  console.log(username);
  console.log(password);
  console.log(password2);
  console.log(company);
  console.log(employment_id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    registerUser(email, username, password, password2,company,employment_id);
  };

  return (
    <div>
      <>
      <section className="vh-100" style={{ backgroundImage: `url("https://i.imgur.com/tIoEy5A.jpg")`, backgroundSize: "cover" }}>
          <div className="container py-6 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col col-xl-10">
                <div className="card" style={{ borderRadius: "1rem",backgroundColor:"#BBC6F4" }}>
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
                              type="email"
                              id="email-input"
                              className="form-control form-control-lg"
                              placeholder="Email Address"
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          <div className="form-outline mb-4">
                            <input
                              type="text"
                              id="username-input"
                              className="form-control form-control-lg"
                              placeholder="Username"
                              onChange={(e) => setUsername(e.target.value)}
                            />
                          </div>
                          <div className="form-outline mb-4">
                            <input
                              type="password"
                              id="password-input"
                              className="form-control form-control-lg"
                              placeholder="Password"
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                          <div className="form-outline mb-4">
                            <input
                              type="password"
                              id="confirm-password-input"
                              className="form-control form-control-lg"
                              placeholder="Confirm Password"
                              onChange={(e) => setPassword2(e.target.value)}
                            />
                          </div>
                          <div className="form-outline mb-4">
                            <input
                              type="text"
                              id="company-input"
                              className="form-control form-control-lg"
                              placeholder="Company_ID"
                              onChange={(e) => setCompany(e.target.value)}
                            />
                          </div>

                          <div className="form-outline mb-4">
                            <input
                              type="text"
                              id="employment-id-input"
                              className="form-control form-control-lg"
                              placeholder="Employment_ID"
                              onChange={(e) => setEmployment_id(e.target.value)}
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
}export default Registerpage
