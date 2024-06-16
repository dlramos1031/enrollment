/* eslint-disable no-undef */
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import MySQLStore from 'express-mysql-session';
import bcrypt from 'bcrypt';
import { getStudent, getStudents, createUser, getUserByUsername } from './database.js';
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
    cookie: { secure: false }
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

// Route for user registration
app.post('/api/register', async (req, res) => {
    const { email, username, password, role } = req.body;
    try {
        await createUser(email, username, password, role);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
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

// Start the express server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
