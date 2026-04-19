import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Link } from 'react-router-dom'

export default function StudentDashboard() {
  // const navigate = useNavigate()
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const fetchenrolled = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    const user = session?.user
    
    if (!user) {
      alert("You must be logged in to view your dashboard")
      return
    }
    
    setLoading(true)
    const { data, error } = await supabase
      .from("enrollments")
      .select(`
        id,
        courses (
          id,
          title,
          description
        )
      `)
      .eq("studen_id", user.id)
      
    if (error) {
      console.error(error)
      alert(error.message)
      setLoading(false)
      return
    } else {
      console.log(data)
    }
    
    setCourses(data || [])
    setLoading(false)
      
    
  }
  
  
  useEffect(() => {
    fetchenrolled()
  }, [])

  return (
    <div>
      <div>
        <div>
          <button>Logout</button>
          <Link to="/Dashboard">
            <button>Go to Dashboard</button>
          </Link>
        </div>
        <h1>Student Dashboard</h1>
        
        <div>
          <h2>Enrolled Courses</h2>
          {courses.map((item:any) => (
            <div key={item.id}>
              <h3>{item.courses?.title}</h3>
              <p>{item.courses?.description}</p>
            </div>
          ))}
          
        </div>
      </div>
    </div>
  )
}