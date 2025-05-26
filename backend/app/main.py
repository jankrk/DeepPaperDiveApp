from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
import time
import psycopg2
import os

from database.database import init_db, SessionLocal
from database.initial_data import create_default_users
from app.api.auth import router as auth_router
from app.api.jobs import router as jobs_router
from app.api.answer import router as answers_router


def wait_for_db(retries=10, delay=3):
    from sqlalchemy import create_engine
    engine = create_engine(os.getenv("DATABASE_URL"))  # wpisz swój connection string
    for i in range(retries):
        try:
            conn = engine.connect()
            conn.close()
            print("✅ Połączenie z bazą danych nawiązane")
            return
        except Exception as e:
            print(f"❌ Baza danych nie gotowa, próba {i + 1}/{retries}, czekam {delay}s...")
            time.sleep(delay)
    raise Exception("Nie udało się połączyć z bazą danych po kilku próbach")


@asynccontextmanager
async def lifespan(app: FastAPI):
    wait_for_db()

    init_db()

    db = SessionLocal()
    create_default_users(db)
    db.close()

    print("✅ Aplikacja wystartowała.")
    yield
    print("👋 Aplikacja zatrzymywana...")


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ["http://localhost:5173"] dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/auth")
app.include_router(jobs_router, prefix="/jobs")
app.include_router(answers_router, prefix="/answers")
