from uuid import UUID
from typing import Any, Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.assessment import Assessment


class AssessmentRepository:
    async def create(
        self, db: AsyncSession, user_id: UUID, answers: dict[str, Any]
    ) -> Assessment:
        assessment = Assessment(
            user_id=user_id,
            answers=answers,
        )
        db.add(assessment)
        await db.commit()
        await db.refresh(assessment)
        return assessment

    async def get_by_id(
        self, db: AsyncSession, assessment_id: UUID
    ) -> Optional[Assessment]:
        stmt = select(Assessment).where(Assessment.id == assessment_id)
        result = await db.execute(stmt)
        return result.scalar_one_or_none()

    async def get_by_user_id(
        self, db: AsyncSession, user_id: UUID
    ) -> list[Assessment]:
        stmt = (
            select(Assessment)
            .where(Assessment.user_id == user_id)
            .order_by(Assessment.completed_at.desc())
        )
        result = await db.execute(stmt)
        return list(result.scalars().all())

    async def get_latest_by_user_id(
        self, db: AsyncSession, user_id: UUID
    ) -> Optional[Assessment]:
        stmt = (
            select(Assessment)
            .where(Assessment.user_id == user_id)
            .order_by(Assessment.completed_at.desc())
            .limit(1)
        )
        result = await db.execute(stmt)
        return result.scalar_one_or_none()


assessment_repo = AssessmentRepository()
