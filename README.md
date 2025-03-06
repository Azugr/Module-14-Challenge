# Kanban Board Application

## 📌 Overview
This project is a full-stack **Kanban Board Application** built using **React, TypeScript, Express, PostgreSQL, and Sequelize**. It allows users to create, manage, and track tasks efficiently with authentication and role-based access control.

## 📖 Assignment Acknowledgment
This project was developed as part of an **assignment for Module 14 of the Bootcamp**. The goal was to implement authentication with JWT, complete the login UI, and integrate authentication on the backend.

## 🚀 Features
- 🔑 **User Authentication**: JWT-based authentication system.
- 📝 **Task Management**: Users can create, update, and delete tickets.
- 📋 **Kanban Board Interface**: View tasks categorized by status (Todo, In Progress, Done).
- 👥 **User Assignment**: Assign tickets to specific users.
- 📦 **Persistent Storage**: PostgreSQL database using Sequelize ORM.
- 🌐 **Deployed on Render**: The backend and frontend are deployed and fully functional.

## 🎥 Walkthrough Video
A walkthrough video is included in the submission. It covers:
- Application setup and features.
- User authentication flow.
- Creating and managing tickets on the Kanban board.

[🔗 Watch the Walkthrough Video](INSERT_VIDEO_LINK_HERE)

## 📜 User Story

**AS A** member of an agile team  
**I WANT** a Kanban board with a secure login page  
**SO THAT** I can securely access and manage my work tasks  

## ✅ Acceptance Criteria

- **GIVEN** a Kanban board with a secure login page  
  - **WHEN** I load the login page  
  - **THEN** I am presented with form inputs for username and password  
- **WHEN** I enter my valid username and password  
  - **THEN** I am authenticated using JSON Web Tokens (JWT) and redirected to the main Kanban board page  
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

## 🛠️ Technologies Used
- **Frontend**: React, TypeScript, Vite
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL, Sequelize ORM
- **Authentication**: JWT (JSON Web Token), bcrypt
- **Deployment**: Render (Backend & Frontend)

## 📂 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Azugr/Module-14-Challenge.git
cd Module-14-Challenge
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file in the **server** directory with the following:
```env
PORT=3001
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET_KEY=your_secret_key
```
For the **client**, create a `.env` file with:
```env
VITE_API_BASE_URL=http://localhost:3001
```

### 4️⃣ Start the Application
#### Backend:
```sh
npm run dev
```
#### Frontend:
```sh
cd client
npm run dev
```

## 🔄 API Endpoints
### User Routes
- `POST /api/users/login` - Authenticate a user.
- `GET /api/users` - Retrieve all users.

### Ticket Routes
- `GET /api/tickets` - Retrieve all tickets.
- `POST /api/tickets` - Create a new ticket.
- `PUT /api/tickets/:id` - Update a ticket.
- `DELETE /api/tickets/:id` - Delete a ticket.

## 🔮 Future Improvements
- ✅ Drag-and-drop functionality for Kanban board.
- ✅ Real-time updates using WebSockets.
- ✅ User roles with different permissions.
- ✅ Improved error handling and validation.

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**🚀 Happy Coding!**

