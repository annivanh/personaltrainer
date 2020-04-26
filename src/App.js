import React from 'react';
import './App.css';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import Navigate from './components/Navigate';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import"bootstrap/dist/css/bootstrap.min.css";


function App() {

  return (
    <div className="App">  
      <BrowserRouter>
        <div>
          <Navigate />
          <Switch>
            <Route path="/customers" component={Customerlist}/>
            <Route path="/training" component={Traininglist}/>
            <Route render={() => <h1>Page not found</h1>}/>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
