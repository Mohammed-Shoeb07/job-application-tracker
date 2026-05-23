from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel, Field
from database import get_connection


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Application(BaseModel):
    company: str = Field(min_length=1)
    role: str = Field(min_length=1)
    status: str = Field(min_length=1)
    location: str = Field(min_length=1)
    date_applied: str = Field(min_length=1)
    notes: str = ""


@app.get("/")
def read_root():
    return {"message": "Job Application Tracker API is running"}


@app.get("/applications")
def get_applications():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM applications")

    rows = cursor.fetchall()

    applications = []

    for row in rows:
        applications.append({
            "id": row[0],
            "company": row[1],
            "role": row[2],
            "status": row[3],
            "location": row[4],
            "date_applied": row[5],
            "notes": row[6]
        })

    cursor.close()
    connection.close()

    return {"data": applications}


@app.post("/applications")
def create_application(application: Application):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
        INSERT INTO applications
        (company, role, status, location, date_applied, notes)
        VALUES (%s, %s, %s, %s, %s, %s)
        """,
        (
            application.company,
            application.role,
            application.status,
            application.location,
            application.date_applied,
            application.notes
        )
    )

    connection.commit()

    cursor.close()
    connection.close()

    return {"message": "Application added successfully"}

@app.delete("/applications/{application_id}")
def delete_application(application_id: int):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        "DELETE FROM applications WHERE id = %s",
        (application_id,)
    )

    connection.commit()

    cursor.close()
    connection.close()

    return {"message": "Application deleted successfully"}

@app.put("/applications/{application_id}")
def update_application(application_id: int, application: Application):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
        UPDATE applications
        SET company = %s,
            role = %s,
            status = %s,
            location = %s,
            date_applied = %s,
            notes = %s
        WHERE id = %s
        """,
        (
            application.company,
            application.role,
            application.status,
            application.location,
            application.date_applied,
            application.notes,
            application_id
        )
    )

    connection.commit()

    cursor.close()
    connection.close()

    return {"message": "Application updated successfully"}