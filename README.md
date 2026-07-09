# Malaria Guide 🦟

> **Predict. Prevent. Educate.**
> A real-time malaria monitoring, forecasting, and regional outbreak management dashboard prototype.

Malaria Guide is a full-stack web application designed to monitor malaria trends, forecast potential outbreaks, and provide regional health insights through an interactive dashboard. The application combines a lightweight Express.js backend API with a modern Next.js frontend to deliver real-time visualization of outbreak data and health metrics.

## Features

*  Real-time malaria outbreak dashboard
*  Forecasting and trend visualization
*  Regional outbreak monitoring
*  Mock authentication system
*  Fast and responsive user interface
*  Built with Tailwind CSS for a clean, modern design

## Tech Stack

### Frontend

* Next.js (React)
* Tailwind CSS

### Backend

* Express.js
* Node.js
* PostgreSQL (Database)

## Database Setup

This project uses **PostgreSQL** to store user information, cases, alerts, and courses. 

1. **Create the Database**: Ensure PostgreSQL is running and create a database named `malaria_guide`:
   ```sql
   CREATE DATABASE malaria_guide;
   ```
2. **Environment File**: Copy the `.env.example` file in the root directory to `.env` in the same directory:
   ```bash
   cp .env.example .env
   ```
   Open the `.env` file and adjust the connection parameters (username, password, port, host) to match your local PostgreSQL configuration.
   
3. **Run Database Initialization**: Run the initialization script to create the schema and populate all mock seed records:
   ```bash
   cd backend
   npm install
   npm run db:init
   ```

The script will look up the `schema.sql` file, construct the tables (`users`, `cases`, `alerts`, `courses`, `videos`, `achievements`), and populate them with seed records matching the dashboard interfaces.

### Seed Login Credentials

Once initialized, you can use the pre-seeded officer account to log into the application:

- **Email**: `officer@malariaguide.gov`
- **Password**: `admin123`

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Hellen684/MalariaGuide.git
cd MalariaGuide
```

### 2. Run the database seed script (as shown above)

Make sure you configure `.env` first, then run `npm run db:init` from the `backend/` directory.

### 3. Run the backend

```bash
cd backend
npm run dev
```

The backend server will start on port `5000` (or the configured `PORT` in `.env`).

### 4. Install and run the frontend

Open a new terminal and run:

```bash
cd frontend
npm install
npm run dev
```

The frontend development server will then be available at `http://localhost:3000`.

## Purpose

This project demonstrates a prototype for malaria surveillance and outbreak management. It showcases how real-time data visualization, forecasting, and regional analytics can support public health awareness and decision-making.
