# Plataforma de Orientación Vocacional con Inteligencia Artificial (IA)

Sistema completo full-stack de orientación vocacional asistido por IA, diseñado para ayudar a estudiantes a descubrir sus carreras universitarias ideales a través de un test inteligente de 20 preguntas, ranking de compatibilidad (%) y un orientador conversacional 24/7.

---

## 🚀 Arquitectura y Tecnologías

### Backend
- **Python 3.12** & **FastAPI**: API REST asíncrona de alto rendimiento.
- **SQLAlchemy 2.0 (Async) + asyncpg**: ORM moderno para PostgreSQL con soporte asíncrono.
- **PostgreSQL 16**: Base de datos relacional con soporte nativo de UUID y JSONB.
- **Alembic**: Control de versiones y migraciones de esquemas de base de datos.
- **Seguridad**: Autenticación JWT Bearer y hasheo de contraseñas con **Passlib (Bcrypt)**.
- **OpenAI API**: Modelo `gpt-4o-mini` con prompts especializados en orientación vocacional (con fallback autónomo).

### Frontend
- **React 18** + **Vite 5**: Interfaz de usuario reactiva, ultra rápida y moderna.
- **TailwindCSS 3**: Sistema de diseño con modo oscuro, glassmorphism y paleta HSL curada.
- **Lucide React**: Iconografía moderna y consistente.
- **React Router 6**: Enrutamiento protegido por sesión (`ProtectedRoute`).
- **Axios**: Cliente HTTP con interceptor automático para inyección de token JWT.

### Infraestructura
- **Docker** & **Docker Compose**: Orquestación de contenedores para PostgreSQL, Backend y Frontend con healthchecks automáticos.

---

## 📂 Estructura del Proyecto

```
ia-orientacion-vocacional/
├── docker-compose.yml
├── README.md
├── backend/
│   ├── alembic/
│   │   ├── versions/
│   │   │   └── 0001_initial_schema.py
│   │   └── env.py
│   ├── app/
│   │   ├── api/v1/
│   │   │   ├── auth.py             # Registro, login y perfil (/me)
│   │   │   ├── assessments.py      # Cuestionarios vocacionales
│   │   │   ├── recommendations.py  # Recomendación de carreras con IA
│   │   │   └── chat.py             # Chat conversacional con IA
│   │   ├── core/
│   │   │   ├── config.py           # Variables y configuración pydantic-settings
│   │   │   └── security.py         # JWT y hasheo bcrypt
│   │   ├── db/
│   │   │   ├── base.py             # DeclarativeBase de SQLAlchemy
│   │   │   ├── session.py          # Motor asíncrono y dependencia get_db
│   │   │   └── repositories/
│   │   │       ├── user_repo.py
│   │   │       ├── assessment_repo.py
│   │   │       ├── recommendation_repo.py
│   │   │       └── chat_repo.py
│   │   ├── models/
│   │   │   ├── user.py
│   │   │   ├── assessment.py
│   │   │   ├── recommendation.py
│   │   │   └── chat.py
│   │   ├── services/
│   │   │   ├── auth_service.py
│   │   │   ├── assessment_service.py
│   │   │   └── ai_service.py
│   │   └── main.py
│   ├── alembic.ini
│   ├── requirements.txt
│   ├── Dockerfile
│   ├── .env.example
│   └── .env
└── frontend/
    ├── public/
    │   └── favicon.svg
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   ├── CareerCard.jsx
    │   │   ├── ProgressBar.jsx
    │   │   └── ChatBubble.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── data/
    │   │   └── questions.js        # 20 preguntas vocacionales en 5 categorías
    │   ├── pages/
    │   │   ├── Landing.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Assessment.jsx
    │   │   ├── Results.jsx
    │   │   ├── Chat.jsx
    │   │   └── Dashboard.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── package.json
    └── Dockerfile
```

---

## 🛠️ Ejecución con Docker Compose

Para iniciar todos los servicios (PostgreSQL, Backend y Frontend):

```bash
docker compose up --build
```

- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:8000`
- **Documentación Swagger UI**: `http://localhost:8000/docs`
- **PostgreSQL**: `localhost:5432` (Usuario: `vocational_user`, BD: `vocational_ai`)

---

## 🔑 Variables de Entorno (`backend/.env`)

```env
DATABASE_URL=postgresql+asyncpg://vocational_user:vocational_pass@localhost:5432/vocational_ai
JWT_SECRET_KEY=vocational_secure_jwt_secret_key_2026_production_ready
JWT_ALGORITHM=HS256
JWT_EXPIRE_MINUTES=60
OPENAI_API_KEY=sk-tu-api-key-aqui
```

> **Nota sobre OpenAI**: Si no se proporciona una `OPENAI_API_KEY`, el servicio de IA cuenta con un generador de respaldo inteligente y adaptativo que permite probar el flujo completo de evaluación, recomendaciones y respuestas conversacionales sin interrupciones.

---

## 📋 Endpoints de la API

| Método | Endpoint | Descripción | Requiere JWT |
|---|---|---|---|
| `GET` | `/health` | Estado del backend | No |
| `POST` | `/api/v1/auth/register` | Registro de usuario (bcrypt + JWT) | No |
| `POST` | `/api/v1/auth/login` | Inicio de sesión | No |
| `GET` | `/api/v1/auth/me` | Datos del usuario autenticado | Sí |
| `POST` | `/api/v1/assessments/` | Guardar respuestas del cuestionario | Sí |
| `GET` | `/api/v1/assessments/me` | Obtener cuestionarios del usuario | Sí |
| `POST` | `/api/v1/recommendations/` | Generar o consultar las 5 carreras sugeridas | Sí |
| `GET` | `/api/v1/recommendations/me` | Obtener recomendaciones del usuario | Sí |
| `POST` | `/api/v1/chat/` | Conversación con el orientador IA con contexto | Sí |
| `GET` | `/api/v1/chat/history` | Obtener historial de mensajes del chat | Sí |
