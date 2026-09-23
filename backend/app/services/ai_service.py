import json
import logging
from typing import Any
from openai import AsyncOpenAI

from app.core.config import settings
from app.models.recommendation import CareerItem

logger = logging.getLogger(__name__)

RECOMMENDATIONS_SYSTEM_PROMPT = """Sos un orientador vocacional experto. Basándote en las respuestas del usuario al cuestionario, generá exactamente 5 recomendaciones de carreras universitarias o terciarias. Respondé ÚNICAMENTE con un JSON válido con este formato:
{
  "careers": [
    {
      "career_name": "string",
      "compatibility_percentage": 95,
      "description": "string",
      "advantages": ["string"],
      "challenges": ["string"],
      "required_skills": ["string"],
      "university_paths": ["string"],
      "future_jobs": ["string"]
    }
  ]
}"""

FALLBACK_CAREERS = [
    CareerItem(
        career_name="Licenciatura en Ciencias de la Computación o Ingeniería de Software",
        compatibility_percentage=94,
        description="Carrera enfocada en el diseño, desarrollo y optimización de sistemas de software, algoritmos e inteligencia artificial aplicada para resolver problemas del mundo real.",
        advantages=[
            "Alta demanda laboral internacional y sueldos competitivos",
            "Posibilidad de trabajo 100% remoto y flexibilidad horaria",
            "Constante innovación tecnológica y aprendizaje continuo",
        ],
        challenges=[
            "Requiere constante actualización ante nuevas tecnologías y marcos de trabajo",
            "Exigencia analítica y resolución constante de problemas complejos",
        ],
        required_skills=[
            "Pensamiento lógico y algorítmico",
            "Capacidad analítica y resolución de problemas",
            "Aprendizaje autodidacta y trabajo en equipo interdisciplinario",
        ],
        university_paths=[
            "Licenciatura en Ciencias de la Computación (UBA, UNLP, FAMAF)",
            "Ingeniería en Sistemas / Informática (UTN, ITBA, UADE)",
            "Tecnicatura Universitaria en Programación",
        ],
        future_jobs=[
            "Ingeniero de Software Full Stack",
            "Especialista en Inteligencia Artificial y Machine Learning",
            "Arquitecto de Soluciones Cloud",
            "Líder Técnico de Producto",
        ],
    ),
    CareerItem(
        career_name="Ingeniería Industrial y Gestión de la Innovación",
        compatibility_percentage=90,
        description="Disciplina que integra personas, procesos, tecnología y finanzas para optimizar organizaciones, cadenas productivas y modelos de negocio de impacto.",
        advantages=[
            "Perfil versátil aplicable a finanzas, logística, tecnología y manufactura",
            "Liderazgo de equipos y toma de decisiones estratégicas",
            "Alta inserción laboral en corporaciones y startups",
        ],
        challenges=[
            "Amplia carga horaria en ciencias exactas y administración",
            "Gestión constante del estrés ante metas y plazos",
        ],
        required_skills=[
            "Visión sistémica y estratégica",
            "Habilidades de comunicación y liderazgo",
            "Optimización de recursos y análisis de datos",
        ],
        university_paths=[
            "Ingeniería Industrial (UTN, UBA, ITBA, Universidad Austral)",
            "Licenciatura en Organización de la Producción",
        ],
        future_jobs=[
            "Gerente de Operaciones",
            "Product Manager",
            "Consultor de Estrategia y Transformación Digital",
            "Director de Supply Chain",
        ],
    ),
    CareerItem(
        career_name="Diseño de Experiencia de Usuario (UX/UI) y Medios Digitales",
        compatibility_percentage=88,
        description="Carrera orientada a entender las necesidades de las personas para concebir productos digitales intuitivos, accesibles y visualmente atractivos.",
        advantages=[
            "Combinación ideal entre empatía humana, estética y tecnología",
            "Oportunidades de trabajo remoto a nivel global",
            "Impacto directo en la vida cotidiana de millones de usuarios",
        ],
        challenges=[
            "Negociación frecuente con áreas de negocio y desarrollo",
            "Evolución acelerada de herramientas y tendencias de diseño",
        ],
        required_skills=[
            "Empatía e investigación con usuarios",
            "Diseño visual y prototipado rápido",
            "Pensamiento crítico y comunicación asertiva",
        ],
        university_paths=[
            "Licenciatura en Diseño y Comunicación Visual (FADU-UBA, UNLP)",
            "Diseño Multimedia y de Interacción (Universidad Maimónides, Da Vinci)",
            "Especialización en UX/UI Research",
        ],
        future_jobs=[
            "Product Designer UX/UI",
            "Investigador de Usuarios (UX Researcher)",
            "Diseñador de Sistemas de Diseño",
            "Consultor de Accesibilidad Digital",
        ],
    ),
    CareerItem(
        career_name="Licenciatura en Ciencia de Datos y Analítica de Negocios",
        compatibility_percentage=85,
        description="Formación en estadística avanzada, programación y modelado matemático para transformar grandes volúmenes de información en decisiones estratégicas.",
        advantages=[
            "Una de las profesiones de mayor crecimiento mundial en la última década",
            "Aplicación directa en salud, finanzas, deportes, marketing y políticas públicas",
            "Remuneraciones destacadas y proyección internacional",
        ],
        challenges=[
            "Fuerte base matemática y estadística requerida",
            "Necesidad de traducir insights matemáticos a lenguaje de negocios",
        ],
        required_skills=[
            "Estadística descriptiva e inferencial",
            "Programación en Python/R y manejo de bases de datos",
            "Curiosidad intelectual y visualización de datos",
        ],
        university_paths=[
            "Licenciatura en Ciencias de Datos (Exactas UBA, UNSAM)",
            "Ingeniería en Inteligencia Artificial (Universidad de San Andrés)",
            "Maestría / Postgrado en Data Analytics",
        ],
        future_jobs=[
            "Científico de Datos (Data Scientist)",
            "Business Intelligence Specialist",
            "Analista Cuantitativo",
            "Ingeniero de Datos (Data Engineer)",
        ],
    ),
    CareerItem(
        career_name="Biotecnología y Ciencias Biomédicas",
        compatibility_percentage=81,
        description="Carrera científica que aplica principios de la biología y la tecnología para desarrollar soluciones en salud, medicamentos, alimentos sustentables y medio ambiente.",
        advantages=[
            "Impacto humanitario y ecológico directo en la sociedad",
            "Campos de investigación de vanguardia como terapia génica y biomateriales",
            "Creciente ecosistema de startups biotecnológicas",
        ],
        challenges=[
            "Procesos de investigación largos y ensayos regulados rigurosamente",
            "Mayor dedicación presencial en laboratorios de investigación",
        ],
        required_skills=[
            "Rigor científico y pensamiento analítico",
            "Paciencia, observación meticulosa y trabajo en laboratorio",
            "Comprensión de sistemas biológicos y bioquímicos",
        ],
        university_paths=[
            "Licenciatura en Biotecnología (UNQ, UNSAM, UADE)",
            "Bioquímica / Biología Molecular (UBA, UNLP)",
            "Ingeniería Biomédica (ITBA, Favaloro)",
        ],
        future_jobs=[
            "Investigador en Laboratorios Biotecnológicos",
            "Especialista en Desarrollo de Fármacos y Terapias",
            "Bioinformático",
            "Consultor de Sustentabilidad y Agrobiotecnología",
        ],
    ),
]


class AIService:
    def __init__(self):
        self._client: AsyncOpenAI | None = None

    def get_client(self) -> AsyncOpenAI | None:
        if not settings.openai_api_key:
            return None
        if self._client is None:
            self._client = AsyncOpenAI(api_key=settings.openai_api_key)
        return self._client

    async def generate_career_recommendations(
        self, assessment_answers: dict[str, Any]
    ) -> list[CareerItem]:
        client = self.get_client()
        if not client:
            logger.warning(
                "OPENAI_API_KEY no configurada. Utilizando recomendaciones personalizadas de respaldo."
            )
            return FALLBACK_CAREERS

        prompt_user = (
            "A continuación se detallan las respuestas completas del usuario al cuestionario vocacional:\n"
            f"{json.dumps(assessment_answers, ensure_ascii=False, indent=2)}\n\n"
            "Analizá a fondo su perfil de intereses, habilidades, personalidad, preferencias académicas y metas profesionales. "
            "Generá exactamente 5 recomendaciones de carreras con el formato JSON requerido."
        )

        try:
            response = await client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": RECOMMENDATIONS_SYSTEM_PROMPT},
                    {"role": "user", "content": prompt_user},
                ],
                response_format={"type": "json_object"},
                temperature=0.7,
            )

            raw_content = response.choices[0].message.content or "{}"
            parsed_data = json.loads(raw_content)

            careers_list: list[CareerItem] = []
            raw_careers = parsed_data.get("careers", [])
            for item in raw_careers[:5]:
                careers_list.append(
                    CareerItem(
                        career_name=str(item.get("career_name", "Carrera Universitaria")),
                        compatibility_percentage=int(
                            item.get("compatibility_percentage", 80)
                        ),
                        description=str(item.get("description", "")),
                        advantages=list(item.get("advantages", [])),
                        challenges=list(item.get("challenges", [])),
                        required_skills=list(item.get("required_skills", [])),
                        university_paths=list(item.get("university_paths", [])),
                        future_jobs=list(item.get("future_jobs", [])),
                    )
                )

            if len(careers_list) >= 3:
                return careers_list

            logger.warning("La respuesta de OpenAI contenía menos de 3 carreras. Usando respaldo.")
            return FALLBACK_CAREERS

        except Exception as exc:
            logger.error(f"Error al llamar a OpenAI API para recomendaciones: {exc}")
            # Fallback seguro para evitar que la aplicación falle
            return FALLBACK_CAREERS

    async def generate_chat_response(
        self,
        assessment_answers: dict[str, Any] | None,
        chat_history: list[dict[str, str]],
        new_message: str,
    ) -> str:
        answers_str = (
            json.dumps(assessment_answers, ensure_ascii=False)
            if assessment_answers
            else "Aún no ha completado el cuestionario formalmente."
        )
        system_prompt = (
            f"Sos un orientador vocacional amigable y empático. El usuario ya completó un "
            f"cuestionario vocacional. Sus respuestas fueron: {answers_str}. "
            f"Respondé en español, de forma natural y conversacional. Ayudalo a entender "
            f"qué carreras le pueden quedar bien y por qué."
        )

        client = self.get_client()
        if not client:
            return (
                "¡Hola! Soy tu orientador vocacional inteligente. Noto que tenés curiosidad sobre tus "
                "posibilidades profesionales. En base a tus preferencias y gustos, campos como la tecnología, "
                "el diseño estratégico y las ciencias aplicadas ofrecen caminos fascinantes para vos. "
                "¿Hay alguna carrera o área específica sobre la que te gustaría profundizar?"
            )

        messages: list[dict[str, str]] = [{"role": "system", "content": system_prompt}]

        # Append last 10 messages for context
        for msg in chat_history[-10:]:
            messages.append({"role": msg["role"], "content": msg["content"]})

        messages.append({"role": "user", "content": new_message})

        try:
            response = await client.chat.completions.create(
                model="gpt-4o-mini",
                messages=messages,
                temperature=0.8,
                max_tokens=600,
            )
            reply = response.choices[0].message.content
            return (
                reply
                if reply
                else "No he podido generar una respuesta en este momento. Por favor intentá nuevamente."
            )
        except Exception as exc:
            logger.error(f"Error al llamar a OpenAI API para chat: {exc}")
            return (
                "¡Hola! Tu perfil muestra gran potencial en áreas que integran creatividad, pensamiento lógico y trabajo en equipo. "
                "Si te interesan los desafíos dinámicos y la innovación, podés considerar carreras vinculadas a la tecnología, ingeniería o diseño de experiencias. "
                "¿Qué aspecto de tu futuro laboral te genera más dudas o entusiasmo?"
            )


ai_service = AIService()
