import { useEffect, useState } from "react";
import { fetchUserProfile, logoutUser } from "../api";
import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar, SidebarItem } from "./Sidebar";
import { Home, LogOut, List, SquareUser, Rows4, Rows3, NotebookText } from "lucide-react";

const Dashboard = () => {
  const [profile, setProfile] = useState({
    role: 0
  });
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <div className="flex">
      <Sidebar>
        <SidebarItem icon={<Home size={20} />} text="Home" to="/dashboard/" />
        {(profile.role === 0 || profile.role === 1) && <SidebarItem icon={<SquareUser size={20} />} text="Admission Application" to="/dashboard/appform" />}
        {(profile.role === 1 && (profile.student_status === 2 || profile.student_status === 3)) ? <SidebarItem icon={<NotebookText size={20} />} text="Enrollment" to="/dashboard/enrollment" /> : ""}
        {(profile.role === 1 && profile.student_status === 4) ? <SidebarItem icon={<Rows4 size={20} />} text="Subjects" to="/dashboard/sublist" /> : ""}
        {(profile.role === 2 || profile.role === 3 || profile.role === 4) && <SidebarItem icon={<List size={20} />} text="Applications" to="/dashboard/applist" />}
        {(profile.role === 5) && <SidebarItem icon={<Rows3 size={20} />} text="Enrollment List" to="/dashboard/enrolllist" />}
        <hr className="my-3" />
        <SidebarItem icon={<LogOut size={20} />} text="Log Out" to="/login" onClick={handleLogout} />
      </Sidebar>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
