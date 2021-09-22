import { BrowserRouter as Router, Route } from "react-router-dom";
import MarketDataProvider from "state/contexts/MarketData";
import Home from "pages/Home";
import Calculators from "pages/Calculators";
import Nav from "components/Nav";
import styled, { ThemeProvider } from "styled-components";
import { theme } from 'theme'

import "./App.css";
import SideBar from "components/sidebar/SideBar";
import UserProvider from "state/contexts/UserContext";
import { AuthProvider } from "state/contexts/Auth";
import User from "pages/User";
import PrivateRoute from "routes/PrivateRoute";
import AuthForm from "components/AuthForm";
import Portfolio from "pages/Portfolio";


function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <UserProvider>
          <Router>
            <MarketDataProvider>
              <Container>
                <SideBar />
                <Header>
                  <Nav />
                </Header>
                <Main>
                  <Route exact path="/" component={Home} />
                  <Route path="/calculators" component={Calculators} />
                  <PrivateRoute path="/user" component={User} />
                  <Route path="/login" render={() => <AuthForm type="login" />} />
                  <Route
                    path="/signup"
                    render={() => <AuthForm type="signup" />}
                  />
                  <Route path='/portfolio' component={Portfolio} />
                </Main>
              </Container>
            </MarketDataProvider>
          </Router>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
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

  // @media (max-width: 1024px) {
  //   grid-template-columns: 1fr;
  // }
`;

const Header = styled.div`
  grid-area: header;
`;

const Main = styled.div`
  grid-area: content;
  overflow-y: scroll;
  background-color: #161c24;
  color: #fff;
`;
