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
            <PrivateRoute exact path="/patientRegistration" component={PatientRegistration} />
            <PrivateRoute exact path="/registrationList" component={RegistrationList} />
            <Route exact path="/" component={Login} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
