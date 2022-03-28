import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import HomeScreen from "./Screens/HomeScreen";
import AuthScreen from "./Screens/AuthScreen";
import PostScreen from "./Screens/PostScreen";
import ProfileScreen from "./Screens/ProfileScreen";

function App() {
  return (
    <Router>
      <Header />
      <section className="appContainer">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/auth" element={<AuthScreen />} />
            <Route path="/post" element={<PostScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
          </Routes>
        </Container>
      </section>
    </Router>
  );
}

export default App;
