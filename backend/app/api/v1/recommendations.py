from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import get_current_user
from app.db.repositories.assessment_repo import assessment_repo
from app.db.repositories.recommendation_repo import recommendation_repo
from app.db.session import get_db
from app.models.recommendation import (
    CareerItem,
    RecommendationBatchResponse,
    RecommendationCreateRequest,
    RecommendationResponse,
)
from app.models.user import User
from app.services.ai_service import ai_service

router = APIRouter()


@router.post(
    "/",
    response_model=RecommendationBatchResponse,
    status_code=status.HTTP_200_OK,
    summary="Generar o consultar recomendaciones de carreras basadas en un cuestionario",
)
async def generate_recommendations(
    payload: RecommendationCreateRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    assessment = await assessment_repo.get_by_id(db, payload.assessment_id)
    if not assessment or assessment.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cuestionario no encontrado para el usuario actual.",
        )

    # Check if recommendations were already generated for this assessment
    existing_recs = await recommendation_repo.get_by_assessment_id(
        db, payload.assessment_id
    )
    if existing_recs:
        careers = [
            CareerItem(
                career_name=r.career_name,
                compatibility_percentage=r.compatibility_percentage,
                description=r.data.get("description", ""),
                advantages=r.data.get("advantages", []),
                challenges=r.data.get("challenges", []),
                required_skills=r.data.get("required_skills", []),
                university_paths=r.data.get("university_paths", []),
                future_jobs=r.data.get("future_jobs", []),
            )
            for r in existing_recs
        ]
        return RecommendationBatchResponse(
            assessment_id=payload.assessment_id,
            careers=careers,
        )

    # Generate new recommendations with AI service
    careers = await ai_service.generate_career_recommendations(assessment.answers)

    # Store them in DB
    await recommendation_repo.create_batch(
        db=db,
        assessment_id=payload.assessment_id,
        careers=careers,
    )

    return RecommendationBatchResponse(
        assessment_id=payload.assessment_id,
        careers=careers,
    )


@router.get(
    "/me",
    response_model=list[RecommendationResponse],
    summary="Obtener todas las recomendaciones guardadas del usuario",
)
async def get_my_recommendations(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    recs = await recommendation_repo.get_by_user_id(db, current_user.id)
    return [RecommendationResponse.model_validate(r) for r in recs]
