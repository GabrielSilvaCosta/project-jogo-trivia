import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './pages/Login';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Switch>

      <Route exact path="/" component={ Login } />
      <Route path="/Settings" component={ Settings } />
      {/* <Route path="/Trivia" component={ Trivia } /> */}
    </Switch>
  );
}
