import uuid
from datetime import datetime
from typing import Any, TYPE_CHECKING
from pydantic import BaseModel, ConfigDict
from sqlalchemy import DateTime, ForeignKey, func
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

if TYPE_CHECKING:
    from app.models.user import User
    from app.models.recommendation import Recommendation


class Assessment(Base):
    __tablename__ = "assessments"

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
    answers: Mapped[dict[str, Any]] = mapped_column(
        JSONB,
        nullable=False,
    )
    completed_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    # Relationships
    user: Mapped["User"] = relationship("User", back_populates="assessments")
    recommendations: Mapped[list["Recommendation"]] = relationship(
        "Recommendation",
        back_populates="assessment",
        cascade="all, delete-orphan",
        order_by="Recommendation.compatibility_percentage.desc()",
    )


# --- Pydantic Schemas ---
class AssessmentCreate(BaseModel):
    answers: dict[str, Any]


class AssessmentResponse(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    answers: dict[str, Any]
    completed_at: datetime

    model_config = ConfigDict(from_attributes=True)
