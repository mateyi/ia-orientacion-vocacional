from uuid import UUID
from typing import Any
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.assessment import Assessment
from app.models.recommendation import Recommendation, CareerItem


class RecommendationRepository:
    async def create_batch(
        self, db: AsyncSession, assessment_id: UUID, careers: list[CareerItem]
    ) -> list[Recommendation]:
        created_records = []
        for career in careers:
            data_dict = {
                "description": career.description,
                "advantages": career.advantages,
                "challenges": career.challenges,
                "required_skills": career.required_skills,
                "university_paths": career.university_paths,
                "future_jobs": career.future_jobs,
            }
            rec = Recommendation(
                assessment_id=assessment_id,
                career_name=career.career_name,
                compatibility_percentage=career.compatibility_percentage,
                data=data_dict,
            )
            db.add(rec)
            created_records.append(rec)

        await db.commit()
        for rec in created_records:
            await db.refresh(rec)
        return created_records

    async def get_by_assessment_id(
        self, db: AsyncSession, assessment_id: UUID
    ) -> list[Recommendation]:
        stmt = (
            select(Recommendation)
            .where(Recommendation.assessment_id == assessment_id)
            .order_by(Recommendation.compatibility_percentage.desc())
        )
        result = await db.execute(stmt)
        return list(result.scalars().all())

    async def get_by_user_id(
        self, db: AsyncSession, user_id: UUID
    ) -> list[Recommendation]:
        stmt = (
            select(Recommendation)
            .join(Assessment, Recommendation.assessment_id == Assessment.id)
            .where(Assessment.user_id == user_id)
            .order_by(Recommendation.created_at.desc())
        )
        result = await db.execute(stmt)
        return list(result.scalars().all())


recommendation_repo = RecommendationRepository()
