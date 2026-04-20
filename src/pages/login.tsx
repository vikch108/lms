import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      alert(error.message)
      setLoading(false)
      return
    }

    const user = data.user

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (!profile) {
      alert('Profile not found')
      setLoading(false)
      return
    }

    if (profile.role === 'student') {
      navigate('/StudentDashboard')
    } else if (profile.role === 'teacher') {
      navigate('/TeacherDashboard')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-slate-800 flex items-center justify-center px-4">
      
      <div className="bg-slate-700 w-full max-w-md p-8 rounded-2xl shadow-lg">
        
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            LearnHub
          </h1>
          <p className="text-gray-500 mt-2">
            Login to continue learning
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5">

          <div>
            <label className="text-sm font-medium text-slate-950">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-950">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-slate-950 text-white p-3 rounded-lg font-semibold hover:bg-slate-500 transition"
          > 
            {loading ? "Logging in..." : "Login"}
          </button>

        </div>

        {/* Bottom Section */}
        <div className="mt-6 text-center text-sm text-white">
          Don't have an account?{" "}
          <span
            className="text-slate-950 cursor-pointer font-medium"
            onClick={() => navigate('/signup')}
          >
            Sign up
          </span>
        </div>

      </div>

    </div>
  )
}