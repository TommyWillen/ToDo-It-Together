import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./utils/AuthRoute";
import NoAuthRoute from "./utils/NoAuthRoute";
import Theme from "./styles/theme";
import { GlobalStyles } from "./styles/globalStyles";

import Navbar from "./components/Navbar";
import About from "./pages/About";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import { Wrapper } from "./components/Grid/GridElements";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <AuthProvider>
        <Router>
          <Navbar />
          <Wrapper>
            <Route exact path="/" component={Landing} />
            <Route exact path="/about" component={About} />
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/sign-up" component={SignUp} />
            <NoAuthRoute exact path="/profile" component={Profile} />
          </Wrapper>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
