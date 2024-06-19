/* eslint-disable no-undef */
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import MySQLStore from 'express-mysql-session';
import bcrypt from 'bcrypt';
import { getStudent, getStudents, createUser, getUserByUsername, createStudent, getUserByEmail, getDepartments, getProgram, createApplication, getStudentIDByUserID, getFormByUsername, getDepartmentByProgram, hasProfile, updateStudent, updateApplication, getApplications, getAppStatusByUsername } from './database.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 5000;

// Database connection options
const dbOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

// Create a MySQL session store
const sessionStore = new MySQLStore(dbOptions);

// Configure session middleware
app.use(session({
    key: 'enrollment_session',
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    rolling: true, // Renew session each request
    cookie: { secure: false, maxAge: 30 * 60 * 1000 } // 30 minutes
}));


// Set up CORS configuration
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

// Route for fetching students
app.get('/api/student', async (req, res) => {
    try {
        const students = await getStudents();
        res.json(students);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for fetching a student with specific ID
app.get('/api/student/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const student = await getStudent(id);
        res.json(student);
    } catch (error) {
        console.error('Error fetching student:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for fetching a student with specific ID
app.get('/api/studentcurrent', async (req, res) => {
    try {
        if (await hasProfile(req.session.username)) {
            console.log("Current session username: ", req.session.username);
            const student = await getFormByUsername(req.session.username);
            const department = await getDepartmentByProgram(student.program_id);
            console.log("Fetched form: ", { ...student, ...department });
            res.json({ ...student, ...department });
        } else {
            res.json({ error: 'Profile not found.' });
        }
    } catch (error) {
        console.error('Error fetching student:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for fetching a user with specific username
app.get('/api/user/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const user = await getUserByUsername(username);
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for checking if user exists
app.get('/api/user/exists/username/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const user = await getUserByUsername(username);
        res.json({exists: !(!user)}); // Pasagdaan kay nigana man
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for checking if user exists
app.get('/api/user/exists/email/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const user = await getUserByEmail(email);
        res.json({exists: !(!user)}); // Pasagdaan kay nigana man
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/student/exists/session', async (req, res) => {
    try {
        const username = req.session.username;
        const rows = await hasProfile(username);
        res.json({ exists: Boolean(rows) });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for user registration
app.post('/api/register', async (req, res) => {
    const { email, username, password, role } = req.body;
    try {
        await createUser(email, username, password, role);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: req.body });
    }
});

// Route for user login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await getUserByUsername(username);
        if (user && await bcrypt.compare(password, user.password)) {
            req.session.userId = user.id;
            req.session.email = user.email;
            req.session.username = user.username;
            req.session.role = user.role;
            res.json({ message: 'Login successful' });
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for fetching user profile
app.get('/api/profile', (req, res) => {
    if (req.session.username) {
        res.json({ email: req.session.email, username: req.session.username, role: req.session.role });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
});

// Route for fetching user role
app.get('/api/profile/role', (req, res) => {
    if (req.session.username) {
        res.json({ role: req.session.role });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
});

// Route for user logout
app.post('/api/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ error: 'Could not log out, please try again' });
        }
        res.clearCookie('session_cookie_name');
        res.json({ message: 'Logout successful' });
    });
});

// Route for student profile creation
app.post('/api/create/student', async (req, res) => {
    const { firstName, middleName, lastName, suffix, dateOfBirth, gender, contactNumber, email, homeAddress } = req.body;
    const user = await getUserByUsername(req.session.username);
    try {
        await createStudent(firstName, middleName, lastName, suffix, dateOfBirth, gender, contactNumber, email, homeAddress, user.user_id);
        res.status(201).json({ message: 'Student profile created successfully' });
    } catch (error) {
        console.error('Error creating profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for student application creation
app.post('/api/create/application', async (req, res) => {
    const { programID, studentType } = req.body;
    const user = await getUserByUsername(req.session.username);
    try {
        const studentID = await getStudentIDByUserID(user.user_id);
        await createApplication(studentID.student_id, programID, studentType);
        res.status(201).json({ message: 'Student application created successfully' });
    } catch (error) {
        console.error('Error creating application:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for student profile update
app.post('/api/update/student', async (req, res) => {
    const { firstName, middleName, lastName, suffix, dateOfBirth, gender, contactNumber, email, homeAddress } = req.body;
    const user = await getUserByUsername(req.session.username);
    try {
        await updateStudent(firstName, middleName, lastName, suffix, dateOfBirth, gender, contactNumber, email, homeAddress, user.user_id);
        res.status(201).json({ message: 'Student profile updated successfully' });
    } catch (error) {
        console.error('Error creating profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for student applicatoin update
app.post('/api/update/application', async (req, res) => {
    const { programID, studentType } = req.body;
    const user = await getUserByUsername(req.session.username);
    try {
        const studentID = await getStudentIDByUserID(user.user_id);
        await updateApplication(studentID.student_id, programID, studentType);
        res.status(201).json({ message: 'Student application updated successfully' });
    } catch (error) {
        console.error('Error creating application:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for fetching application forms
app.get('/api/application', async (req, res) => {
    let status = 0;     // Waiting for Admin Staff approval
    switch (req.session.role) {
        case 4:         // Registrar
            status = 2; // Dept. Head approved / Pending Registrar approval
            break;
        case 3:         // Dept Head
            status = 1; // Admin Staff approved / Pending Dept. Head approval
            break;
        case 2:         // Admin Staff
        default:
            break;
    }
    try {
        const applications = await getApplications(status);
        res.json(applications);
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for fetching application status using session user id
app.get('/api/application/status/session', async (req, res) => {
    try {
        const result = await getAppStatusByUsername(req.session.username);
        res.json(result);
    } catch (error) {
        console.error('Error fetching application status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for fetching departments
app.get('/api/department', async (req, res) => {
    try {
        const departments = await getDepartments();
        res.json(departments);
    } catch (error) {
        console.error('Error fetching departments:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for fetching programs on a specific department
app.get('/api/program/:dept_id', async (req, res) => {
    try {
        const dept_id = req.params.dept_id;
        const program = await getProgram(dept_id);
        res.json(program);
    } catch (error) {
        console.error('Error fetching programs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the express server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
