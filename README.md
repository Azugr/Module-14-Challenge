# Kanban Board with JWT Authentication

## Description

Authentication with JSON Web Tokens (JWTs) is crucial for full-stack applications, as it provides a secure and scalable method for verifying user identities. JWTs are compact, URL-safe tokens that encode a user's authentication data, allowing servers to authenticate requests. Additionally, JWTs can include metadata and be easily verified and decoded, enhancing security while enabling seamless authentication across various parts of an application.

This project adds secure authentication to a Kanban board using JWT. Users can log in, manage tasks, and maintain session security. The app includes a React frontend, an Express.js backend with PostgreSQL, and is deployed on Render.

## Features

- Secure login and authentication using JWT
- Task management with Kanban board functionality
- Protected API routes requiring authentication
- User session management with automatic logout on inactivity
- Deployment on Render with PostgreSQL database
- Full user authentication with role-based access control

## User Story

**AS A** member of an agile team  
**I WANT** a Kanban board with a secure login page  
**SO THAT** I can securely access and manage my work tasks  

## Acceptance Criteria

- **GIVEN** a Kanban board with a secure login page
- **WHEN** I load the login page
  - **THEN** I am presented with form inputs for username and password
- **WHEN** I enter my valid username and password
  - **THEN** I am authenticated using JWT and redirected to the main Kanban board page
- **WHEN** I enter an invalid username or password
  - **THEN** I am presented with an error message indicating that the credentials are incorrect
- **WHEN** I successfully log in
  - **THEN** a JWT is stored securely in the client's local storage for subsequent authenticated requests
- **WHEN** I log out
  - **THEN** the JWT is removed from the client's local storage and I am redirected to the login page
- **WHEN** I try to access the Kanban board page without being authenticated
  - **THEN** I am redirected to the login page
- **WHEN** I remain inactive for a defined period
  - **THEN** my session expires, the JWT is invalidated, and I am redirected to the login page upon my next action

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Azugr/Module-14-Challenge.git
   cd kanban-board-jwt
   ```

2. Install dependencies:

   ```sh
   npm install
   cd server && npm install
   cd ../client && npm install
   ```

3. Install required JWT dependencies:

   ```sh
   npm install jsonwebtoken
   npm install @types/jsonwebtoken --save-dev
   ```

4. Set up environment variables:
   Create a `.env` file in the `server/` directory with the following:

   ```env
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_HOST=your_database_host
   DB_NAME=your_database_name
   JWT_SECRET=your_random_secret_key
   ```

5. Start the backend server:

   ```sh
   cd server
   npm start
   ```

6. Start the frontend:

   ```sh
   cd client
   npm start
   ```

## Usage

- Navigate to the login page and enter valid credentials.
- Successfully logging in will store a JWT in local storage.
- Accessing the Kanban board requires authentication.
- Users are logged out automatically after a period of inactivity.

## Deployment

- The application is deployed on Render.
- Ensure environment variables are set in Render’s dashboard for the backend.

## Technologies Used

- **Frontend:** React, TypeScript
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Authentication:** JSON Web Tokens (JWT)
- **Deployment:** Render

## Video Demonstration

A walkthrough video demonstrating the application's functionality is available [here](https://your-video-link.com).

## GitHub Repository

The source code for this project can be found on GitHub: [Module-14-Challenge](https://github.com/Azugr/Module-14-Challenge.git).

## License

This project is open-source and available under the MIT License.

## Contributors

- Your Name - [GitHub Profile](https://github.com/Azugr)


