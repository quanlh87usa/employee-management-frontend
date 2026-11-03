# Employee Management System – Frontend

A web-based Employee Management System built with React and Vite. This application provides an interface for managing employee information through a Spring Boot REST API.

## Technologies Used

- React
- JavaScript (ES6+)
- Vite
- HTML5
- CSS3
- Fetch API

## Features

- Display a list of employees
- Search employees by name
- View employee details
- Add new employees
- Edit existing employee information
- Delete employees
- Form validation and error handling
- Handle API errors, including 404 Not Found
- Display server connection errors

## Project Structure

```text
src/
├── components/
│   ├── AddEmployee/
│   ├── EditEmployee/
│   ├── DeleteEmployee/
│   └── ViewEmployee/
├── services/
│   └── employeeService.js
├── App.jsx
└── main.jsx
```

## Requirements

- Node.js
- npm
- Employee Management System Backend running on port 8080

## Installation and Setup

1. Clone the repository:

```bash
git clone https://github.com/quanlh87usa/employee-management-frontend.git
```

2. Navigate to the frontend directory:

```bash
cd employee-management-frontend
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the local URL provided by Vite in your browser.

## Backend Integration

The frontend communicates with a Spring Boot REST API.

Default API URL:

```text
http://localhost:8080
```

The backend handles employee data operations and database communication.

## Error Handling

The application handles:

- Employee not found (404)
- Invalid employee input (400)
- Server connection errors
- Unexpected API errors

## Build

To create a production build:

```bash
npm run build
```

## Future Improvements

- Improve UI/UX
- Add pagination
- Add automated testing
- Improve application security
