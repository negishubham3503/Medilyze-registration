import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import PrivateRoute from './components/privateRoute';
import { AuthProvider } from "./contexts/AuthContext";
import PatientRegistration from './components/patientRegistration/PatientRegistration';
import Login from './components/Login/login';
import RegistrationList from './components/registrationList/RegistrationList';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/patientSearch" component={PatientRegistration} />
            <PrivateRoute exact path="/list" component={RegistrationList} />
            <Route exact path="/" component={Login} />
            <Route path="/test" component={RegistrationList} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
