import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import PatientRegistration from './components/patientRegistration/PatientRegistration';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={PatientRegistration} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
