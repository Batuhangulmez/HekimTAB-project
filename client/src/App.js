
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from 'react-bootstrap';
import HomeScreen from './Screens/HomeScreen';
import AuthScreen from './Screens/AuthScreen';
import { useState } from 'react';


function App() {
  const [user, setUser] = useState(null)
  return (
    <Router>
      <Header user={user} setUser={setUser} />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} exact />
            <Route path='/auth' element={<AuthScreen setUser={setUser} />} />
          </Routes>
        </Container>
      </main>
    </Router>
  );
}

export default App;
