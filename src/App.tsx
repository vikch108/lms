import { BrowserRouter, Route, Routes,  } from 'react-router-dom'

import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Signup from './pages/signup';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import './App.css'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
