import { useState, useEffect } from "react";
import "../../App.css";
import { fetchStudentSubs } from "../../api";
import { CalendarDays, Mail, MapPin, User } from "lucide-react";

function SubjectList() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await fetchStudentSubs();
        setSubjects(data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    fetchSubjects();
  }, []);

  return (
    <div className="h-screen p-6 bg-gray-200 shadow-md rounded-md max-w-full m-auto flex flex-col">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        List of Subjects Enrolled
      </h2>
      {subjects.length > 0 ? (
        <div className="flex-1 overflow-y-auto">
          <table className="min-w-full bg-white rounded-md shadow">
            <thead className="sticky top-0 bg-blue-200">
              <tr>
                <th className="px-4 py-2 border-b-2">Subject Code</th>
                <th className="px-4 py-2 border-b-2">Subject Title</th>
                <th className="px-4 py-2 border-b-2">Units</th>
                <th className="px-4 py-2 border-b-2">Section</th>
                <th className="px-4 py-2 border-b-2">Schedule & Room</th>
                <th className="px-4 py-2 border-b-2">Instructor</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{subject.subject_code}</td>
                  <td className="px-4 py-2">{subject.title}</td>
                  <td className="px-4 py-2">{subject.units}</td>
                  <td className="px-4 py-2">{subject.section_name}</td>
                  <td className="px-4 py-2">
                    <ul className="custom-list">
                      <li>
                        <CalendarDays size={15} color="green" className="icon" />{" "}
                        {subject.schedule}
                      </li>
                      <li>
                        <MapPin size={15} color="blue" className="icon" />{" "}
                        {subject.room}
                      </li>
                    </ul>
                  </td>
                  <td className="px-4 py-2">
                    <ul className="custom-list">
                      <li>
                        <User size={15} color="green" className="icon" />{" "}
                        {subject.first_name + " " + subject.last_name}
                      </li>
                      <li>
                        <Mail size={15} color="blue" className="icon" />{" "}
                        {subject.email}
                      </li>
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-700">No subjects available.</p>
      )}
    </div>
  );
}

export default SubjectList;
