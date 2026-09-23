from fastapi import APIRouter

from app.api.v1.auth import router as auth_router
from app.api.v1.assessments import router as assessments_router
from app.api.v1.recommendations import router as recommendations_router
from app.api.v1.chat import router as chat_router

api_v1_router = APIRouter(prefix="/api/v1")

api_v1_router.include_router(auth_router, prefix="/auth", tags=["Autenticación"])
api_v1_router.include_router(assessments_router, prefix="/assessments", tags=["Cuestionarios"])
api_v1_router.include_router(recommendations_router, prefix="/recommendations", tags=["Recomendaciones"])
api_v1_router.include_router(chat_router, prefix="/chat", tags=["Chat IA"])
