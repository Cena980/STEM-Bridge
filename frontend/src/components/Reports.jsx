import {useState, useEffect} from "react";
import SubmissionsChart from "./SubmissionsChart";

export default function Reports() {
    const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/reports/courses-with-count")
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error("Error fetching courses:", err));
  }, []);

  const [totalStudents, setTotalStudents] = useState(0);

useEffect(() => {
  fetch("http://localhost:5000/reports/stats/total-students")
    .then(res => res.json())
    .then(data => setTotalStudents(data.total_students))
    .catch(err => console.error("Error fetching total students:", err));
}, []);

const [totalProfessors, setTotalProfessors] = useState(0);

useEffect(() => {
  fetch("http://localhost:5000/reports/stats/total-professors")
    .then(res => res.json())
    .then(data => setTotalProfessors(data.total_professors))
    .catch(err => console.error("Error fetching total professors:", err));
}, []);

const [totalCourses, setTotalCourses] = useState(0);

useEffect(() => {
  fetch("http://localhost:5000/reports/stats/total-courses")
    .then(res => res.json())
    .then(data => setTotalCourses(data.total_courses))
    .catch(err => console.error("Error fetching total professors:", err));
}, []);
console.log(totalCourses)


  return(
    <div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="border-[0.5pt] min-w-[250px] rounded-lg p-2 px-8  text-sky-400 text-left border-sky-400 bg-sky-800">
            <table>
                <thead className="text-gray-300">
                    <tr>
                        <th>Course</th>
                        <th>Students</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(course =>(
                        <tr key={course.id}
                            className="border-b border-sky-300">
                            <td className="border-r border-sky-300 pr-4">{course.title}</td>
                            <td className="pl-4">{course.total_students}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="border-[0.5pt] min-w-[300px] rounded-lg p-2  text-sky-400 text-left border-sky-400 bg-sky-800">
            <div className="text-center text-gray-300">
                Total Students
            </div>
            <div  className="text-center text-sky-300 text-4xl my-8">
                {totalStudents}
            </div>
        </div>
        <div className="border-[0.5pt] min-w-[300px] rounded-lg p-2  text-sky-400 text-left border-sky-400 bg-sky-800">
            <div className="text-center text-gray-300">
                Total Professors
            </div>
            <div  className="text-center text-sky-300 text-4xl my-8">
                {totalProfessors}
            </div>
        </div>
        <div className="border-[0.5pt] min-w-[300px] rounded-lg p-2  text-sky-400 text-left border-sky-400 bg-sky-800">
            <div className="text-center text-gray-300">
                Total Courses
            </div>
            <div  className="text-center text-sky-300 text-4xl my-8">
                {totalCourses}
            </div>
        </div>
    </div>
    <div className="border-[0.5pt] min-w-[300px] rounded-lg p-2 my-4 text-sky-400 text-left border-sky-400 bg-sky-800">
        <SubmissionsChart/>
    </div>
    </div>
  )

}