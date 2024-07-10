import React from 'react'
import{BrowserRouter as Router,Route,Switch} from "react-router-dom"
import PrivateRoute from "./utils/PrivateRoute"
import AuthContext from './context/AuthContext';
import { AuthProvider } from "./context/AuthContext"
import Homepage from "./views/Homepage"
import Registerpage from "./views/Registerpage"
import Loginpage from "./views/Loginpage"
import Dashboard from "./views/Dashboard"
import Navbar from "./views/Navbar"
import RegisterCo from "./views/RegisterCo"
import AddDepartment from './views/AddDepartment';
import Employees from './views/Employees';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar/>

        
        <Switch>

        <PrivateRoute component= {Dashboard} path="/dashboard"  />
        <Route component={Loginpage} path="/login"/>
        <Route component={Registerpage} path="/register"/>
        <Route component={RegisterCo} path="/registerco"/>
        <Route component={AddDepartment} path="/adddepartment"/>
        <Route component={Homepage} path="/homepage" />
        <Route component={Employees} path="/employees"/>



          
        </Switch>

      </AuthProvider>

    </Router>
  )
}

export default App