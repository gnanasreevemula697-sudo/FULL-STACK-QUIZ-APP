# 🧠 QuizMaster – Full Stack Quiz Application

> An interactive full-stack quiz platform built with React.js, Spring Boot, and MySQL.

## 📌 Overview

**QuizMaster** is a web-based quiz application that allows users to test their knowledge through category-based quizzes. It also provides an admin interface for managing quiz categories and questions.

The project follows a separate frontend and backend architecture and communicates through REST APIs.

## ✨ Features

### 👤 User Features
- Browse available quiz categories
- View question count for each category
- Start quizzes by category
- Answer multiple-choice questions
- Navigate through quiz questions
- Track quiz progress
- Submit quizzes
- View score and detailed results
- See selected answers and correct answers
- Read answer explanations
- Retake quizzes

### 🔐 Admin Features
- Admin login
- Admin dashboard
- Manage quiz categories
- Add questions
- View questions
- Edit existing questions
- Delete questions
- Configure answer options
- Set correct answers
- Add question explanations

### 🎨 UI Features
- Responsive interface
- Professional light theme
- Modern navigation
- Hero section
- Interactive category cards
- Separate quiz page
- Separate result page
- Clean admin interface

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React.js, JavaScript, HTML5, CSS3 |
| Routing | React Router |
| API Communication | Axios, REST API |
| Backend | Java, Spring Boot |
| Build Tool | Maven |
| Database | MySQL |
| Tools | VS Code, Git, GitHub, Postman |

## 🏗️ Architecture

```text
                    USER
                      │
                      ▼
             ┌─────────────────┐
             │ React Frontend  │
             │ quiz-frontend   │
             └────────┬────────┘
                      │
                  REST APIs
                      │
                      ▼
             ┌─────────────────┐
             │ Spring Boot API │
             │ quiz-backend    │
             └────────┬────────┘
                      │
                      ▼
             ┌─────────────────┐
             │      MySQL      │
             │    Database     │
             └─────────────────┘
```

## 📂 Project Structure

```text
QuizApplication/
│
├── quiz-frontend/
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   └── App.js
│   └── package.json
│
├── quiz-backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       └── resources/
│   └── pom.xml
│
├── .gitignore
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/gnanasreevemula697-sudo/FULL-STACK-QUIZ-APP.git
cd FULL-STACK-QUIZ-APP
```

### 2. Setup Frontend

```bash
cd quiz-frontend
npm install
npm start
```

Frontend:

```text
http://localhost:3000
```

### 3. Setup Backend

Open another terminal:

```bash
cd quiz-backend
```

On Windows:

```powershell
.\mvnw.cmd spring-boot:run
```

Or run the Spring Boot main application from your IDE.

### 4. Database Setup

Create the required MySQL database and configure the Spring Boot database connection in the application's configuration file.

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/quiz_db
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
```

> Replace the database name, username, and password with your local configuration.

## 🔄 User Flow

```text
Home Page
    ↓
Choose Quiz Category
    ↓
Start Quiz
    ↓
Answer Questions
    ↓
Submit Quiz
    ↓
Result Page
    ↓
View Score & Explanations
    ↓
Retake Quiz / Home
```

## 🔐 Admin Flow

```text
Admin Login
    ↓
Admin Dashboard
    ├── Manage Categories
    │     ├── Add
    │     └── Manage
    │
    └── Manage Questions
          ├── Add
          ├── Edit
          └── Delete
```

## 🧪 Testing

The application can be tested for:

- Home page loading
- Category loading
- Quiz start functionality
- Question loading
- Answer selection
- Question navigation
- Quiz submission
- Score calculation
- Result display
- Retake functionality
- Admin login
- Category management
- Question creation
- Question editing
- Question deletion

## 🚀 Future Enhancements

- User registration and login
- User profiles
- Quiz history
- Leaderboard
- Difficulty levels
- Timed quizzes
- Randomized questions
- Search and filtering
- Admin analytics
- Score charts
- Certificate generation
- Cloud deployment

## 👩‍💻 Author

**Gnana Sree Vemula**

B.Tech Student  
Full Stack Developer 

## 📄 License

This project is developed for educational and academic purposes.
