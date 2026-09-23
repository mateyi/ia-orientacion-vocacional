from typing import Any
from uuid import UUID
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.repositories.assessment_repo import assessment_repo
from app.models.assessment import Assessment


class AssessmentService:
    async def create_assessment(
        self, db: AsyncSession, user_id: UUID, answers: dict[str, Any]
    ) -> Assessment:
        if not answers:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Las respuestas del cuestionario no pueden estar vacías.",
            )
        return await assessment_repo.create(db, user_id, answers)

    async def get_user_assessments(
        self, db: AsyncSession, user_id: UUID
    ) -> list[Assessment]:
        return await assessment_repo.get_by_user_id(db, user_id)

    async def get_assessment(
        self, db: AsyncSession, assessment_id: UUID, user_id: UUID
    ) -> Assessment:
        assessment = await assessment_repo.get_by_id(db, assessment_id)
        if not assessment or assessment.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Cuestionario no encontrado.",
            )
        return assessment


assessment_service = AssessmentService()
