import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from 'pages/Home';
import Calculators from 'pages/Calculators';
import Nav from 'components/Nav';
import Ticker from 'components/Ticker';

import './App.css';

function App() {
  return (
    <Router>
      <Nav />
      <Ticker />
      <Route exact path='/' component={Home} />
      <Route path='/calculators' component={Calculators} />
    </Router>
  );
}

export default App;
