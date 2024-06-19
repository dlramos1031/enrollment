import { useEffect, useState } from "react";
import { fetchUserProfile, logoutUser } from "../api";
import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar, SidebarItem } from "./Sidebar";
import { CircleUserRound, Home, LogOut, StickyNote } from "lucide-react";

const Dashboard = () => {
  const [profile, setProfile] = useState({
    role: -1
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
    console.log("Using use effect on Dashboard");
    loadProfile();
  }, [navigate]);

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <div className="flex">
      <Sidebar>
        <SidebarItem icon={<Home size={20} />} text="Home" alert to="/dashboard/" />
        {profile.role === 0 && <SidebarItem icon={<StickyNote size={20} />} text="Application Form" alert to="/dashboard/appform" />}
        {profile.role === 1 && <SidebarItem icon={<CircleUserRound size={20} />} text="Profile" alert to="/dashboard/profile" />}
        {profile.role === 1 && <SidebarItem icon={<StickyNote size={20} />} text="Application" alert to="/dashboard/application" />}
        {profile.role === 1 && <SidebarItem icon={<StickyNote size={20} />} text="Enrollment" alert to="/dashboard/enrollment" />}
        {profile.role >= 2 && <SidebarItem icon={<StickyNote size={20} />} text="Application List" alert to="/dashboard/applist" />}
        {profile.role >= 2 && <SidebarItem icon={<StickyNote size={20} />} text="Student Profile List" alert to="/dashboard/proflist" />}
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
