# ExamEdge: AI-Powered Question Paper Generator 

Welcome to **ExamEdge**! This isn't just another form builder; it's an intelligent platform designed to revolutionize how faculty create, manage, and deploy question papers. By combining a powerful backend with an intuitive frontend, ExamEdge saves educators countless hours and ensures the creation of high-quality, consistent, and well-structured exams.

The core of the system is a conversational AI that allows faculty to build a question paper simply by talking to an assistant, but it's also backed by robust manual controls for full flexibility.

---
##  Core Features

* **Conversational AI Paper Generation**: Build a complete question paper by chatting with an AI assistant. Tell it your constraints, ask for suggestions, add questions, and finalize the paper, all through a simple chat interface.
* **Centralized Question Bank**: A robust, filterable question bank serves as the single source of truth for all academic content. Filter questions by unit, course outcome (CO), Bloom's Taxonomy (BT) level, and marks.
* **Role-Based Access Control**: A secure system with distinct roles for **Admins** and **Faculty**. Admins manage the core academic structure (departments, courses, faculty assignments), while faculty manage their assigned courses and create question papers.
* **Flexible Question Management**: Add questions one-by-one through a manual form or upload them in bulk using a pre-formatted `.docx` template. Edit any question at any time.
* **Admin Dashboard & Analytics**: A comprehensive dashboard for administrators to get a high-level overview of the system's data, including counts of departments, courses, and faculty members.
* **On-the-Fly Document Generation**: Generate and download a fully formatted `.docx` question paper and its corresponding answer scheme directly from the platform.

---
##  How It Works: The Architecture

ExamEdge is built on a modern, decoupled architecture.

* **Backend (Django REST Framework)**: A powerful and secure API built with Python and Django. It handles all the business logic, database interactions, user authentication, and communication with the Google Gemini AI for the chat feature. It exposes a series of RESTful endpoints that the frontend consumes.
* **Frontend (React)**: A dynamic and responsive single-page application (SPA) built with React. It provides a seamless user experience, allowing faculty and admins to interact with the system without constant page reloads. It communicates with the Django backend via API calls to fetch and manipulate data.



---
## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your machine:
* Python (3.8+) & Pip
* Node.js (16+) & npm
* A relational database like PostgreSQL or SQLite

### Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/your-username/ExamEdge.git](https://github.com/your-username/ExamEdge.git)
    cd ExamEdge
    ```

2.  **Setup the Backend (Django)**
    ```bash
    # Navigate to the backend directory
    cd server 

    # Create and activate a virtual environment
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

    # Install Python dependencies
    pip install -r requirements.txt

    # Run database migrations
    python manage.py migrate

    # Start the Django development server
    python manage.py runserver
    ```
    The backend API will now be running at `http://127.0.0.1:8000`.

3.  **Setup the Frontend (React)**
    ```bash
    # Navigate to the frontend directory from the root
    cd client

    # Install Node.js dependencies
    npm install

    # Start the React development server
    npm run dev
    ```
    The frontend application will now be running at `http://localhost:5173`. Open this URL in your browser to use the application.

---
## 💻 Key Technologies

* **Backend**: Python, Django, Django REST Framework, Google Gemini API
* **Frontend**: React, JavaScript, `react-router-dom`, Axios, Styled-JSX
* **Database**: PostgreSQL
* **Document Parsing**: `python-docx`

---
## 📁 Project Structure

The project is organized into two main parts: `client` and `server`.

* `server/`: Contains the Django project.
    * `api/`: The core app handling CRUD operations, authentication, and paper generation.
    * `ai_generator/`: The app that powers the conversational AI chat interface.
    * `upload_qp/`: The app dedicated to bulk question uploads from `.docx` files.
* `client/`: Contains the React application.
* `flask-server/`: Contains the Django project.
    * `api/`: Generates questions(bank) from a given document (pdf, docx, pptx, txt)
