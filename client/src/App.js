import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header";
import { AUTH } from "./constans/actionsConstant";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { Container } from "react-bootstrap";

import HomeScreen from "./Screens/HomeScreen";
import AuthScreen from "./Screens/AuthScreen";
import PostScreen from "./Screens/PostScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import UserScreen from "./Screens/UserScreen";

const ProtectedRoute = ({ user, redirectPath = "/auth", children }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

function App() {
  const [user, setUser] = useState();

  const handleUser = (value) => setUser(value);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) dispatch({ type: AUTH, payload: user });
  }, [user]);

  return (
    <Router>
      <section className="appContainer">
        <Header user={user} onhandleUser={handleUser} />
        <Container>
          <Routes>
            <Route index path="/auth" element={<AuthScreen />} />
            <Route element={<ProtectedRoute user={user} />}>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/post" element={<PostScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/userInfo/:id" element={<UserScreen />} />
            </Route>
          </Routes>
        </Container>
      </section>
    </Router>
  );
}

export default App;
