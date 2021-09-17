import { BrowserRouter as Router, Route } from 'react-router-dom'
import MarketDataProvider from 'state/contexts/MarketData'
import Home from 'pages/Home';
import Calculators from 'pages/Calculators';
import Nav from 'components/Nav';
import Ticker from 'components/Ticker';

import styled from 'styled-components'

import './App.css';
import SideBar from 'components/sidebar/SideBar';
import UserProvider from 'state/contexts/UserContext';
import User from 'pages/User';


function App() {
  return (
    <UserProvider>
      <Router>
        <MarketDataProvider>
          <Container>
            <SideBar />
            <Header>
              <Nav />
            </Header>
            <Main>
                <Ticker />
                <Route exact path='/' component={Home} />
                <Route path='/calculators' component={Calculators} />
                <Route path='/user' render={() => <User />} />
            </Main>
          </Container>
        </MarketDataProvider>
      </Router>
    </UserProvider>
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