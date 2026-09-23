from uuid import UUID
from typing import Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user import User, UserCreate


class UserRepository:
    async def get_by_id(self, db: AsyncSession, user_id: UUID) -> Optional[User]:
        stmt = select(User).where(User.id == user_id)
        result = await db.execute(stmt)
        return result.scalar_one_or_none()

    async def get_by_email(self, db: AsyncSession, email: str) -> Optional[User]:
        stmt = select(User).where(User.email == email.lower().strip())
        result = await db.execute(stmt)
        return result.scalar_one_or_none()

    async def create(self, db: AsyncSession, user_in: UserCreate, hashed_password: str) -> User:
        user = User(
            email=user_in.email.lower().strip(),
            full_name=user_in.full_name.strip(),
            hashed_password=hashed_password,
            is_active=True,
        )
        db.add(user)
        await db.commit()
        await db.refresh(user)
        return user


user_repo = UserRepository()
