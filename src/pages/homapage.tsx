import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase"
import { useNavigate } from "react-router-dom";

import Navbar from "../component/navbar";

export default function Homepage() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  
  const handleEnroll = async (courseId: number) => {
    const { data: { user } } = await supabase.auth.getUser();
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if(!user) {
      navigate("/login");
    } else {
      const { data, error } = await supabase.from("enrollments").insert([{ studen_id: user.id, course_id: courseId }]);
      if (error) {
        console.error(error);
      } else {
        alert("Enrolled successfully!");
      }
    }
  };
  const fetchCourses = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("courses").select("*")
    if (data) {
      setCourses(data);
    } else {
      setCourses
      console.error(error);
      return;
    }
    setLoading(false);
  };
  
  useEffect(() => {
    fetchCourses();
  }, []);
  

  return (
    <div >
      <Navbar />
      
      <div >
        {courses.map((course:any) => (
          <div  key={course.id} className="p-4 border rounded-lg mb-4">
            <h2 className="text-xl font-bold capitalize">{course.title}</h2>
            <p>{course.description}</p> 
            <button onClick={() => handleEnroll(course.id)} className="px-6 py-2 rounded-lg bg-red-500 focus:outline-none  focus:text-white ">Enroll</button>
          </div>
        ))}
      </div>
      
    </div>
  ) 
}