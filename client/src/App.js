import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useState } from "react";

import HomeScreen from "./Screens/HomeScreen";
import AuthScreen from "./Screens/AuthScreen";
import PostScreen from "./Screens/PostScreen";

function App() {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <Header user={user} setUser={setUser} />
      <section className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/auth" element={<AuthScreen setUser={setUser} />} />
            <Route path="/post" element={<PostScreen />} />
          </Routes>
        </Container>
      </section>
    </Router>
  );
}

export default App;
