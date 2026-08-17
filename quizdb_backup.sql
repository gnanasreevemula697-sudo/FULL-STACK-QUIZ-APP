-- QuizMaster Expanded Database Seeding Script
-- Database: quizdb
-- Total Categories: 5
-- Total Questions: 45 (9 questions per category)

CREATE DATABASE IF NOT EXISTS `quizdb`;
USE `quizdb`;

-- 1. Recreate tables to ensure clean state
DROP TABLE IF EXISTS `quiz_questions`;
DROP TABLE IF EXISTS `quiz`;
DROP TABLE IF EXISTS `questions`;
DROP TABLE IF EXISTS `categories`;

-- Create categories table
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create questions table
CREATE TABLE `questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `correct_answer` varchar(255) DEFAULT NULL,
  `explanation` text DEFAULT NULL,
  `option1` varchar(255) DEFAULT NULL,
  `option2` varchar(255) DEFAULT NULL,
  `option3` varchar(255) DEFAULT NULL,
  `option4` varchar(255) DEFAULT NULL,
  `question` varchar(255) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_category` (`category_id`),
  CONSTRAINT `FK_category_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert Categories
INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Java'),
(2, 'Python'),
(3, 'SQL'),
(4, 'React'),
(5, 'General Knowledge');

-- Insert Expanded Questions (45 High-Quality Questions)
INSERT INTO `questions` (`id`, `question`, `option1`, `option2`, `option3`, `option4`, `correct_answer`, `explanation`, `category_id`) VALUES
-- ==================== JAVA QUESTIONS (1-9) ====================
(1, 'Which of the following is not a Java feature?', 'Dynamic', 'Architecture Neutral', 'Use of pointers', 'Object Oriented', 'Use of pointers', 'Java does not support direct pointers for security and simplicity reasons.', 1),
(2, 'What is the default value of short variable in Java?', '0.0', '0', 'null', 'Not defined', '0', 'The default value of integral types (byte, short, int, long) in Java is 0.', 1),
(3, 'Which package contains the Random class?', 'java.util', 'java.lang', 'java.io', 'java.net', 'java.util', 'The Random class is part of the java.util package.', 1),
(4, 'Which of these is not a valid Access Modifier in Java?', 'private', 'protected', 'internal', 'public', 'internal', 'Java does not have an "internal" access modifier. Its modifiers are public, protected, private, and default (package-private).', 1),
(5, 'What is the size of double variable in Java?', '8 bit', '16 bit', '32 bit', '64 bit', '64 bit', 'In Java, double is a double-precision 64-bit IEEE 754 floating point.', 1),
(6, 'Which keyword is used to prevent method overriding in Java?', 'static', 'final', 'constant', 'abstract', 'final', 'Marking a method as "final" prevents subclasses from overriding it.', 1),
(7, 'Which class is the superclass of all classes in Java?', 'Class', 'Object', 'String', 'System', 'Object', 'java.lang.Object is the root of the class hierarchy. Every class has Object as a superclass.', 1),
(8, 'What is the time complexity of searching in a HashMap (average case)?', 'O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(1)', 'The average-case time complexity of searching elements in a HashMap is O(1) due to hashing.', 1),
(9, 'Which interface must be implemented to allow an object to be written to an output stream?', 'Runnable', 'Cloneable', 'Serializable', 'Comparable', 'Serializable', 'To serialize an object, its class must implement the java.io.Serializable marker interface.', 1),

-- ==================== PYTHON QUESTIONS (10-18) ====================
(10, 'Which character is used in Python to make single line comments?', '#', '//', '/*', '!', '#', 'Python uses the hash character (#) to write single-line comments.', 2),
(11, 'What is the correct file extension for Python files?', '.py', '.pyt', '.pt', '.pyw', '.py', 'Python source code files typically have the .py extension.', 2),
(12, 'Which of the following is an immutable data type in Python?', 'List', 'Dictionary', 'Set', 'Tuple', 'Tuple', 'Tuples in Python are immutable, meaning their elements cannot be changed after creation.', 2),
(13, 'How do you start a block of code in Python?', 'Curly braces {}', 'Indentation', 'Parentheses ()', 'Semicolons ;', 'Indentation', 'Python uses indentation (whitespace) to define code blocks instead of curly braces or keywords.', 2),
(14, 'What does the len() function do in Python?', 'Returns the object length', 'Calculates math limits', 'Finds string letters', 'Creates a loop index', 'Returns the object length', 'The len() function returns the number of items (length) in an object like a list, string, or tuple.', 2),
(15, 'What is the correct way to import a module named "math" in Python?', 'import math', 'using math', 'include math', 'require math', 'import math', 'The "import" keyword is used to import modules in Python.', 2),
(16, 'Which method is used to add an item to the end of a list in Python?', 'add()', 'append()', 'insert()', 'extend()', 'append()', 'The append() method adds an element to the end of an existing list.', 2),
(17, 'What is the output of 3 * 3 in Python?', '9', '6', '27', '33', '9', 'The asterisk (*) operator performs multiplication in Python.', 2),
(18, 'Which of these is NOT a built-in collection type in Python?', 'List', 'Tuple', 'Array', 'Dictionary', 'Array', 'Python has Lists, Tuples, Sets, and Dictionaries built-in. Arrays require importing the "array" or "numpy" module.', 2),

-- ==================== SQL QUESTIONS (19-27) ====================
(19, 'Which SQL statement is used to extract data from a database?', 'GET', 'SELECT', 'EXTRACT', 'OPEN', 'SELECT', 'The SELECT statement is used to query and extract data from a database.', 3),
(20, 'Which SQL keyword is used to sort the result-set?', 'SORT BY', 'ORDER BY', 'SORT', 'ORDER', 'ORDER BY', 'The ORDER BY keyword is used to sort the query results in ascending or descending order.', 3),
(21, 'Which join returns all records when there is a match in either left or right table?', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'FULL OUTER JOIN', 'FULL OUTER JOIN', 'FULL OUTER JOIN returns all rows from both tables as long as there is a match in one of them.', 3),
(22, 'What does SQL stand for?', 'Structured Query Language', 'Simple Query Language', 'System Query Language', 'Standard Query Loop', 'Structured Query Language', 'SQL stands for Structured Query Language, designed for managing relational databases.', 3),
(23, 'Which constraint uniquely identifies each record in a database table?', 'UNIQUE', 'FOREIGN KEY', 'PRIMARY KEY', 'NOT NULL', 'PRIMARY KEY', 'A PRIMARY KEY constraint uniquely identifies each record in a table and cannot contain NULL values.', 3),
(24, 'Which SQL operator is used to search for a specified pattern in a column?', 'LIKE', 'IN', 'BETWEEN', 'GET', 'LIKE', 'The LIKE operator is used in a WHERE clause to search for a specified pattern in a column (using % or _ wildcards).', 3),
(25, 'Which aggregate function returns the total number of rows in a query?', 'SUM()', 'COUNT()', 'TOTAL()', 'AVG()', 'COUNT()', 'The COUNT() function returns the number of rows that match specified criteria.', 3),
(26, 'How do you select all columns from a table named "Customers"?', 'SELECT * FROM Customers', 'SELECT Customers', 'GET Customers', 'SELECT ALL Customers', 'SELECT * FROM Customers', 'The asterisk (*) wildcard is used in SQL to select all columns of a table.', 3),
(27, 'Which SQL statement is used to delete data from a database?', 'REMOVE', 'DELETE', 'DROP', 'COLLAPSE', 'DELETE', 'The DELETE statement is used to delete existing records from a table.', 3),

-- ==================== REACT QUESTIONS (28-36) ====================
(28, 'What is the default port for React development server?', '8080', '3000', '5000', '8000', '3000', 'React applications created with create-react-app run on port 3000 by default.', 4),
(29, 'Which hook is used to perform side effects in React function components?', 'useState', 'useEffect', 'useContext', 'useReducer', 'useEffect', 'The useEffect hook lets you perform side effects in React function components.', 4),
(30, 'What is the purpose of React Virtual DOM?', 'It directly alters the browser HTML', 'It keeps a copy of UI in memory to sync with real DOM efficiently', 'It creates multiple browser tabs', 'It secures React code from hackers', 'It keeps a copy of UI in memory to sync with real DOM efficiently', 'The Virtual DOM allows React to calculate UI updates in memory first, minimizing slow operations on the real DOM.', 4),
(31, 'How do you pass data from a parent component to a child component?', 'Using state', 'Using props', 'Using hooks', 'Using routers', 'Using props', 'Props (properties) are read-only variables passed from parent to child components to render data dynamically.', 4),
(32, 'Which keyword is used to create a state variable in a functional React component?', 'useState', 'setState', 'this.state', 'createState', 'useState', 'The useState hook is used to declare state variables in functional components.', 4),
(33, 'What is JSX?', 'A JavaScript extension that allows writing HTML-like code inside JS', 'A style sheet for React', 'A package manager', 'A React database query language', 'A JavaScript extension that allows writing HTML-like code inside JS', 'JSX stands for JavaScript XML, allowing developers to write HTML tags and structure directly within React code.', 4),
(34, 'In React, what are "keys" used for?', 'To login to admin panel', 'To help React identify which items have changed, been added, or removed in lists', 'To style list items', 'To connect components to routers', 'To help React identify which items have changed, been added, or removed in lists', 'Keys give React elements stable identities to track changes in list items during rendering.', 4),
(35, 'Which command is commonly used to create a new React application?', 'npx create-react-app my-app', 'npm build react-app', 'react-new my-app', 'npx start-react', 'npx create-react-app my-app', 'The command "npx create-react-app my-app" sets up a ready-to-run React template.', 4),
(36, 'What does the "StrictMode" component do in React?', 'It compiles JSX to pure JavaScript', 'It highlights potential problems in an application during development', 'It secures routing paths', 'It optimizes production bundle size', 'It highlights potential problems in an application during development', 'StrictMode activates additional checks and warnings for its descendants in development mode.', 4),

-- ==================== GENERAL KNOWLEDGE QUESTIONS (37-45) ====================
(37, 'Which planet is known as the Red Planet?', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Mars', 'Mars is called the Red Planet because iron minerals in its soil oxidize (rust), making the atmosphere look red.', 5),
(38, 'What is the largest ocean on Earth?', 'Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean', 'Pacific Ocean', 'The Pacific Ocean is the largest and deepest of Earth\'s oceanic divisions.', 5),
(39, 'Who painted the Mona Lisa?', 'Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Michelangelo', 'Leonardo da Vinci', 'The Mona Lisa was painted by the Italian Renaissance artist Leonardo da Vinci in the early 16th century.', 5),
(40, 'What is the chemical symbol for gold?', 'Au', 'Ag', 'Fe', 'Gd', 'Au', 'The chemical symbol for gold is Au, derived from the Latin word "aurum", meaning "shining dawn".', 5),
(41, 'How many bones are there in an adult human body?', '150', '206', '300', '212', '206', 'An adult human body typically has 206 bones, whereas a newborn has around 270 bones before some fuse.', 5),
(42, 'Which country is home to the kangaroo?', 'South Africa', 'India', 'Australia', 'Brazil', 'Australia', 'Kangaroos are native and endemic marsupials of Australia.', 5),
(43, 'Which is the tallest mountain on Earth?', 'K2', 'Mount Everest', 'Mount Kilimanjaro', 'Denali', 'Mount Everest', 'Mount Everest is Earth\'s highest mountain above sea level, located in the Himalayas.', 5),
(44, 'Who is the author of "Harry Potter"?', 'J.R.R. Tolkien', 'George R.R. Martin', 'J.K. Rowling', 'C.S. Lewis', 'J.K. Rowling', 'The Harry Potter fantasy book series was written by the British author J.K. Rowling.', 5),
(45, 'What is the primary gas found in Earth\'s atmosphere?', 'Oxygen', 'Carbon Dioxide', 'Hydrogen', 'Nitrogen', 'Nitrogen', 'Nitrogen makes up about 78% of Earth\'s atmosphere, followed by oxygen at 21%.', 5);
