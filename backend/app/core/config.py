from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field


class Settings(BaseSettings):
    database_url: str = Field(
        default="postgresql+asyncpg://vocational_user:vocational_pass@localhost:5432/vocational_ai",
        alias="DATABASE_URL",
    )
    jwt_secret_key: str = Field(
        default="vocational_secure_jwt_secret_key_2026_production_ready",
        alias="JWT_SECRET_KEY",
    )
    jwt_algorithm: str = Field(
        default="HS256",
        alias="JWT_ALGORITHM",
    )
    jwt_expire_minutes: int = Field(
        default=60,
        alias="JWT_EXPIRE_MINUTES",
    )
    openai_api_key: str | None = Field(
        default=None,
        alias="OPENAI_API_KEY",
    )

    cors_origins: list[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
    ]

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
        case_sensitive=False,
    )


settings = Settings()