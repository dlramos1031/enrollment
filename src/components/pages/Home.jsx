import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchUserProfile } from "../../api";

const Home = () => {
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();
  const roles = [
    "Guest",
    "Student",
    "Admission Staff",
    "Department Head",
    "Registrar",
    "Faculty Staff",
  ];
  const statuses = [
    "Not admitted",
    "Pending Application",
    "Admitted / Not Enrolled",
    "Pending Enrollment",
    "Enrolled",
  ];

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchUserProfile();
        setProfile(data);
      } catch (error) {
        navigate("/login");
      }
    };
    loadProfile();
  }, [navigate]);

  const handleAppFormNavigation = () => {
    navigate("/dashboard/appform");
  };

  return (
    <div className="p-6 bg-gray-200 shadow-md rounded-md max-w-full m-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Home Page
      </h2>
      <div className="text-lg text-gray-700">
        <p>
          Role:{" "}
          <span className="text-green-700 underline">
            {roles[profile.role]}
          </span>{" "}
        </p>
        {profile.role === 1 && (
          <div>
            Status:{" "}
            <span className="text-green-700 underline">
              {statuses[profile.student_status]}
            </span>
          </div>
        )}
      </div>
      {profile.role === 0 ? (
        <div className="text-lg text-gray-700">
          <p>
            Start by setting up your{" "}
            <span
              onClick={handleAppFormNavigation}
              className="text-indigo-600 cursor-pointer hover:underline"
            >
              Application Form
            </span>
            .
          </p>
          <p>
            After setting up, please wait for the Admission Staff to verify your
            form.
          </p>
        </div>
      ) : profile.role === 1 && profile.student_status === 1 ? (
        <div className="text-lg text-gray-700">
          <p>
            Your application form has been accepted! Please wait for the full
            confirmation.
          </p>
        </div>
      ) : profile.role === 1 && profile.student_status === 2 ? (
        <div className="text-lg text-gray-700">
          {/* Add content for role 2 here */}
          <p>
            Congratulations! You have officially passed the admission process.
            Please proceed to the enrollment page.
          </p>
        </div>
      ) : profile.role === 1 && profile.student_status === 3 ? (
        <div className="text-lg text-gray-700">
          {/* Add content for role 2 here */}
          <p>
            You have submitted your enrollment form. Please wait for the Faculty Staff to confirm your enrollment.
          </p>
        </div>
      ) : profile.role === 1 && profile.student_status === 4 ? (
        <div className="text-lg text-gray-700">
          {/* Add content for role 2 here */}
          <p>
            You are officially enrolled! Check the Schedule Page to see more details of your subjects.
          </p>
        </div>
      ) : profile.role === 2 ? (
        <div className="text-lg text-gray-700">
          {/* Add content for role 2 here */}
          <p>Welcome to the staff dashboard.</p>
        </div>
      ) : (
        <div className="text-lg text-gray-700">
          {/* Default content or message for roles that don't match above cases */}
          <p>Welcome to the dashboard.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
