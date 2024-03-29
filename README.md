# Library Microservice

This is a microservice for managing library operations built using the MERN (MongoDB, Express.js, React.js, Node.js) stack pattern. It allows students to borrow and return books, generates invoices for late returns including library fines, and provides administrative functionalities.

## Features

- **Authentication:** Supports both student and admin accounts with authentication.
- **Book Management:** Students can borrow and return books.
- **Invoice Generation:** Automatically generates invoices for late returns with library fines.
- **Admin Dashboard:** Administrative functionalities for managing books, users, and fines.
- **RESTful API:** Provides a RESTful API for integrating with other services.

## Technologies Used

- **MongoDB:** Database for storing book records, user information, and invoices.
- **Express.js:** Web framework for building the server and RESTful APIs.
- **React.js:** Frontend library for building the user interface.
- **Node.js:** JavaScript runtime environment for running the server.
- **JWT:** JSON Web Tokens for authentication and authorization.
- **Mongoose:** MongoDB object modeling tool for Node.js.
- **Axios:** Promise based HTTP client for making API requests.

## Setup Instructions

1. Clone the repository:
- git clone https://github.com/amit3512/lbuSescLibrary

2. Navigate to the project directory:
- cd library

3. Install dependencies for both backend and frontend:
- npm install
  
4. Start the development server:
- npm run dev


