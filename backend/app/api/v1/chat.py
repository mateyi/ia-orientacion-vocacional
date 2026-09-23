from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import get_current_user
from app.db.repositories.assessment_repo import assessment_repo
from app.db.repositories.chat_repo import chat_repo
from app.db.session import get_db
from app.models.chat import ChatMessageCreate, ChatMessageResponse
from app.models.user import User
from app.services.ai_service import ai_service

router = APIRouter()


@router.post(
    "/",
    response_model=ChatMessageResponse,
    status_code=status.HTTP_200_OK,
    summary="Enviar un mensaje al orientador vocacional con IA",
)
async def send_chat_message(
    payload: ChatMessageCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    # 1. Fetch user assessment answers if available
    assessment_answers = None
    if payload.assessment_id:
        assessment = await assessment_repo.get_by_id(db, payload.assessment_id)
        if assessment and assessment.user_id == current_user.id:
            assessment_answers = assessment.answers
    if not assessment_answers:
        latest = await assessment_repo.get_latest_by_user_id(db, current_user.id)
        if latest:
            assessment_answers = latest.answers

    # 2. Get past messages for context
    history_records = await chat_repo.get_history_by_user_id(db, current_user.id, limit=20)
    formatted_history = [
        {"role": msg.role, "content": msg.content} for msg in history_records
    ]

    # 3. Store user message in DB
    await chat_repo.create_message(
        db=db,
        user_id=current_user.id,
        role="user",
        content=payload.message,
    )

    # 4. Generate AI response
    reply_text = await ai_service.generate_chat_response(
        assessment_answers=assessment_answers,
        chat_history=formatted_history,
        new_message=payload.message,
    )

    # 5. Store assistant message in DB
    assistant_msg = await chat_repo.create_message(
        db=db,
        user_id=current_user.id,
        role="assistant",
        content=reply_text,
    )

    return ChatMessageResponse.model_validate(assistant_msg)


@router.get(
    "/history",
    response_model=list[ChatMessageResponse],
    summary="Obtener el historial de chat del usuario",
)
async def get_chat_history(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    messages = await chat_repo.get_history_by_user_id(db, current_user.id, limit=100)
    return [ChatMessageResponse.model_validate(m) for m in messages]
