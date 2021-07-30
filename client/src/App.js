import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./utils/AuthRoute";
import Theme from "./styles/theme";
import { GlobalStyles } from "./styles/globalStyles";

import Navbar from "./components/Navbar";
import About from "./pages/About";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Wrapper } from "./components/Grid/GridElements";
import profilePages from "./pages/profilePages";
import NotFound from "./pages/NotFound"

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <AuthProvider>
        <Router>
          <Navbar />
          <Wrapper>
            <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/about" component={About} />
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/sign-up" component={SignUp} />
            <Route component={profilePages} />
            <Route component={NotFound} />
            </Switch>
          </Wrapper>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
