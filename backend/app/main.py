from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1 import api_v1_router
from app.core.config import settings
from app.db.session import engine


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup actions
    yield
    # Graceful shutdown: close engine connection pool
    await engine.dispose()


app = FastAPI(
    title="Plataforma de Orientación Vocacional con IA",
    description="Backend API con FastAPI, PostgreSQL, SQLAlchemy y OpenAI para orientación vocacional inteligente.",
    version="1.0.0",
    lifespan=lifespan,
)

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include v1 router
app.include_router(api_v1_router)


@app.get("/health", tags=["Salud del Sistema"])
async def health_check():
    return {
        "status": "ok",
        "service": "Vocational AI API",
        "version": "1.0.0",
    }


@app.get("/", tags=["Root"])
async def root():
    return {
        "message": "Bienvenido a la API de Orientación Vocacional con Inteligencia Artificial.",
        "docs": "/docs",
    }
