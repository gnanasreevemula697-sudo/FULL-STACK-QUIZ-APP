# 🧠 QuizMaster — Full-Stack Quiz Application

QuizMaster is a modern full-stack online quiz platform where users can test their knowledge across multiple categories.

The application provides an interactive quiz experience with category-based quizzes, timed assessments, instant results, and an administration interface for managing quiz content.

---

## 🚀 Features

### 👨‍🎓 User Features

- 🏠 Interactive Home Page
- 📚 Multiple Quiz Categories
- 🎯 Category-based Quizzes
- ❓ Dynamic Questions loaded from the backend
- ⏱️ 2-Minute Quiz Timer
- 🔄 Timer continues across questions without resetting
- ⚡ Automatic submission when the timer reaches `00:00`
- ✅ Answer selection
- ◀️ Previous Question navigation
- ▶️ Next Question navigation
- 🔢 Question navigation
- 📊 Quiz progress tracking
- 🏆 Instant Quiz Results
- 📈 Score and percentage display
- 🔁 Try Again functionality
- 🏠 Home and Categories navigation
- 📱 Responsive design for desktop, tablet and mobile

### 🔐 Admin Features

The application includes a separate Admin interface for managing quiz content.

Admin functionality includes:

- 📂 Category management
- ➕ Add categories
- ✏️ Update categories
- 🗑️ Delete categories
- ❓ Question management
- ➕ Add questions
- ✏️ Update questions
- 🗑️ Delete questions
- 📋 Manage quiz content

The Admin page can be accessed directly through:

`/admin`

The Admin Portal link is intentionally hidden from the normal user navigation.

---

## 🎨 UI / UX

QuizMaster uses a clean and professional quiz-focused interface.

### Design Highlights

- Modern dark-themed interface
- Clean card-based layout
- Consistent spacing and alignment
- Interactive buttons and quiz options
- Clear question progress
- Timer visual states
- Responsive layouts
- Mobile-friendly quiz experience
- Accessible interactive elements
- Smooth and subtle UI interactions

The application focuses on usability rather than excessive visual effects.

---

## ⏱️ Quiz Timer

Each quiz has a total time limit of:

**2 Minutes**

Timer format:

```text
02:00
01:59
01:58
...
00:00

##Timer Behavior

Timer starts when the quiz begins.
Timer does not reset when navigating between questions.
Only one timer interval is maintained.
Timer is cleaned up when the quiz component is unmounted.
Duplicate submissions are prevented.
The quiz is automatically submitted when the timer reaches 00:00.
Timer States
Time	State
02:00 – 00:31	Normal
00:30 – 00:11	Warning
00:10 – 00:00	Critical

##🏗️ Project Architecture

QuizMaster follows a separated full-stack architecture.

QuizMaster
│
├── React Frontend
│   │
│   ├── Home
│   ├── Quiz
│   ├── Result
│   ├── Admin
│   └── Responsive UI
│
├── Spring Boot Backend
│   │
│   ├── REST APIs
│   ├── Controllers
│   ├── Services
│   ├── Repositories
│   └── JPA Entities
│
└── MySQL Database

## 🛠️ Technology Stack

## Frontend:
    React
    React Router
    Axios
    JavaScript
    HTML5
    CSS3
    Create React App:
## Backend:
    Java
    Spring Boot
    Spring Data JPA
    Hibernate
    REST APIs
    Maven
    Database
    MySQL

## 🔌 API Configuration

The frontend uses a centralized Axios configuration.

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8085",
});

This allows the application to use:

Local backend during development
Environment-based backend configuration in deployment

The production backend URL is not hardcoded into the React source code.

## 🗄️ Database

The application uses MySQL as its database.

The backend uses Spring Data JPA/Hibernate to communicate with the database.

The database contains the data required for:

Quiz categories
Questions
Quiz content

Database configuration is maintained in the backend and is not hardcoded into the React frontend.

## 🔄 Application Flow
User
 │
 ▼
Home Page
 │
 ▼
Select Quiz Category
 │
 ▼
Load Questions from Spring Boot API
 │
 ▼
Start 2-Minute Quiz
 │
 ▼
Answer Questions
 │
 ├── Previous
 ├── Next
 └── Question Navigation
 │
 ▼
Submit Quiz
 │
 ▼
Result Page
 │
 ├── Score
 ├── Percentage
 ├── Correct Answers
 ├── Wrong Answers
 └── Unanswered
 │
 ▼
Try Again / Categories / Home

## 🔐 Admin Flow
/admin
   │
   ▼
Admin Page
   │
   ├── Manage Categories
   │      ├── Add
   │      ├── Update
   │      └── Delete
   │
   └── Manage Questions
          ├── Add
          ├── Update
          └── Delete
The Admin route is available directly at:

/admin

The Admin Portal link is not displayed in the normal user navigation.

## 📱 Responsive Design

QuizMaster is designed to work across:

💻 Desktop
📱 Mobile
📲 Tablet

The interface adapts to different screen sizes while maintaining:

Readable question text
Touch-friendly answer options
Proper button spacing
Responsive category cards
Responsive admin layouts
No unnecessary horizontal scrolling

## 🌐 Deployment Architecture

The application uses a separated deployment architecture:
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │    Static Site      │
                    └──────────┬──────────┘
                               │
                               │ REST API
                               ▼
                    ┌─────────────────────┐
                    │   Spring Boot      │
                    │      Backend       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │       MySQL         │
                    │      Database       │
                    └─────────────────────┘
Frontend and backend are deployed separately.

Environment-based API configuration is used so that the backend URL does not need to be hardcoded into the frontend source code.

## 🛡️ Error Handling

The frontend provides handling for common application states such as:

Loading categories
Loading quiz questions
Empty categories
API failures
Quiz submission states
Empty question states
Admin errors

The application avoids using browser alerts for normal quiz interactions.

## ⚡ Performance

The application focuses on lightweight frontend performance by:

Using React hooks appropriately
Avoiding unnecessary dependencies
Cleaning up quiz timers
Avoiding duplicate timer intervals
Using centralized Axios configuration
Using optimized production builds

## 🔮 Future Improvements

Possible future enhancements include:

User authentication
Quiz history
Leaderboard
Difficulty-based quizzes
User profiles
Advanced analytics
Question randomization
More detailed performance reports


👨‍💻 Development

This project was developed as a full-stack quiz application demonstrating:

React frontend development
REST API integration
Spring Boot backend development
MySQL database integration
CRUD operations
Responsive UI design
State management
Timed quiz logic
Production deployment
