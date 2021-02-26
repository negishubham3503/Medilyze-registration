import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from './components/privateRoute';
import './App.css';
import PrivateRoute from './components/privateRoute';
import { AuthProvider } from "./contexts/AuthContext";
import PatientRegistration from './components/patientRegistration/PatientRegistration';
import Login from './components/Login/login';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Switch>
<<<<<<< HEAD
            <PrivateRoute path="/patientSearch" component={PatientRegistration} />
=======
            <PrivateRoute exact path="/register" component={PatientRegistration} />
>>>>>>> ac98e2738ae84ccbbe9fd72d8b4516d6c45ed619
            <Route exact path="/" component={Login} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
