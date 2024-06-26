/* eslint-disable no-undef */
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import MySQLStore from 'express-mysql-session';
import bcrypt from 'bcrypt';
import { getStudent, getStudents, createUser, getUserByUsername, 
    createStudent, getUserByEmail, getDepartments, getProgram, 
    createApplication, getStudentIDByUserID, getFormByUsername, 
    getDepartmentByProgram, hasProfile, updateStudent, 
    updateApplication, getApplications, setAppStatus, 
    setStudentStatus, roleToStudent, getAppStatusByUserID, 
    getStudentStatus, getAdmissionDetails, getPrograms,
    getSection, getSectionLength, getSubjects, enrollSubject,
    hasEnrolled, getEnrollment, getSectionBySecID, 
    getEnrollmentList, acceptEnrollment, 
    getSubjectList} from './database.js';
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
    key: 'enrollment_session', // Key name for the session ID cookie
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    rolling: true, // Renew session each request
    cookie: {
        secure: false, // Set to true if using HTTPS
        maxAge: 60 * 60 * 1000, // 1 Hour
        sameSite: 'lax', // Adjust sameSite attribute for cross-origin requests
    }
}));

// Allowed origins array
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
];

// Set up CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        // Check if the incoming origin is in the allowedOrigins array
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
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
        if (await hasProfile(req.session.user_id)) {
            const student = await getFormByUsername(req.session.username);
            const department = await getDepartmentByProgram(student.program_id);
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
        const rows = await hasProfile(req.session.user_id);
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
            req.session.user_id = user.user_id;
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
app.get('/api/profile', async (req, res) => {
    if (req.session.user_id) {
        const status = (await hasProfile(req.session.user_id) ? await getStudentStatus(req.session.user_id) : 0);
        let profile = { 
            email: req.session.email, 
            user_id: req.session.user_id, 
            username: req.session.username, 
            role: req.session.role,
            student_status: status.status,
        };

        res.json(profile);
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
});

// Route for fetching user role
app.get('/api/profile/role', (req, res) => {
    if (req.session.user_id) {
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
    try {
        await createStudent(firstName, middleName, lastName, suffix, dateOfBirth, gender, contactNumber, email, homeAddress, req.session.user_id);
        res.status(201).json({ message: 'Student profile created successfully' });
    } catch (error) {
        console.error('Error creating profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for student application creation
app.post('/api/create/application', async (req, res) => {
    const { programID, studentType } = req.body;
    try {
        const studentID = await getStudentIDByUserID(req.session.user_id);
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
    try {
        await updateStudent(firstName, middleName, lastName, suffix, dateOfBirth, gender, contactNumber, email, homeAddress, req.session.user_id);
        res.status(201).json({ message: 'Student profile updated successfully' });
    } catch (error) {
        console.error('Error creating profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for student applicatoin update
app.post('/api/update/application', async (req, res) => {
    const { programID, studentType } = req.body;
    try {
        const studentID = await getStudentIDByUserID(req.session.user_id);
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
        const result = await getAppStatusByUserID(req.session.user_id);
        res.json(result);
    } catch (error) {
        console.error('Error fetching application status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for updating application and student status
app.post('/api/application/status/update', async (req, res) => {
    try {
        const { studentID } = req.body;
        const student = await getStudent(studentID);
        let status = 0;
        switch (req.session.role) {
            case 2:         // Admin staff role
                status = 1; // Admin Staff approved / Pending Dept. Head approval
                await setStudentStatus(studentID, 1);   // Pending Application
                await roleToStudent(student.user_id);   // From Guest to Student
                break;
            case 3:         // Dept. Head role
                status = 2; // Dept. Head approved / Pending Registrar approval
                break;
            case 4:         // Registrar role
                status = 3; // Registrar approved /  Application accepted
                await setStudentStatus(studentID, 2); // Admitted / Not Enrolled
                break;
        }
        await setAppStatus(studentID, status);
    } catch (error) {
        console.error('Error fetching application status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/application/details', async (req, res) => {
    try {
        const student_id = await getStudentIDByUserID(req.session.user_id);
        const admission = await getAdmissionDetails(student_id.student_id);
        res.json(admission);
    } catch (error) {
        console.error('Error fetching admission details:', error);
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
        const program = await getPrograms(dept_id);
        res.json(program);
    } catch (error) {
        console.error('Error fetching programs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for fetching programs on a specific department
app.get('/api/program/progid/:id', async (req, res) => {
    try {
        const program_id = req.params.id;
        const program = await getProgram(program_id);
        res.json(program);
    } catch (error) {
        console.error('Error fetching programs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for fetching sections on a specific program
app.get('/api/section/progid/:id', async (req, res) => {
    try {
        const program_id = req.params.id;
        const section = await getSection(program_id);
        res.json(section);
    } catch (error) {
        console.error('Error fetching programs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for getting section
app.get('/api/section/sectid/:id', async (req, res) => {
    try {
        const section_id = req.params.id;
        const section = await getSectionBySecID(section_id);
        res.json(section);
    } catch (error) {
        console.error('Error fetching programs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for getting student count on a section
app.get('/api/section/sectid/:id/count', async (req, res) => {
    try {
        const section_id = req.params.id;
        const section = await getSectionLength(section_id);
        res.json(section);
    } catch (error) {
        console.error('Error fetching programs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for getting student count on a section
app.get('/api/subjects/sectid/:id', async (req, res) => {
    try {
        const section_id = req.params.id;
        const subjects = await getSubjects(section_id);
        res.json(subjects);
    } catch (error) {
        console.error('Error fetching programs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for enrolling subjects
app.post('/api/enrollment/enroll', async (req, res) => {
    try {
        const { subjects } = req.body;
        const studentID = await getStudentIDByUserID(req.session.user_id);

        for (const subjectID of subjects) {
            await enrollSubject(subjectID, studentID.student_id);
        }

        await setStudentStatus(studentID.student_id, 3);

        res.status(200).json({ message: 'Enrollment successful' });
    } catch (error) {
        console.error('Error enrolling subjects:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for enrolling subjects
app.get('/api/enrollment/enrolled', async (req, res) => {
    try {
        const studentID = await getStudentIDByUserID(req.session.user_id);
        const amount = await hasEnrolled(studentID.student_id);
        const has = (amount > 0);
        res.json(has);
    } catch (error) {
        console.error('Error checking enrolling subjects:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for enrolling subjects
app.get('/api/enrollment/list', async (req, res) => {
    try {
        const list = await getEnrollmentList();
        res.json(list);
    } catch (error) {
        console.error('Error getting enrollment list:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for fetching enrollment information
app.get('/api/enrollment', async (req, res) => {
    try {
        const studentID = await getStudentIDByUserID(req.session.user_id);
        const info = await getEnrollment(studentID.student_id);
        res.json(info);
    } catch (error) {
        console.error('Error checking enrolling subjects:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for accepting enrollment
app.get('/api/enrollment/accept/:id', async (req, res) => {
    try {
        await acceptEnrollment(req.params.id);
    } catch (error) {
        console.error('Error accepting enrollment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for accepting enrollment
app.get('/api/subject', async (req, res) => {
    try {
        const studentID = await getStudentIDByUserID(req.session.user_id);
        const result = await getSubjectList(studentID.student_id);
        res.json(result);
    } catch (error) {
        console.error('Error fetching subjects:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the express server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
