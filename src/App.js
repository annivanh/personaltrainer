import React from 'react';
import './App.css';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import Navigate from './components/Navigate';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import"bootstrap/dist/css/bootstrap.min.css";
import Calendar from './components/Calendar';


function App() {

  return (
    <div className="App">  
      <BrowserRouter>
        <div>
          <Navigate />
          <Switch>
            <Route exact path="/customers" component={Customerlist}/>
            <Route exact path="/training" component={Traininglist}/>
            <Route exact path="/calendar" component={Calendar}/>
            <Route render={() => <h1>Page not found</h1>}/>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
