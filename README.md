# Jobify - MERN Stack Job Management Platform

## Overview

Jobify is a full-featured job management platform built using the MERN stack and React Query. It allows users to manage job postings with ease, offering features such as registration, login, job creation, updates, and deletion. Users can also view detailed statistics of their job postings. The platform supports guest users, who can view all job details without needing to register, and includes an admin role with full access to all features.

## Features

- **User Registration & Login**: Secure user authentication with the ability to register and log in.
- **Job Management**: Users can create, update, and delete their own job postings.
- **View Job Statistics**: Users can view detailed statistics for their posted jobs.
- **Guest User Access**: Allows guest users to browse and view all job details without registration.
- **Admin Role**: Admin users have full access to all functionalities, including managing all jobs.

## Technologies Used

- **Frontend**: React, React Query
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **State Management**: React Query
- **Styling**: CSS, Styled Component

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/UzairKhan313/mern-jobify.git
   cd mern-jobify
   ```

2. Install dependencies:

   ```bash
   npm run setup-project
   ```

### Running the Application

1.  create the .env in file in root directory and add the following variables :

    ```bash
        PORT = 5100
        NODE_ENV = development
        MONGO_URL =
        JWT_SECRET=
        JWT_EXPIRES_IN=
        CLOUD_NAME=
        CLOUD_API_KEY=
        CLOUD_API_SECRET=

    ```

2.  Start the development server:

    ```bash
    npm run dev
    ```

```

3. Open your browser and navigate to `http://localhost:5173` to view the application.

## API Endpoints

- **POST /api/auth/register**: Register a new user
- **POST /api/auth/login**: Log in as a user
- **POST /api/jobs**: Create a new job (Authenticated users only)
- **GET /api/jobs**: Get all jobs
- **PUT /api/jobs/:id**: Update a job (Authenticated users only)
- **DELETE /api/jobs/:id**: Delete a job (Authenticated users only)
- **GET /api/jobs/stats**: Get job statistics (Authenticated users only)
```
