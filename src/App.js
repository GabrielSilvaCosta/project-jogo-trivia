import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './pages/Login';
import Ranking from './pages/Ranking';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Game from './pages/Game';

export default function App() {
  return (
    <Switch>

      <Route exact path="/" component={ Login } />
      <Route path="/Settings" component={ Settings } />
      <Route path="/Game" component={ Game } />
      <Route path="/Feedback" component={ Feedback } />
      <Route path="/Ranking" component={ Ranking } />
    </Switch>
  );
}
