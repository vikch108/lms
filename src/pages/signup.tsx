import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'


export default function signup() {
  const navigate = useNavigate()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState("")
  const [name, setName] = useState("")
  
  
  const handlesubmit = async () => {
   
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        alert(error.message)
      } else {
        alert('Sign up successful!')
      }
      
    
    
    const user = data.user
    
    const { error: profilError } = await supabase.from('profiles').insert([{
      id: user.id,
      name: name,
      role:role
      
    }])
    
    if(profilError) {
      alert(profilError.message)
    } else {
      alert('Profile created successfully!')
      
    }
    
    
    
    if(role === 'student') {
      navigate('/StudentDashboard')
    }
    
    if(role === 'teacher') {
      navigate('/TeacherDashboard')
    }
  }
  
  
  
  
  
  return (
    <div className="bg-gray-400 h-screen flex items-center justify-center">
      <div className="p-8  bg-gray-200 w-120  mx-auto rounded-lg shadow-md ">  
        <h1 className="uppercase font-bold text-2xl border-b mb-3 text-center" >sign up</h1>
        <input type="email"
          id="email"
          placeholder="Enter Email"
          
          onChange={ (e)=> setEmail(e.target.value)}
          className=" mb-3 border-2 rounded-sm p-2 w-full  text-xl focus:outline-none" />
        
        <input type="text"
          id="name"
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
          className=" mb-3 border-2 rounded-sm p-2 w-full  text-xl focus:outline-none" />
        
        <select id="role"
          onChange={(e) => setRole(e.target.value)}
          className=" mb-3 border-2 rounded-sm p-2 w-full  text-xl focus:outline-none">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        
        <input type="password"
          id="password"
          placeholder="Enter Password"
          
          onChange={(e) => setPassword(e.target.value)}
          className=" mb-3 border-2 rounded-sm p-2 w-full  text-xl focus:outline-none"/>
        <button type="submit"
          onClick={handlesubmit }
          className="bg-red-500 p-2 w-full ">Sign Up</button>
      </div>
    </div>
  )
}