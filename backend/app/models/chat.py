import uuid
from datetime import datetime
from typing import TYPE_CHECKING, Optional
from pydantic import BaseModel, ConfigDict
from sqlalchemy import DateTime, ForeignKey, String, Text, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

if TYPE_CHECKING:
    from app.models.user import User


class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    role: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )  # "user" or "assistant"
    content: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    # Relationships
    user: Mapped["User"] = relationship("User", back_populates="chat_messages")


# --- Pydantic Schemas ---
class ChatMessageCreate(BaseModel):
    message: str
    assessment_id: Optional[uuid.UUID] = None


class ChatMessageResponse(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    role: str
    content: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
