-- Malaria Guide PostgreSQL Schema Definitive File
-- Database: malaria_guide

-- Drop tables if they already exist to ensure a clean slate
DROP TABLE IF EXISTS user_progress;
DROP TABLE IF EXISTS user_achievements;
DROP TABLE IF EXISTS achievements;
DROP TABLE IF EXISTS videos;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS alerts;
DROP TABLE IF EXISTS cases;
DROP TABLE IF EXISTS users;

-- 1. Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'health_officer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Cases Table (Reported statistics and location outbreaks)
CREATE TABLE cases (
    id SERIAL PRIMARY KEY,
    location VARCHAR(100) NOT NULL,
    cases_count INT NOT NULL DEFAULT 0,
    severity VARCHAR(20) CHECK (severity IN ('low', 'medium', 'high')),
    reported_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details TEXT,
    reported_by INT REFERENCES users(id) ON DELETE SET NULL
);

-- 3. Alerts Table (Epidemiological hazard warnings)
CREATE TABLE alerts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    location VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    time_ago VARCHAR(50) NOT NULL,
    cases_count INT,
    trend VARCHAR(20) CHECK (trend IN ('increasing', 'stable', 'decreasing', NULL)),
    type VARCHAR(30) NOT NULL CHECK (type IN ('critical', 'warning', 'advisory', 'success')),
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Courses Table (Education modules)
CREATE TABLE courses (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    lessons VARCHAR(50) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    progress INT DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    details TEXT NOT NULL
);

-- 5. Videos Table (Education tutorials)
CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    views VARCHAR(50) NOT NULL,
    duration VARCHAR(20) NOT NULL,
    youtube_id VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Achievements Table (Milestones)
CREATE TABLE achievements (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL,
    unlocked BOOLEAN DEFAULT FALSE,
    color VARCHAR(150) NOT NULL
);

-- Create Indexes for optimized query execution
CREATE INDEX idx_cases_location ON cases(location);
CREATE INDEX idx_alerts_location ON alerts(location);
CREATE INDEX idx_alerts_type ON alerts(type);
