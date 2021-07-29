import { BrowserRouter as Router, Route } from "react-router-dom";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./utils/AuthRoute";
import NoAuthRoute from "./utils/NoAuthRoute";

import "./App.css";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import { Wrapper } from "./components/Grid/GridElements";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Wrapper>
          <Route exact path="/" component={Landing} />
          <Route exact path="/about" component={About} />
          <AuthRoute exact path="/login" component={Login} />
          <NoAuthRoute exact path="/profile" component={Profile} />
          <AuthRoute exact path="/signup" component={SignUp} />
        </Wrapper>
      </Router>
    </AuthProvider>
  );
}

export default App;
