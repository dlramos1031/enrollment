import { useState, useEffect } from "react";
import { EllipsisVertical, Mail, Phone } from "lucide-react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import "../../App.css";
import { enrollStudent, fetchEnrollmentList } from "../../api";

function EnrollmentsList() {
  const [enrollments, setEnrollments] = useState([]);

  // Placeholder for fetching enrollments
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const data = await fetchEnrollmentList();
        setEnrollments(data);
      } catch (error) {
        console.error("Error fetching enrollments:", error);
      }
    };
    fetchEnrollments();
  });

  const handleApprove = async (id) => {
    try {
      const con = confirm("Confirm enrollment?");
      con && enrollStudent(id);
    } catch (error) {
      console.error("Error confirming enrollment:", error);
    }
  };

  return (
    <div className="h-screen p-6 bg-gray-200 shadow-md rounded-md max-w-full m-auto flex flex-col">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Pending Enrollment
      </h2>
      {enrollments.length > 0 ? (
        <div className="flex-1 overflow-y-auto">
          <table className="min-w-full bg-white rounded-md shadow">
            <thead className="sticky top-0 bg-white">
              <tr>
                <th className="px-4 py-2 border-b-2">Full Name</th>
                <th className="px-4 py-2 border-b-2">Contact Information</th>
                <th className="px-4 py-2 border-b-2">Enrollment Date</th>
                <th className="px-4 py-2 border-b-2">Admission Details</th>
                <th className="px-4 py-2 border-b-2">Section</th>
                <th className="px-4 py-2 border-b-2">Subjects Enrolled</th>
                <th className="px-4 py-2 border-b-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((enrollment) => (
                <tr key={enrollment.student_id} className="border-b">
                  <td className="px-4 py-2">
                    {enrollment.first_name +
                      " " +
                      (enrollment.middle_name
                        ? enrollment.middle_name + " "
                        : " ") +
                      enrollment.last_name +
                      " " +
                      (enrollment.suffix ? enrollment.suffix + " " : " ")}
                  </td>
                  <td className="px-4 py-2">
                    <ul className="custom-list">
                      <li>
                        <Phone size={15} color="green" className="icon" />{" "}
                        {enrollment.contact_number}
                      </li>
                      <li>
                        <Mail size={15} color="blue" className="icon" />{" "}
                        {enrollment.email_address}
                      </li>
                    </ul>
                  </td>
                  <td className="px-4 py-2">
                    {new Date(enrollment.enrollment_date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <ul className="custom-list">
                      <li>Dept.: {enrollment.abbr}</li>
                      <li>Prog.: {enrollment.program_code}</li>
                    </ul>
                  </td>
                  <td className="px-4 py-2">
                    {enrollment.enr_detail
                      ? enrollment.enr_detail[0].section_name
                      : " "}
                  </td>
                  <td className="px-4 py-2">
                    {enrollment.enr_detail.map((detail) => (
                      <ul className="custom-list" key={detail.subject_code}>
                        {detail.subject_code}
                      </ul>
                    ))}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex space-x-2 justify-end">
                      <button
                        onClick={() => handleApprove(enrollment.student_id)}
                        className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Approve
                      </button>
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <MenuButton className="p-2 rounded-full hover:bg-gray-100 focus:outline-none">
                          <EllipsisVertical size={20} />
                        </MenuButton>
                        <MenuItems className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg focus:outline-none">
                          <MenuItem>
                            {({ active }) => (
                              <button
                                className={`${
                                  active ? "bg-red-100" : ""
                                } group flex rounded-md items-center w-full px-4 py-2 text-sm text-red-700`}
                              >
                                Reject
                              </button>
                            )}
                          </MenuItem>
                        </MenuItems>
                      </Menu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-700">No enrolled students found.</p>
      )}
    </div>
  );
}

export default EnrollmentsList;
