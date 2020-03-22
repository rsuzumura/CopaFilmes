import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import SelecaoFilmes from './features/SelecaoFilmes';
import ResultadoFinal from './features/ResultadoFinal';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/resultado-final">
          <ResultadoFinal />
        </Route>
        <Route path="/">
          <SelecaoFilmes />
        </Route>
      </Switch>
      <div>
        <Link to="/">Home</Link>
        <Link to="/resultado-final">Resultado Final</Link>
      </div>
      <div className="App">
        <header className="App-header">
          <Button variant="contained" color="primary">
            Hello World
        </Button>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
