import { useContext } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import PrivateRoute from "routes/PrivateRoute";


//CONTEXT
import styled, { ThemeProvider } from "styled-components";
import { UserContext } from "state/contexts/UserContext";
import { theme } from 'theme'


//LIBRARIES
import { Backdrop, CircularProgress } from "@mui/material";

//COMPONENTS & PAGES
import Nav from "components/nav/Nav";
import SideBar from "components/sidebar/SideBar";
import User from "pages/User";
import Home from "pages/Home";
import Calculators from "pages/Calculators";
import AuthForm from "components/AuthForm";
import Portfolio from "pages/Portfolio";
import CurrentMarket from "pages/CurrentMarket";


function App() {

  const { marketData } = useContext(UserContext)


  // IF MARKET DATA NOT YET LOADED RETURN LOADING SPINNER
  if (!marketData.loaded) {
    return (
    <Backdrop sx={{ backgroundColor: 'black'}} open>
      <CircularProgress />
    </Backdrop>);
  }


  return (
    <ThemeProvider theme={theme}>
          <Router>
              <Container>

                <SideBar />
                
                <Header>
                  <Nav />
                </Header>
                
                <Main>
                  <InnerWrapper>
                    <Route exact path="/" component={Home} />
                    <Route path="/calculators" component={Calculators} />
                    <Route path="/current-market" component={CurrentMarket} />
                    <PrivateRoute path="/user" component={User} />
                    <Route path="/login" render={() => <AuthForm type="login" />} />
                    <Route
                      path="/signup"
                      render={() => <AuthForm type="signup" />}
                    />
                    <PrivateRoute path='/portfolio' component={Portfolio} />
                  </InnerWrapper>
                </Main>
              
              </Container>
          </Router>
    </ThemeProvider>
  );
}

export default App;

const Container = styled.div`
  display: grid;
  grid-template-columns: 242.88px 1fr;
  grid-template-rows: 60px 1fr;
  grid-template-areas:
    "sidecar header"
    "sidecar content";
  height: 100vh;
  background-color: #161c24;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Header = styled.div`
  grid-area: header;
  border-bottom: 1px solid rgba(145, 158, 171, 0.24);
`;

const Main = styled.div`
  display: grid;
  grid-area: content;
  overflow-y: scroll;
  background-color: #161c24;
  color: #fff;
  justify-content: center;
`;

const InnerWrapper = styled.div`
  display: grid;
  align-content: start;

  @media (min-width: 1024px){
    width: 1536px;
  }
`