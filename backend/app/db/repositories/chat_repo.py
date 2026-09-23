from uuid import UUID
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.chat import ChatMessage


class ChatRepository:
    async def create_message(
        self, db: AsyncSession, user_id: UUID, role: str, content: str
    ) -> ChatMessage:
        msg = ChatMessage(
            user_id=user_id,
            role=role,
            content=content,
        )
        db.add(msg)
        await db.commit()
        await db.refresh(msg)
        return msg

    async def get_history_by_user_id(
        self, db: AsyncSession, user_id: UUID, limit: int = 50
    ) -> list[ChatMessage]:
        stmt = (
            select(ChatMessage)
            .where(ChatMessage.user_id == user_id)
            .order_by(ChatMessage.created_at.asc())
            .limit(limit)
        )
        result = await db.execute(stmt)
        return list(result.scalars().all())


chat_repo = ChatRepository()
