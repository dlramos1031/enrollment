import { useState } from 'react';
import { registerUser } from '../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await registerUser(username, password, role);
            navigate('/login');
        } catch (error) {
            setError('Error registering user');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-6 bg-white rounded shadow-md">
                <h2 className="text-2xl mb-4">Register</h2>
                {error && <p className="text-red-500">{error}</p>}
                <div className="mb-4">
                    <label className="block mb-2">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Role</label>
                    <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <button onClick={handleRegister} className="w-full p-2 bg-blue-500 text-white rounded">Register</button>
                <p className="mt-4">
                    Already have an account? <button onClick={() => navigate('/login')} className="text-blue-500">Login</button>
                </p>
            </div>
        </div>
    );
};

export default Register;
