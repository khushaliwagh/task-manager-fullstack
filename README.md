# Task Manager — Full-Stack Web Application

A full-stack Task Manager application built with **React, Spring Boot, and MySQL**. It provides an interface for creating, viewing, updating, and managing tasks.

## 🚀 Features

- 📋 View and manage tasks.
- ➕ Add new tasks.
- ✏️ Edit existing tasks.
- 🔍 View individual task details.
- 🖥️ Dashboard layout with navigation.
- 🔗 REST API integration between frontend and backend.
- 💾 MySQL database integration for task storage.

## 🛠️ Technologies Used

### Frontend
- React
- Vite
- JavaScript
- HTML5
- CSS3

### Backend
- Java
- Spring Boot
- Spring Data JPA
- REST APIs
- Maven

### Database
- MySQL

### Development Tools
- Visual Studio Code
- Eclipse IDE
- Git and GitHub

## 📁 Project Structure

```text
task-manager-fullstack/
├── backend/
│   └── task-manager-backend/
│       ├── schema/
│       │   └── Taskmanager.sql
│       └── taskmanager/
│           ├── src/
│           │   ├── main/
│           │   │   ├── java/
│           │   │   └── resources/
│           │   └── test/
│           ├── pom.xml
│           ├── mvnw
│           └── mvnw.cmd
└── frontend/
    └── task-manager-frontend/
        └── task-manager-frontend/
            ├── public/
            ├── src/
            │   ├── components/
            │   ├── pages/
            │   └── styles/
            ├── package.json
            └── vite.config.js
```

## ⚙️ Getting Started

### Prerequisites

Install the following tools before running the application:

- Java Development Kit (JDK)
- Node.js and npm
- MySQL Server
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/khushaliwagh/task-manager-fullstack.git
cd task-manager-fullstack
```

### 2. Configure the Database

1. Start your MySQL server.
2. Create a database named `task_manager_db`.
3. Configure the database connection in your local Spring Boot `application.properties` file.

Example configuration:

```properties
spring.application.name=taskmanager
server.port=8081

spring.datasource.url=jdbc:mysql://localhost:3306/task_manager_db
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

**Security note:** Replace the example credentials with your own local MySQL credentials. Never commit passwords or other secrets to GitHub.

### 3. Run the Backend

Open a terminal and navigate to the Spring Boot project:

```bash
cd backend/task-manager-backend/taskmanager
```

On Windows Git Bash, run:

```bash
./mvnw spring-boot:run
```

The backend is configured to run on:

`http://localhost:8081`

### 4. Run the Frontend

Open a second terminal from the repository root:

```bash
cd frontend/task-manager-frontend/task-manager-frontend
npm install
npm run dev
```

Open the local URL displayed by Vite in your terminal, usually:

`http://localhost:5173`

## 🔌 API Integration

The React frontend communicates with the Spring Boot backend through REST APIs to manage task data.

The backend uses Spring Data JPA to interact with the MySQL database.

## 🎯 Project Objective

This project demonstrates practical full-stack development skills, including building a React user interface, creating REST APIs with Spring Boot, integrating a MySQL database, and organizing frontend and backend code.

## 👩‍💻 Author

**Khushali Wagh**

GitHub: [@khushaliwagh](https://github.com/khushaliwagh)

---

⭐ If you find this project useful, consider giving the repository a star.
