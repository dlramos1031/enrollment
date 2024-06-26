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

// fetching username
export async function getUsername(user) {
    const [rows] = await pool.query("SELECT * FROM `user` WHERE `username` = ?", [user]);
    return rows;
}

// fetching student with specific id
export async function getStudent(id) {
    const [rows] = await pool.query("SELECT * FROM student WHERE student_id = ?", [id]);
    return rows[0];
}

// fetching student id with specific user id
export async function getStudentIDByUserID(id) {
    const [rows] = await pool.query("SELECT student_id FROM student WHERE user_id = ?", [id]);
    return rows[0];
}

// fetching student id with specific user id
export async function getFormByUsername(username) {
    const [rows] = await pool.query("SELECT s.`first_name`, s.`last_name`, s.`middle_name`, s.`suffix`, s.`date_of_birth`, s.`gender`, s.`contact_number`, s.`email_address`, s.`home_address`, a.`program_id`, a.`student_type` FROM `student` s JOIN `user` u ON s.`user_id` = u.`user_id` JOIN `application` a ON s.`student_id` = a.`student_id` WHERE u.`username` = ?", [username]);
    return rows[0];
}

// fetching application status using student id
export async function getAppStatusByUserID(id) {
    const [rows] = await pool.query("SELECT a.`application_status` FROM `application` a JOIN `student` s ON a.`student_id` = s.`student_id` WHERE s.`user_id` = ?", [id]);
    return rows[0];
}

// Checking if user has existing student profile
export async function hasProfile(id) {
    const [rows] = await pool.query("SELECT * FROM `student` WHERE user_id = ?", [id]);
    return rows.length;
}

export async function getDepartmentByProgram(id) {
    const [rows] = await pool.query("SELECT department.dept_id, department.NAME FROM department INNER JOIN program ON department.dept_id = program.dept_id WHERE program.program_id = ?", [id]);
    return rows[0];
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

// Get user by email
export async function getUserByEmail(email) {
    const [rows] = await pool.query("SELECT * FROM user WHERE email = ?", [email]);
    return rows[0];
}

// Create a new student profile
export async function createStudent(firstName, middleName, lastName, suffix, dateOfBirth, gender, contactNumber, email, homeAddress, userID) {
    const [result] = await pool.query("INSERT INTO student (first_name, last_name, middle_name, suffix, date_of_birth, gender, contact_number, email_address, home_address, status, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                            [firstName, lastName, middleName, suffix, dateOfBirth, gender, contactNumber, email, homeAddress, 0, userID]);
    return result.insertId;
}

// Create new Application
export async function createApplication(studentID, programID, studentType) {
    console.log(studentID, programID, studentType);
    const [result] = await pool.query("INSERT INTO application (student_id, program_id, student_type, application_status) VALUES (?, ?, ?, ?)", 
                            [studentID, programID, studentType, 0]);
    return result.insertId;
}

// Update an existing student profile
export async function updateStudent(firstName, middleName, lastName, suffix, dateOfBirth, gender, contactNumber, email, homeAddress, userID) {
    const [result] = await pool.query("UPDATE `student` SET `first_name` = ?, `last_name` = ?, `middle_name` = ?, `suffix` = ?, `date_of_birth` = ?, `gender` = ?, `contact_number` = ?, `email_address` = ?, `home_address` = ? WHERE `user_id` = ?",
                            [firstName, lastName, middleName, suffix, dateOfBirth, gender, contactNumber, email, homeAddress, userID]);
    return result.insertId;
}

// Update an existing Application
export async function updateApplication(studentID, programID, studentType) {
    const [result] = await pool.query("UPDATE application SET program_id = ?, student_type = ? WHERE student_id = ?", 
                            [programID, studentType, studentID]);
    return result.insertId;
}

// Fetching all applications
export async function getApplications(applicationStatus) {
    const [rows] = await pool.query("SELECT s.student_id, s.first_name, s.last_name, s.middle_name, s.suffix, s.email_address, s.contact_number, a.application_date, p.name, a.program_id, a.student_type FROM student s JOIN application a ON s.student_id = a.student_id JOIN program p ON a.program_id = p.program_id WHERE a.application_status = ?", 
                            [applicationStatus]);
    return rows;
}

// fetching all departments
export async function getDepartments() {
    const [rows] = await pool.query("SELECT `dept_id`, `NAME` FROM `department`");
    return rows;
}

// fetching all programs
export async function getPrograms(dept_id) {
    const [rows] = await pool.query("SELECT * FROM `program` WHERE dept_id = ?", [dept_id]);
    return rows;
}

// fetching all programs
export async function getProgram(id) {
    const [rows] = await pool.query("SELECT * FROM `program` WHERE program_id = ?", [id]);
    return rows[0];
}

// fetching sections in a program
export async function getSection(id) {
    const [rows] = await pool.query("SELECT `section_id`, `section_name` FROM `section` WHERE `program_id` = ?", [id]);
    return rows;
}

// fetching a section
export async function getSectionBySecID(id) {
    const [rows] = await pool.query("SELECT `section_id`, `section_name` FROM `section` WHERE `section_id` = ?", [id]);
    return rows;
}

// fetching sections in a program
export async function getSectionLength(id) {
    const [rows] = await pool.query("SELECT * FROM `enrollment` e JOIN `section_subject` s ON e.section_subject_id = s.section_subject_id WHERE `section_id` = ?", [id]);
    return rows.length;
}

// fetching subjects in a section
export async function getSubjects(id) {
    const [rows] = await pool.query("SELECT s.`subject_code`, s.`title`, s.`units`, ss.`schedule`, ss.`room`, i.`first_name`, i.`last_name`, ss.`section_subject_id` FROM `section_subject` ss JOIN `instructors` i ON ss.`instructor_id` = i.`instructor_id`JOIN `subjects` s ON ss.`subject_id` = s.`subject_id` WHERE ss.`section_id` = ?", [id]);
    return rows;
}

// Updating application status
export async function setAppStatus(student_id, status) {
    const result = await pool.query("UPDATE `application` SET `application_status` = ? WHERE `student_id` = ?", [status, student_id]);
    return result;
}

// Updating student status
export async function setStudentStatus(student_id, status) {
    const result = await pool.query("UPDATE `student` SET `status` = ? WHERE `student_id` = ?", [status, student_id]);
    return result;
}

// Fetching student status
export async function getStudentStatus(id) {
    const [rows] = await pool.query("SELECT `status` FROM `student` WHERE `user_id` = ?", [id]);
    return rows[0];
}

// Fetching admission details
export async function getAdmissionDetails(id) {
    const [rows] = await pool.query("SELECT `program_id`, `student_type` FROM `application` WHERE `student_id` = ?", [id]);
    return rows[0];
}

// Promoting Guest to Student
export async function roleToStudent(user_id) {
    const result = await pool.query("UPDATE `user` SET `role` = 1 WHERE `user_id` = ?", [user_id]);
    return result;
}

// Enrolling a subject
export async function enrollSubject(section_subject_id, student_id) {
    const result = await pool.query("INSERT INTO `enrollment` (`section_subject_id`, `student_id`) VALUES (?, ?)", [section_subject_id, student_id]);
    return result;
}

// Checking if student has enrolled
export async function hasEnrolled(student_id) {
    const [rows] = await pool.query("SELECT * FROM `enrollment` WHERE `student_id` = ?", [student_id]);
    return rows.length;
}


// get enrollment information
export async function getEnrollment(student_id) {
    const [rows] = await pool.query("SELECT * FROM `enrollment` e JOIN `section_subject` ss ON e.`section_subject_id` = ss.`section_subject_id` WHERE e.`student_id` = ?", [student_id]);
    return rows;
}

// get enrollment list
export async function getEnrollmentList() {
    const [rows] = await pool.query("SELECT s.`student_id`, s.`first_name`, s.`last_name`, s.`suffix`, s.`middle_name`, s.`contact_number`, s.`email_address`, d.`abbr`, p.`program_code`, a.`student_type` FROM `student` s JOIN `application` a ON s.`student_id` = a.`student_id` JOIN `program` p ON a.`program_id` = p.`program_id` JOIN `department` d ON p.`dept_id` = d.`dept_id` WHERE s.`status` = 3");
    if (rows.length) {
        let res = [];
        for(let i = 0; i < rows.length; i++) {
            [res] = await pool.query("SELECT sec.section_name, sub.subject_code, e.enrollment_date FROM section_subject ss JOIN section sec on ss.section_id = sec.section_id JOIN subjects sub ON ss.subject_id = sub.subject_id JOIN enrollment e ON ss.section_subject_id = e.section_subject_id WHERE e.student_id = ?", [rows[i].student_id]);
            rows[i] = {...rows[i], enr_detail: res};
        }
    }
    return rows;
}

// accept a student enrollment
export async function acceptEnrollment(student_id) {
    await pool.query("UPDATE `enrollment` SET `enrollment_status` = 1 WHERE `student_id` = ?", [student_id]);
    await pool.query("UPDATE `student` SET `status` = 4 WHERE `student_id` = ?", [student_id]);
}

// get list of a student's subjects
export async function getSubjectList(student_id) {
    const [rows] = await pool.query("SELECT sub.subject_code, sub.title, sub.units, sec.section_name, ss.schedule, ss.room, i.first_name, i.last_name, i.email FROM enrollment e JOIN section_subject ss ON e.section_subject_id = ss.section_subject_id JOIN subjects sub ON ss.subject_id = sub.subject_id JOIN section sec ON ss.section_id = sec.section_id JOIN instructors i ON ss.instructor_id = i.instructor_id WHERE e.student_id = ?", [student_id]);
    return rows;
}