import { useState } from 'react'
import { supabase } from '../lib/supabase'


export default function signup() {
  
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  
  const handlesubmit = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        alert(error.message)
      } else {
        alert('Sign up successful!')
      }
      
    } catch (error) {
      console.log(error)
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