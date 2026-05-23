# Job Application Tracker

A full-stack web application for tracking internship and job applications.

Users can create, edit, delete, search, and filter job applications. The app also includes a dashboard with application status statistics and a pie chart.

## Live Demo

Frontend:  
https://job-application-tracker-ms.netlify.app

Backend API:  
https://job-application-tracker-api-lckq.onrender.com

GitHub Repository:  
https://github.com/Mohammed-Shoeb07/job-application-tracker

> The deployed application includes sample data for demonstration purposes.

## Features

- Add new job applications
- Edit existing applications
- Delete applications
- Search and filter applications
- Dashboard with application statistics
- Pie chart visualization of application statuses
- Persistent PostgreSQL database storage
- Responsive user interface
- Full-stack cloud deployment

## Tech Stack

### Frontend

- React
- JavaScript
- HTML
- CSS
- Vite

### Backend

- FastAPI
- PostgreSQL
- psycopg2

### Deployment

- Netlify
- Render
- Supabase

## Local Setup

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
cd backend

python -m venv venv

.\venv\Scripts\Activate.ps1

pip install -r requirements.txt

uvicorn main:app --reload
```

## Environment Variables

Create a `.env` file inside the `backend` folder and add:

```env
DB_HOST=your_supabase_host
DB_NAME=postgres
DB_USER=your_supabase_user
DB_PASSWORD=your_supabase_password
DB_PORT=6543
```

## Future Improvements

- User authentication and authorization
- Pagination for large datasets
- Advanced filtering and sorting
- Application deadline reminders
- Resume and cover letter uploads
