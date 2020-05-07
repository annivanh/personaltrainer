import React from 'react';
import"bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";



export default function Navigate() {
    return (
        <div>
            <nav class="navbar navbar-default">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <p>Personal Trainer Site</p>
                    </div>
                    <ul class="nav navbar-nav" align="right">
                    <li className="nav-item"><Link className="nav-link" to="/customers">Customers</Link></li>
                    <li className="nav-item"><Link className="nav-link"to="/training">Training</Link></li>
                    </ul>
                </div>
             </nav>
        </div>
    );
}
