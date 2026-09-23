from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import create_access_token, get_password_hash, verify_password
from app.db.repositories.user_repo import user_repo
from app.models.user import TokenResponse, User, UserCreate, UserLogin, UserResponse


class AuthService:
    async def register(self, db: AsyncSession, user_in: UserCreate) -> TokenResponse:
        existing_user = await user_repo.get_by_email(db, user_in.email)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="El correo electrónico ya se encuentra registrado.",
            )

        hashed_password = get_password_hash(user_in.password)
        new_user = await user_repo.create(db, user_in, hashed_password)

        token = create_access_token(subject=str(new_user.id))
        return TokenResponse(
            access_token=token,
            token_type="bearer",
            user=UserResponse.model_validate(new_user),
        )

    async def login(self, db: AsyncSession, login_in: UserLogin) -> TokenResponse:
        user = await user_repo.get_by_email(db, login_in.email)
        if not user or not verify_password(login_in.password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Correo electrónico o contraseña incorrectos.",
                headers={"WWW-Authenticate": "Bearer"},
            )

        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Usuario inactivo en el sistema.",
            )

        token = create_access_token(subject=str(user.id))
        return TokenResponse(
            access_token=token,
            token_type="bearer",
            user=UserResponse.model_validate(user),
        )


auth_service = AuthService()
