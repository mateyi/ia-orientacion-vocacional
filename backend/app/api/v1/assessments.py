from uuid import UUID
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import get_current_user
from app.db.session import get_db
from app.models.assessment import AssessmentCreate, AssessmentResponse
from app.models.user import User
from app.services.assessment_service import assessment_service

router = APIRouter()


@router.post(
    "/",
    response_model=AssessmentResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Guardar respuestas del cuestionario vocacional",
)
async def create_assessment(
    assessment_in: AssessmentCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    assessment = await assessment_service.create_assessment(
        db=db,
        user_id=current_user.id,
        answers=assessment_in.answers,
    )
    return AssessmentResponse.model_validate(assessment)


@router.get(
    "/me",
    response_model=list[AssessmentResponse],
    summary="Obtener todos los cuestionarios completados por el usuario actual",
)
async def get_my_assessments(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    assessments = await assessment_service.get_user_assessments(
        db=db,
        user_id=current_user.id,
    )
    return [AssessmentResponse.model_validate(a) for a in assessments]


@router.get(
    "/{assessment_id}",
    response_model=AssessmentResponse,
    summary="Obtener un cuestionario específico por ID",
)
async def get_assessment(
    assessment_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    assessment = await assessment_service.get_assessment(
        db=db,
        assessment_id=assessment_id,
        user_id=current_user.id,
    )
    return AssessmentResponse.model_validate(assessment)
