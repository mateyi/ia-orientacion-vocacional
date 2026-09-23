import uuid
from datetime import datetime
from typing import Any, TYPE_CHECKING
from pydantic import BaseModel, ConfigDict, Field
from sqlalchemy import DateTime, ForeignKey, Integer, String, func
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

if TYPE_CHECKING:
    from app.models.assessment import Assessment


class Recommendation(Base):
    __tablename__ = "recommendations"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )
    assessment_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("assessments.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    career_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )
    compatibility_percentage: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )
    data: Mapped[dict[str, Any]] = mapped_column(
        JSONB,
        nullable=False,
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    # Relationships
    assessment: Mapped["Assessment"] = relationship(
        "Assessment",
        back_populates="recommendations",
    )


# --- Pydantic Schemas ---
class CareerItem(BaseModel):
    career_name: str
    compatibility_percentage: int = Field(..., ge=0, le=100)
    description: str
    advantages: list[str] = []
    challenges: list[str] = []
    required_skills: list[str] = []
    university_paths: list[str] = []
    future_jobs: list[str] = []


class RecommendationCreateRequest(BaseModel):
    assessment_id: uuid.UUID


class RecommendationResponse(BaseModel):
    id: uuid.UUID
    assessment_id: uuid.UUID
    career_name: str
    compatibility_percentage: int
    data: dict[str, Any]
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class RecommendationBatchResponse(BaseModel):
    assessment_id: uuid.UUID
    careers: list[CareerItem]
