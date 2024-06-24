-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 24, 2024 at 03:40 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `enrollment_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `application`
--

CREATE TABLE `application` (
  `application_id` int(11) NOT NULL,
  `student_id` int(11) DEFAULT NULL,
  `program_id` int(11) DEFAULT NULL,
  `student_type` tinyint(4) NOT NULL,
  `application_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `application_status` tinyint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `application`
--

INSERT INTO `application` (`application_id`, `student_id`, `program_id`, `student_type`, `application_date`, `application_status`) VALUES
(14, 30, 6, 0, '2024-06-18 11:14:53', 3),
(18, 34, 8, 0, '2024-06-19 13:34:22', 3),
(19, 35, 5, 2, '2024-06-19 13:34:22', 3),
(20, 36, 1, 0, '2024-06-19 13:34:22', 3),
(21, 37, 7, 3, '2024-06-19 13:34:22', 3),
(22, 38, 4, 4, '2024-06-19 13:34:22', 0),
(23, 39, 6, 2, '2024-06-19 13:34:22', 1),
(24, 40, 2, 1, '2024-06-19 13:34:22', 0),
(25, 41, 8, 0, '2024-06-19 13:34:22', 0),
(26, 42, 1, 3, '2024-06-19 13:34:22', 0),
(27, 43, 7, 4, '2024-06-19 13:34:22', 0),
(28, 44, 3, 2, '2024-06-19 13:34:22', 1),
(29, 45, 5, 0, '2024-06-19 13:34:22', 3),
(30, 46, 2, 1, '2024-06-19 13:34:22', 1),
(31, 47, 6, 3, '2024-06-19 13:34:22', 1),
(32, 48, 4, 4, '2024-06-19 13:34:22', 1),
(33, 49, 8, 0, '2024-06-19 13:34:22', 2),
(34, 50, 3, 2, '2024-06-19 13:34:22', 1),
(35, 51, 1, 1, '2024-06-19 13:34:22', 0),
(36, 52, 7, 0, '2024-06-19 13:34:22', 2),
(37, 53, 5, 4, '2024-06-19 13:34:22', 2);

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `dept_id` int(11) NOT NULL,
  `NAME` varchar(255) NOT NULL,
  `abbr` varchar(11) NOT NULL,
  `location` varchar(255) NOT NULL,
  `contact_number` varchar(20) NOT NULL,
  `email_address` varchar(255) NOT NULL,
  `department_head` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`dept_id`, `NAME`, `abbr`, `location`, `contact_number`, `email_address`, `department_head`) VALUES
(1, 'College of Information Technology and Computing', 'CITC', 'Building A', '123-456-7890', 'citc@example.edu', NULL),
(2, 'College of Engineering and Architecture', 'CEA', 'Building B', '234-567-8901', 'cea@example.edu', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `enrollment`
--

CREATE TABLE `enrollment` (
  `enrollment_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `section_subject_id` int(11) NOT NULL,
  `enrollment_date` date NOT NULL DEFAULT current_timestamp(),
  `enrollment_status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enrollment`
--

INSERT INTO `enrollment` (`enrollment_id`, `student_id`, `section_subject_id`, `enrollment_date`, `enrollment_status`) VALUES
(12, 30, 45, '2024-06-23', 1),
(13, 30, 46, '2024-06-23', 1),
(14, 30, 47, '2024-06-23', 1),
(15, 34, 62, '2024-06-23', 1),
(16, 34, 63, '2024-06-23', 1),
(17, 34, 64, '2024-06-23', 1),
(18, 34, 65, '2024-06-23', 1),
(19, 34, 66, '2024-06-23', 1),
(25, 35, 39, '2024-06-23', 0),
(26, 35, 38, '2024-06-23', 0),
(27, 35, 37, '2024-06-23', 0),
(28, 35, 36, '2024-06-23', 0),
(29, 35, 35, '2024-06-23', 0);

-- --------------------------------------------------------

--
-- Table structure for table `instructors`
--

CREATE TABLE `instructors` (
  `instructor_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contact_number` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `instructors`
--

INSERT INTO `instructors` (`instructor_id`, `first_name`, `last_name`, `email`, `contact_number`) VALUES
(1, 'Alice', 'Smith', 'alice.smith@example.edu', '09123456789'),
(2, 'Bob', 'Johnson', 'bob.johnson@example.edu', '09123456790'),
(3, 'Michael', 'Jordan', 'michael.jordan@example.edu', '09123456781'),
(4, 'Sarah', 'Connor', 'sarah.connor@example.edu', '09123456782'),
(5, 'James', 'Smith', 'james.smith@example.edu', '09123456783'),
(6, 'Emily', 'Davis', 'emily.davis@example.edu', '09123456784'),
(7, 'David', 'Wilson', 'david.wilson@example.edu', '09123456785'),
(8, 'Maria', 'Garcia', 'mgarcia@example.com', '09176789012'),
(9, 'Carlos', 'Reyes', 'creyes@example.com', '09177890123'),
(10, 'Mark', 'Tan', 'mtan@example.com', '09178901234');

-- --------------------------------------------------------

--
-- Table structure for table `program`
--

CREATE TABLE `program` (
  `program_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `program_code` varchar(20) NOT NULL,
  `description` text NOT NULL,
  `dept_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `program`
--

INSERT INTO `program` (`program_id`, `name`, `program_code`, `description`, `dept_id`) VALUES
(1, 'Information Technology', 'IT', 'Program focused on IT', 1),
(2, 'Computer Science', 'CS', 'Program focused on Computer Science', 1),
(3, 'Data Science', 'DS', 'Program focused on Data Science', 1),
(4, 'Technology Communications Management', 'TCM', 'Program focused on Technology Communications Management', 1),
(5, 'Civil Engineering', 'CE', 'Program focused on Civil Engineering', 2),
(6, 'Electrical Engineering', 'EE', 'Program focused on Electrical Engineering', 2),
(7, 'Mechanical Engineering', 'ME', 'Program focused on Mechanical Engineering', 2),
(8, 'Architecture', 'ARCH', 'Program focused on Architecture', 2);

-- --------------------------------------------------------

--
-- Table structure for table `section`
--

CREATE TABLE `section` (
  `section_id` int(11) NOT NULL,
  `program_id` int(11) NOT NULL,
  `instructor_id` int(11) NOT NULL,
  `section_name` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `section`
--

INSERT INTO `section` (`section_id`, `program_id`, `instructor_id`, `section_name`) VALUES
(24, 1, 1, 'IT-1S1'),
(25, 1, 2, 'IT-1S2'),
(26, 2, 3, 'IT-1S3'),
(27, 2, 4, 'CS-1S1'),
(28, 2, 1, 'CS-1S2'),
(29, 3, 2, 'DS-1S1'),
(30, 3, 3, 'DS-1S2'),
(31, 4, 4, 'TCM-1S1'),
(32, 4, 4, 'TCM-1S2'),
(33, 5, 5, 'CE-1S1'),
(34, 5, 6, 'CE-1S2'),
(35, 6, 7, 'EE-1S1'),
(36, 6, 8, 'EE-1S2'),
(37, 7, 5, 'ME-1S1'),
(38, 7, 6, 'ME-1S2'),
(39, 8, 7, 'AR-1S1'),
(40, 8, 8, 'AR-1S2');

-- --------------------------------------------------------

--
-- Table structure for table `section_subject`
--

CREATE TABLE `section_subject` (
  `section_subject_id` int(11) NOT NULL,
  `section_id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `instructor_id` int(11) NOT NULL,
  `schedule` varchar(255) NOT NULL,
  `room` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `section_subject`
--

INSERT INTO `section_subject` (`section_subject_id`, `section_id`, `subject_id`, `instructor_id`, `schedule`, `room`) VALUES
(1, 24, 3, 1, 'MWF 9:00-10:30', 'Room 101'),
(2, 24, 14, 1, 'TTh 10:00-11:30', 'Room 101'),
(3, 24, 15, 2, 'MWF 1:00-2:30', 'Room 101'),
(4, 24, 16, 2, 'TTh 2:00-3:30', 'Room 101'),
(5, 24, 10, 3, 'WF 3:00-4:30', 'Gym'),
(6, 24, 12, 4, 'Sat 8:00-11:00', 'Field'),
(7, 25, 3, 2, 'MWF 8:00-9:30', 'Room 102'),
(8, 25, 14, 2, 'TTh 9:00-10:30', 'Room 102'),
(9, 25, 15, 3, 'MWF 10:00-11:30', 'Room 102'),
(10, 25, 16, 3, 'TTh 1:00-2:30', 'Room 102'),
(11, 25, 10, 4, 'WF 2:00-3:30', 'Gym'),
(12, 25, 12, 1, 'Sat 9:00-12:00', 'Field'),
(13, 27, 4, 3, 'MWF 8:00-9:30', 'Room 201'),
(14, 27, 2, 3, 'TTh 10:00-11:30', 'Room 201'),
(15, 27, 17, 4, 'MWF 11:00-12:30', 'Room 201'),
(16, 27, 10, 2, 'WF 2:00-3:30', 'Gym'),
(17, 27, 12, 1, 'Sat 8:00-11:00', 'Field'),
(18, 28, 4, 1, 'MWF 10:00-11:30', 'Room 202'),
(19, 28, 2, 1, 'TTh 1:00-2:30', 'Room 202'),
(20, 28, 17, 3, 'MWF 2:00-3:30', 'Room 202'),
(21, 28, 10, 4, 'WF 3:00-4:30', 'Gym'),
(22, 28, 12, 2, 'Sat 9:00-12:00', 'Field'),
(23, 29, 5, 2, 'MWF 8:00-9:30', 'Room 301'),
(24, 29, 10, 2, 'WF 1:00-2:30', 'Gym'),
(25, 29, 12, 4, 'Sat 8:00-11:00', 'Field'),
(26, 30, 5, 3, 'MWF 10:00-11:30', 'Room 302'),
(27, 30, 10, 4, 'WF 2:00-3:30', 'Gym'),
(28, 30, 12, 1, 'Sat 9:00-12:00', 'Field'),
(29, 31, 1, 4, 'MWF 8:00-9:30', 'Room 401'),
(30, 31, 10, 1, 'WF 1:00-2:30', 'Gym'),
(31, 31, 12, 3, 'Sat 8:00-11:00', 'Field'),
(32, 32, 1, 4, 'MWF 10:00-11:30', 'Room 402'),
(33, 32, 10, 2, 'WF 2:00-3:30', 'Gym'),
(34, 32, 12, 4, 'Sat 9:00-12:00', 'Field'),
(35, 33, 6, 5, 'MWF 8:00-9:30', 'Room 501'),
(36, 33, 18, 5, 'TTh 10:00-11:30', 'Room 501'),
(37, 33, 19, 6, 'MWF 11:00-12:30', 'Room 501'),
(38, 33, 10, 3, 'WF 1:00-2:30', 'Gym'),
(39, 33, 12, 1, 'Sat 8:00-11:00', 'Field'),
(40, 34, 6, 6, 'MWF 10:00-11:30', 'Room 502'),
(41, 34, 18, 6, 'TTh 1:00-2:30', 'Room 502'),
(42, 34, 19, 5, 'MWF 2:00-3:30', 'Room 502'),
(43, 34, 10, 2, 'WF 3:00-4:30', 'Gym'),
(44, 34, 12, 4, 'Sat 9:00-12:00', 'Field'),
(45, 35, 7, 7, 'MWF 8:00-9:30', 'Room 601'),
(46, 35, 10, 5, 'WF 1:00-2:30', 'Gym'),
(47, 35, 12, 3, 'Sat 8:00-11:00', 'Field'),
(48, 36, 7, 8, 'MWF 10:00-11:30', 'Room 602'),
(49, 36, 10, 4, 'WF 2:00-3:30', 'Gym'),
(50, 36, 12, 1, 'Sat 9:00-12:00', 'Field'),
(51, 37, 8, 5, 'MWF 8:00-9:30', 'Room 701'),
(52, 37, 10, 6, 'WF 1:00-2:30', 'Gym'),
(53, 37, 12, 3, 'Sat 8:00-11:00', 'Field'),
(54, 38, 8, 6, 'MWF 10:00-11:30', 'Room 702'),
(55, 38, 10, 7, 'WF 2:00-3:30', 'Gym'),
(56, 38, 12, 4, 'Sat 9:00-12:00', 'Field'),
(57, 39, 9, 7, 'MWF 8:00-9:30', 'Room 801'),
(58, 39, 20, 7, 'TTh 10:00-11:30', 'Room 801'),
(59, 39, 21, 8, 'MWF 11:00-12:30', 'Room 801'),
(60, 39, 10, 5, 'WF 1:00-2:30', 'Gym'),
(61, 39, 12, 1, 'Sat 8:00-11:00', 'Field'),
(62, 40, 9, 8, 'MWF 10:00-11:30', 'Room 802'),
(63, 40, 20, 8, 'TTh 1:00-2:30', 'Room 802'),
(64, 40, 21, 7, 'MWF 2:00-3:30', 'Room 802'),
(65, 40, 10, 6, 'WF 3:00-4:30', 'Gym'),
(66, 40, 12, 4, 'Sat 9:00-12:00', 'Field');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `student_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `suffix` varchar(10) DEFAULT NULL,
  `date_of_birth` varchar(15) DEFAULT NULL,
  `gender` varchar(20) NOT NULL,
  `contact_number` varchar(20) DEFAULT NULL,
  `email_address` varchar(255) DEFAULT NULL,
  `home_address` text DEFAULT NULL,
  `status` int(11) DEFAULT 0,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`student_id`, `first_name`, `last_name`, `middle_name`, `suffix`, `date_of_birth`, `gender`, `contact_number`, `email_address`, `home_address`, `status`, `user_id`) VALUES
(30, 'Dave Lester', 'Ramos', 'Paclar', 'Jr.', '2024-06-05', 'Male', '09265579718', 'dlramos1031@gmail.com', 'Zone 3 Lower Bulua, Cagayan de Oro city, Philippines 9000', 4, 14),
(34, 'John', 'Doe', 'Michael', 'Jr.', '1990-01-15', 'Male', '09123456701', 'john.doe@example.com', '123 Main St, Quezon City', 4, 27),
(35, 'Jane', 'Smith', 'Anne', NULL, '1992-05-23', 'Female', '09123456702', 'jane.smith@example.com', '456 Elm St, Makati', 3, 28),
(36, 'Mike', 'Johnson', 'William', NULL, '1988-11-30', 'Male', '09123456703', 'mike.johnson@example.com', '789 Pine St, Pasig', 2, 29),
(37, 'Emily', 'Davis', 'Rose', NULL, '1995-02-14', 'Female', '09123456704', 'emily.davis@example.com', '101 Maple St, Taguig', 2, 30),
(38, 'Will', 'Brown', 'James', 'II', '1991-07-19', 'Male', '09123456705', 'will.brown@example.com', '202 Oak St, Marikina', 0, 31),
(39, 'Sarah', 'Wilson', 'Marie', NULL, '1993-03-22', 'Female', '09123456706', 'sarah.wilson@example.com', '303 Cedar St, Baguio', 1, 32),
(40, 'David', 'Moore', 'Alex', 'III', '1987-09-10', 'Male', '09123456707', 'david.moore@example.com', '404 Birch St, Antipolo', 0, 33),
(41, 'Laura', 'Taylor', 'Grace', NULL, '1994-12-05', 'Female', '09123456708', 'laura.taylor@example.com', '505 Willow St, Caloocan', 0, 34),
(42, 'Chris', 'Anderson', 'Paul', NULL, '1990-08-25', 'Male', '09123456709', 'chris.anderson@example.com', '606 Aspen St, Valenzuela', 0, 35),
(43, 'Amanda', 'Thomas', 'Claire', NULL, '1996-06-15', 'Female', '09123456710', 'amanda.thomas@example.com', '707 Redwood St, Las Piñas', 0, 36),
(44, 'Josh', 'Martin', 'Daniel', NULL, '1989-04-12', 'Male', '09123456711', 'josh.martin@example.com', '808 Magnolia St, Parañaque', 1, 37),
(45, 'Megan', 'Lee', 'Renee', NULL, '1992-10-01', 'Female', '09123456712', 'megan.lee@example.com', '909 Poplar St, Cavite', 2, 38),
(46, 'Ryan', 'Clark', 'Henry', NULL, '1991-11-22', 'Male', '09123456713', 'ryan.clark@example.com', '1010 Cypress St, Laguna', 1, 39),
(47, 'Olivia', 'Rodriguez', 'Hope', NULL, '1994-03-29', 'Female', '09123456714', 'olivia.rodriguez@example.com', '1111 Palm St, Batangas', 1, 40),
(48, 'Brandon', 'Walker', 'Evan', NULL, '1988-07-08', 'Male', '09123456715', 'brandon.walker@example.com', '1212 Oakwood St, Pampanga', 1, 41),
(49, 'Rebecca', 'Hall', 'Faith', NULL, '1993-02-18', 'Female', '09123456716', 'rebecca.hall@example.com', '1313 Pinewood St, Bulacan', 1, 42),
(50, 'Kevin', 'Young', 'Samuel', NULL, '1990-05-05', 'Male', '09123456717', 'kevin.young@example.com', '1414 Maplewood St, Rizal', 1, 43),
(51, 'Ashley', 'Queen', 'Joy', NULL, '1995-09-09', 'Female', '09123456718', 'ashley.king@example.com', '1515 Birchwood St, Nueva Ecija', 0, 44),
(52, 'Steven', 'Wright', 'Jack', 'Jr.', '1987-12-25', 'Male', '09123456719', 'steven.wright@example.com', '1616 Cedarwood St, Tarlac', 1, 45),
(53, 'Rachel', 'Green', 'Sophia', NULL, '1991-06-07', 'Female', '09123456720', 'rachel.green@example.com', '1717 Willowwood St, Zambales', 1, 46);

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `subject_id` int(11) NOT NULL,
  `program_id` int(11) NOT NULL,
  `subject_code` varchar(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `units` int(11) NOT NULL,
  `semester` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`subject_id`, `program_id`, `subject_code`, `title`, `units`, `semester`) VALUES
(1, 4, 'TCM101', 'Introduction to TCM', 3, 1),
(2, 2, 'CS102', 'Programming Basics', 4, 1),
(3, 1, 'IT101', 'Introduction to Information Technology', 3, 1),
(4, 2, 'CS101', 'Fundamentals of Computer Science', 4, 1),
(5, 3, 'DS101', 'Introduction to Data Science', 3, 1),
(6, 5, 'CE101', 'Basic Civil Engineering', 4, 1),
(7, 6, 'EE101', 'Electrical Engineering Principles', 4, 1),
(8, 7, 'ME101', 'Introduction to Mechanical Engineering', 3, 1),
(9, 8, 'ARCH101', 'Basics of Architecture', 3, 1),
(10, 7, 'PE101', 'Physical Education 1', 2, 1),
(11, 7, 'PE102', 'Physical Education 2', 2, 2),
(12, 8, 'ROTC101', 'Reserve Officers Training Corps 1', 3, 1),
(13, 8, 'ROTC102', 'Reserve Officers Training Corps 2', 3, 2),
(14, 1, 'IT201', 'Data Structures and Algorithms', 4, 2),
(15, 1, 'IT202', 'Database Management Systems', 3, 2),
(16, 1, 'IT203', 'Web Development', 3, 2),
(17, 2, 'CS201', 'Advanced Programming', 4, 2),
(18, 5, 'ENG101', 'Introduction to Engineering', 3, 1),
(19, 5, 'ENG102', 'Engineering Mathematics', 4, 1),
(20, 8, 'ARCH101', 'Introduction to Architecture', 3, 1),
(21, 8, 'ARCH102', 'Architectural Design', 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `email`, `username`, `password`, `role`, `created_at`) VALUES
(14, 'dlramos1031@gmail.com', 'dlramos1031', '$2b$10$JyWyu51DU8Hy2TpP4bDcY.OLaFZN.TtRYaRee0zqpUdZJ3s.GUAcS', 1, '2024-06-16 12:56:48'),
(22, 'adminstaff@example.edu', 'admin_staff', '$2b$10$1PLNVcBd0m7hRtfMZPOS3Ob4VCoOtRFk8wNHf/qttBWrpsksCHzqK', 2, '2024-06-19 06:30:11'),
(23, 'registrar@example.edu', 'registrar', '$2b$10$7gjxTJN2fAm.a6nOnA9m.elR6lRbU9jAQBgcTdLGHYzNKY4UKpPNC', 4, '2024-06-19 12:14:14'),
(24, 'citc@example.edu', 'citc_head', '$2b$10$3G.3DlJ5.KeSN6QCNiXcWeBH1AHtQg8TkF2AbbJ611d//y9DwTWju', 3, '2024-06-19 12:15:13'),
(25, 'cea@example.edu', 'cea_head', '$2b$10$UlMTtlsJf1CwcFNt3qODoORSdqiDcvAY.tFgVss0LQHZyQVw1UhgG', 3, '2024-06-19 12:15:30'),
(26, 'facultystaff@example.edu', 'faculty_staff', '$2b$10$FgYzGUlW3lqcT1NFqo6qJuAD/yrdWmRc.AbsqK97o5zaatSO8wdXG', 5, '2024-06-19 12:16:52'),
(27, 'john.doe@example.com', 'john_doe', '$2b$10$mbCuYqBOM73JEjkvGaq.seMSt8g6TfTVSErUbvs.YzeIXiLihaPzC', 1, '2024-06-19 13:08:31'),
(28, 'jane.smith@example.com', 'jane_smith', '$2b$10$VmZ/0tZtkTzzJxqSKtnp9eWyov0caQNaqCZxYrqzk20OtDKXKEyme', 1, '2024-06-19 13:08:45'),
(29, 'mike.johnson@example.com', 'mike_johnson', '$2b$10$YRjxurUihyNqpNgsaVJRmupRlsnJGqea0Zx.ZnXypF9lFr1msqgfm', 1, '2024-06-19 13:08:57'),
(30, 'emily.davis@example.com', 'emily_davis', '$2b$10$fzixDTESVXXFLN4G4fi96e4rUo/9EoO8lbrOEQuELbC.tUVTNOMue', 1, '2024-06-19 13:09:08'),
(31, 'will.brown@example.com', 'will_brown', '$2b$10$wDjIx4i5TolPt22Z7o3I2.ZXzCS6jq1WG4W5lMkbyb/dPyzFEj2jK', 0, '2024-06-19 13:09:15'),
(32, 'sarah.wilson@example.com', 'sarah_wilson', '$2b$10$mEkiQz0turyBNLgAzwKvAOSPDPyYgcVUytfshBah9VRG7HhwEa4dO', 1, '2024-06-19 13:09:24'),
(33, 'david.moore@example.com', 'david_moore', '$2b$10$KE13bSdDr1LB29bFIX3XZ.hb6q53nlVAXbnzZvE0EaVFmJXx0rEqW', 0, '2024-06-19 13:09:37'),
(34, 'laura.taylor@example.com', 'laura_taylor', '$2b$10$6VCeV3GwC8AeMcc2j5869uun6d86rOPkr8I2cqxJDLpv5U2hlFyIC', 0, '2024-06-19 13:09:48'),
(35, 'chris.anderson@example.com', 'chris_anderson', '$2b$10$n.eUwiqNKulAT5ualujUNee2b1k19ukKq8z4o5eQLEN29wvXaVxeu', 0, '2024-06-19 13:09:54'),
(36, 'amanda.thomas@example.com', 'amanda_thomas', '$2b$10$cWP4jMzWUqyKInJdB9ogiO1dWftTksqPrFMW79EPO7xpV4kaQu2WW', 0, '2024-06-19 13:10:00'),
(37, 'josh.martin@example.com', 'josh_martin', '$2b$10$H3Kv4t8wxspp1l8zQvgHcuY/7syrO17ASggCx7S6mYm9gI5CzE03e', 1, '2024-06-19 13:10:07'),
(38, 'megan.lee@example.com', 'megan_lee', '$2b$10$rPFriVlD34DFOxTFnXB9dOvQaDHaDfy/XAdSG.LD9dTWNLuXMIyQG', 1, '2024-06-19 13:10:15'),
(39, 'ryan.clark@example.com', 'ryan_clark', '$2b$10$A3wyTkQqXEdPa4/prBr7Y.ygISc.B8cf63ezfZhknBMFzOvwHNaEi', 1, '2024-06-19 13:10:24'),
(40, 'olivia.rodriguez@example.com', 'olivia_rodriguez', '$2b$10$/GLoLHobwwFnXqvMBriBo.IFWkYQcy9lbUCJOZUrmzdlUyYeJkNpi', 1, '2024-06-19 13:10:32'),
(41, 'brandon.walker@example.com', 'brandon_walker', '$2b$10$AlVi4wV6Wy3Q5dP2NtnH.uTalT16vgvCCuj4tgHhbyochTQL.9Sxi', 1, '2024-06-19 13:10:42'),
(42, 'rebecca.hall@example.com', 'rebecca_hall', '$2b$10$AMtVu7EfCbNhhcl7RfI6NuXB9IeYwQ2wDODIqISLcEwJ5i.wByvka', 1, '2024-06-19 13:10:50'),
(43, 'kevin.young@example.com', 'kevin_young', '$2b$10$f/faKm6V1c46usFac37MQ.kOuwZK394rESl7/fE2JO.u04PecWC1K', 1, '2024-06-19 13:10:58'),
(44, 'ashley.king@example.com', 'ashley_king', '$2b$10$pU2/ilIbv9qHCUMZ4tYhFOzREpfVHSMCMCTmpHo5gQj6fPBc.46y.', 0, '2024-06-19 13:11:05'),
(45, 'steven.wright@example.com', 'steven_wright', '$2b$10$foN3UgV8kKzLFSWR/DSEAe08hYtJxLkhz4Nb8lsFlv.rt7qFrW7dW', 1, '2024-06-19 13:11:14'),
(46, 'rachel.green@example.com', 'rachel_green', '$2b$10$W6aKl4q7bSlmyBknp1fBAehF7JVARGbeL6iGveJwI3yeZl3oVQxaa', 1, '2024-06-19 13:11:23'),
(47, '2@2', '2', '$2b$10$xKk6nWVVMBeXgUHWzZL7yuQ8ZED9ETxvlLYT09nnapXLNklKTuxAm', 0, '2024-06-20 13:37:23'),
(48, 'asdsad@sadas', 'dd', '$2b$10$fRopt11qQUPoaof00j75gODYJGwR9oAX2J91IiRCH46jTIb4Es3Na', 0, '2024-06-23 11:36:41');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `application`
--
ALTER TABLE `application`
  ADD PRIMARY KEY (`application_id`),
  ADD KEY `application_ibfk_1` (`student_id`),
  ADD KEY `application_ibfk_2` (`program_id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`dept_id`),
  ADD KEY `department_head` (`department_head`);

--
-- Indexes for table `enrollment`
--
ALTER TABLE `enrollment`
  ADD PRIMARY KEY (`enrollment_id`),
  ADD KEY `fk_enrolled_student` (`student_id`),
  ADD KEY `fk_section_sub` (`section_subject_id`);

--
-- Indexes for table `instructors`
--
ALTER TABLE `instructors`
  ADD PRIMARY KEY (`instructor_id`);

--
-- Indexes for table `program`
--
ALTER TABLE `program`
  ADD PRIMARY KEY (`program_id`),
  ADD KEY `dept_id` (`dept_id`);

--
-- Indexes for table `section`
--
ALTER TABLE `section`
  ADD PRIMARY KEY (`section_id`),
  ADD KEY `fk_assigned_instructor` (`instructor_id`),
  ADD KEY `fk_program2` (`program_id`);

--
-- Indexes for table `section_subject`
--
ALTER TABLE `section_subject`
  ADD PRIMARY KEY (`section_subject_id`),
  ADD KEY `fk_instructor` (`instructor_id`),
  ADD KEY `fk_section1` (`section_id`),
  ADD KEY `fk_subject1` (`subject_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`student_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`subject_id`),
  ADD KEY `fk_program` (`program_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `application`
--
ALTER TABLE `application`
  MODIFY `application_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `dept_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `enrollment`
--
ALTER TABLE `enrollment`
  MODIFY `enrollment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `instructors`
--
ALTER TABLE `instructors`
  MODIFY `instructor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `program`
--
ALTER TABLE `program`
  MODIFY `program_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `section`
--
ALTER TABLE `section`
  MODIFY `section_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `section_subject`
--
ALTER TABLE `section_subject`
  MODIFY `section_subject_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `subject_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `application`
--
ALTER TABLE `application`
  ADD CONSTRAINT `application_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `application_ibfk_2` FOREIGN KEY (`program_id`) REFERENCES `program` (`program_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `department`
--
ALTER TABLE `department`
  ADD CONSTRAINT `department_ibfk_1` FOREIGN KEY (`department_head`) REFERENCES `user` (`user_id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `enrollment`
--
ALTER TABLE `enrollment`
  ADD CONSTRAINT `fk_enrolled_student` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  ADD CONSTRAINT `fk_section_sub` FOREIGN KEY (`section_subject_id`) REFERENCES `section_subject` (`section_subject_id`);

--
-- Constraints for table `program`
--
ALTER TABLE `program`
  ADD CONSTRAINT `program_ibfk_1` FOREIGN KEY (`dept_id`) REFERENCES `department` (`dept_id`);

--
-- Constraints for table `section`
--
ALTER TABLE `section`
  ADD CONSTRAINT `fk_assigned_instructor` FOREIGN KEY (`instructor_id`) REFERENCES `instructors` (`instructor_id`),
  ADD CONSTRAINT `fk_program2` FOREIGN KEY (`program_id`) REFERENCES `program` (`program_id`);

--
-- Constraints for table `section_subject`
--
ALTER TABLE `section_subject`
  ADD CONSTRAINT `fk_instructor` FOREIGN KEY (`instructor_id`) REFERENCES `instructors` (`instructor_id`),
  ADD CONSTRAINT `fk_section1` FOREIGN KEY (`section_id`) REFERENCES `section` (`section_id`),
  ADD CONSTRAINT `fk_subject1` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`subject_id`);

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `subjects`
--
ALTER TABLE `subjects`
  ADD CONSTRAINT `fk_program` FOREIGN KEY (`program_id`) REFERENCES `program` (`program_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
