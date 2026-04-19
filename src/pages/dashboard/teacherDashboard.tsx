import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useEffect } from 'react'



export default function TeacherDashboard() {
  
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  
  const handleAddCourse = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) alert('User not logged in')
    
    const { error } = await supabase.from("courses").insert({
      title,
      description,
      teacher_id: user.id
    })
    
    if (error) {
      console.error(error)
    } else {
      
      alert('Course added successfully!')
      
    }
  } 
  
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)
  
  const fetchCourses = async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    
    if(!user){
      alert('User not logged in')
      setLoading(false)
      return
    }
    
    const { data, error } = await supabase.from("courses").select("*").eq("teacher_id", user.id)
      
    if(error){
      console.error(error.message)
    }else{
      setCourses(data || [])
    }
    setLoading(false)
  }
  
  useEffect(() => {
    fetchCourses()
  }, [])
  
  
  
  
  return (
    <div className="bg-gray-400 h-screen ">
      <div className="p-4  flex justify-center">
        <div className="space-y-6 bg-gray-300 rounded-lg border-2 shadow-md p-6 w-150">
          <h1 className="uppercase text-2xl font-bold">add courses</h1>
          
          <input type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 w-full text-xl rounded-sm border-2 focus:outline-none "
          />
            
          
          <input type="text"
            placeholder="Course Description"
             onChange={(e) => setDescription(e.target.value)}
            className="p-3 w-full text-xl rounded-sm border-2 focus:outline-none "
          />
          
          <button
            onClick={handleAddCourse}
            className="border-red-500 p-3 w-full bg-red-500 text-xl rounded-sm border-2 hover:text-white"
          >Add Course</button>
        </div>
      </div>
      <div className="border-b"></div>
        
      <div>
          
        <h1 className="uppercase text-4xl font-semibold text-center mb-3">my courses</h1>
        {courses.map((course:any) =>(
          <div key={course.id} className="p-4 flex justify-around items-center border-2 bg-white mb-1  ">
            <div >
              <h2 className="text-xl font-semibold">{course.title}</h2>
              <p className="text-gray-600">{course.description}</p>
            </div>
            <button  className=" uppercase font-bold py-3 px-6 bg-blue-500 text-white rounded-sm">manage</button>
          </div>
        ))}
          
      </div>
    </div>
    
    
  )
}