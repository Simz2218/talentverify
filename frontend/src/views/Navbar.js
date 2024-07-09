import React, { useContext } from 'react'
import { jwtDecode} from 'jwt-decode';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
function Navbar() {
    const{user,logoutUser}=useContext(AuthContext)
    const token = localStorage.getItem("authTokens")
    if (token) {
        const decoded=jwtDecode(token)
        var user_id = decoded.user_id
    }
  return (
    <div>
      
        <nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img style={{width:"40px", padding:"0px"}} src="https://i.imgur.com/8S4tZTT.jpg" alt=""/>

          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>

              {token ===null &&
              <>
              <li class="nav-item">
                <Link class="nav-link" to="/login">Login</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/employees">Employees</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/register">Register</Link>
              </li>
              
              <li class="nav-item">
                  <Link class="nav-link" to="/registerco">Register Company</Link>
                </li>
              </>
            }
              {token !==null &&
                <>
                <li class="nav-item">
                  <a class="nav-link" href="#">Dashboard</a>
                </li>
                
                <li class="nav-item">
                  <a class="nav-link" onClick={logoutUser}>Logout</a>
                </li>

                <li class="nav-item">
                <Link class="nav-link" to="/addDepartment">Add Department</Link>
              </li>

                
                </>
                }
                <>
              
                </>
                
              
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}export default Navbar