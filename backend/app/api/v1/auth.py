from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import get_current_user
from app.db.session import get_db
from app.models.user import TokenResponse, User, UserCreate, UserLogin, UserResponse
from app.services.auth_service import auth_service

router = APIRouter()


@router.post(
    "/register",
    response_model=TokenResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Registrar un nuevo usuario",
)
async def register(
    user_in: UserCreate,
    db: AsyncSession = Depends(get_db),
):
    return await auth_service.register(db, user_in)


@router.post(
    "/login",
    response_model=TokenResponse,
    summary="Iniciar sesión y obtener token JWT",
)
async def login(
    login_in: UserLogin,
    db: AsyncSession = Depends(get_db),
):
    return await auth_service.login(db, login_in)


@router.get(
    "/me",
    response_model=UserResponse,
    summary="Obtener perfil del usuario autenticado",
)
async def get_me(
    current_user: User = Depends(get_current_user),
):
    return UserResponse.model_validate(current_user)
