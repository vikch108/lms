import { BrowserRouter, Route, Routes,  } from 'react-router-dom'

import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Signup from './pages/signup';
import TeacherDashboard from './pages/dashboard/teacherDashboard';
import StudentDashboard from './pages/dashboard/studentDashboard';
import Homepage from './pages/homapage';


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
        <Route path="/Homepage" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
