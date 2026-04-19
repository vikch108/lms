import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import Navbar from "../component/navbar"


export default function Dashboard() {
  
  const [loading, setLoading] = useState(true)
  const fetchCourses = async () => {
    setLoading(true)
    const { data, error } = await supabase.from("courses").select("*")
    if (error) {
      console.error(error)
      setLoading(false)
    } else {
      setCourses(data)
    }
    setLoading(false)
  }
  const [courses, setCourses] = useState([])
  
  useEffect(() => {
    fetchCourses()
  }, [])
  
  
  
  
  const handleEnroll = async (courseId: string) => {
    const { data: { session } } = await supabase.auth.getSession()
    
    const user = session?.user
    
    if (!user) {
      alert("You must be logged in to enroll in a course")
      return
    }
    const { data, error } = await supabase.from("enrollments").insert({
      course_id: courseId,
      studen_id: user.id,
      
    })
    
    if (error) {
       console.error(error)
       alert(error.message)
     } else {
       console.log("Enrolled:", data)
     }
  }
  
  return (
    <div> 
      <Navbar/>
      <h1 className="uppercase font-bold text-2xl text-center">
        all courses
      </h1>
      <div>
        {courses.map((course:any) => (
          <div key={course.id} className="p-4 border rounded-lg mb-4">
            <h2 className="text-xl font-bold capitalize">{course.title}</h2>
            <p>{course.description}</p> 
            <button onClick={() => handleEnroll(course.id)} className="px-6 py-2 rounded-lg bg-red-500 focus:outline-none  focus:text-white ">Enroll</button>
          </div>
        ))}
        
        </div>
      </div>
  )
}