import { BrowserRouter, Route, Routes,  } from 'react-router-dom'

import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Signup from './pages/signup';
import TeacherDashboard from './pages/dashboard/teacherDashboard';
import StudentDashboard from './pages/dashboard/studentDashboard';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import './App.css'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/TeacherDashboard" element={<TeacherDashboard />} />
        <Route path="/StudentDashboard" element={<StudentDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
