import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Navbar() {
  
  
  const [user, setUser] = useState<any>(null);
  
  
  const checkUser = async () => {
    const { data:{session} } = await supabase.auth.getSession();
    setUser(session?.user ?? null);
  };
  
  useEffect(() => {
    checkUser();
  }, []);
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };
  
  return (
    <div className='flex justify-around py-6 bg-amber-400'>
      <Link to="/">
        <button className="px-6 py-3 rounded-sm bg-blue-500 text-white outline-none focus:border-red-500">Home</button>
      </Link>
      
      <div className="space-x-3">
        <Link to="/login">
          <button className="px-6 py-3 rounded-sm bg-blue-500 text-white outline-none focus:border-red-500">Teach</button>
        </Link>
        {user ? (
          <button onClick={handleLogout} className="px-6 py-3 rounded-sm bg-blue-500 text-white outline-none focus:border-red-500">Logout</button>
        ) : (
          <Link to="/login">
            <button className="px-6 py-3 rounded-sm bg-blue-500 text-white outline-none focus:border-red-500">Login</button>
          </Link>
        )}
      </div>
    </div>
  )
}