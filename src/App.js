import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from 'pages/Home';
import Calculators from 'pages/Calculators';
import Nav from 'components/Nav';
import Ticker from 'components/Ticker';

import styled from 'styled-components'

import './App.css';
import SideBar from 'components/SideBar';

function App() {
  return (
    <Router>
      <Container>
        <SideBar />
        <Header>
          <Nav />
        </Header>
        <Main>
            <Ticker />
            <Route exact path='/' component={Home} />
            <Route path='/calculators' component={Calculators} />
        </Main>
      </Container>
    </Router>
  );
}

export default App;


const Container = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  grid-template-rows: 60px 1fr;
  grid-template-areas: 
    "sidecar header"
    "sidecar content";
  height: 100vh;
`

const Header = styled.div`
  grid-area: header;
`

const Main = styled.div`
  grid-area: content;
  overflow-y: scroll;
`