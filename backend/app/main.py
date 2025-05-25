from fastapi import FastAPI
from app.database import engine, Base
from app.db.initial_data import create_default_users
from app.database import SessionLocal
from app.api import auth_router, jobs_router, answers_router


Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth_router, prefix="/auth")
app.include_router(jobs_router, prefix="/jobs")
app.include_router(answers_router, prefix="/answers")

@app.on_event("startup")
def startup_event():
    db = SessionLocal()
    try:
        create_default_users(db)
    finally:
        db.close()
