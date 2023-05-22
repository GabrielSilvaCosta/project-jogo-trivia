import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './pages/Login';

export default function App() {
  return (
    <Switch>

      <Route exact path="/" component={ Login } />
      {/* <Route path="/Trivia" component={ Trivia } /> */}
    </Switch>
  );
}
