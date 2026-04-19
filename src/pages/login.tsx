import { useState } from 'react'
import { supabase } from '../lib/supabase'
import {useNavigate} from 'react-router-dom'



export default function Login() {
  const navigate = useNavigate()
  
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const handleLogin = async () => {
    const {data, error} = await supabase.auth.signInWithPassword({
      email,password
    })
    
    console.log(data)
    if(error) {
      alert(error)
    } else {
      alert('Logged in successfully')
    }
    
    const user = data.user
    
    const {data:profile} = await supabase.from('profiles').select("*").eq("id",user.id).single()
    
    console.log(profile)
    console.log(error)
    
    
    if(!profile) {
      alert('Profile not found')
    
    }
    
    if(profile.role === 'student') {
      navigate('/StudentDashboard')
    }
    
    if(profile.role === 'teacher') {
      navigate('/TeacherDashboard')
    }
  }
  
  
  
  
  
  return (
    <div className="bg-gray-400 h-screen flex items-center justify-center">
      <div className=" bg-gray-200 p-6 w-120 mx-auto bg space-y-6 shadow-lg rounded-lg">
        <h1 className="font-bold text-2xl uppercase text-center border-b">Login</h1>
        
        <input type="text"
          placeholder="Email"
          onChange ={(e) => setEmail(e.target.value)}
          className="p-2 w-full text-2xl border-2 rounded-sm "
        />
        <input type="password"
          placeholder="Password"
          onChange ={(e) => setPassword(e.target.value)}
          className="p-2 w-full text-2xl border-2 rounded-sm "
        />
        <button type="submit"
          className="p-3 w-full text-lg font-semibold border-2 rounded-sm bg-red-500 uppercase  "
          onClick={handleLogin}
        >login</button>
      </div>
    </div>
  )
}