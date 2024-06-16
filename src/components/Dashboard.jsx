import { useEffect, useState } from 'react';
import { fetchUserProfile, logoutUser } from '../api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await fetchUserProfile();
                setProfile(data);
            } catch (error) {
                setError('Error fetching profile');
            }
        };

        loadProfile();
    }, []);

    const handleLogout = async () => {
        try {
            await logoutUser();
            navigate('/login');
        } catch (error) {
            setError('Error logging out');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-6 bg-white rounded shadow-md">
                <h2 className="text-2xl mb-4">Dashboard</h2>
                {error && <p className="text-red-500">{error}</p>}
                {profile && (
                    <div>
                        <p>Username: {profile.username}</p>
                        <p>Role: {profile.role}</p>
                    </div>
                )}
                <button onClick={handleLogout} className="w-full p-2 mt-4 bg-red-500 text-white rounded">Logout</button>
            </div>
        </div>
    );
};

export default Dashboard;
