import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Fetch all students
export const fetchStudents = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/student`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
};

// Fetch a specific student by ID
export const fetchStudentById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/student/${id}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error(`Error fetching student with ID ${id}:`, error);
        throw error;
    }
};

// Register a new user
export const registerUser = async (username, password, role) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/register`, { username, password, role }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

// Login a user
export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, { username, password }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

// Fetch user profile
export const fetchUserProfile = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/profile`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};

// Logout user
export const logoutUser = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error logging out:', error);
        throw error;
    }
};
