/* eslint-disable no-undef */
import mysql from 'mysql2';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}).promise();

// fetching all students
export async function getStudents() {
    const [rows] = await pool.query("SELECT * FROM `student`");
    return rows;
}

// fetching student with specific id
export async function getStudent(id) {
    const [rows] = await pool.query("SELECT * FROM student WHERE student_id = ?", [id]);
    return rows;
}

// Create a new user
export async function createUser(email, username, password, role) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query("INSERT INTO user (email, username, password, role) VALUES (?, ?, ?, ?)", [email, username, hashedPassword, role]);
    return result.insertId;
}

// Get user by username
export async function getUserByUsername(username) {
    const [rows] = await pool.query("SELECT * FROM user WHERE username = ?", [username]);
    return rows[0];
}
