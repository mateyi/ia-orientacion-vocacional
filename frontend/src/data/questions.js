export const ASSESSMENT_CATEGORIES = [
  { id: 'interests', name: 'Intereses y Pasiones', icon: 'Compass', count: 5 },
  { id: 'skills', name: 'Habilidades y Destrezas', icon: 'Zap', count: 5 },
  { id: 'personality', name: 'Personalidad y Estilo', icon: 'UserCheck', count: 4 },
  { id: 'academic', name: 'Preferencias Académicas', icon: 'BookOpen', count: 3 },
  { id: 'goals', name: 'Metas y Visión de Futuro', icon: 'Target', count: 3 },
];

export const VOCATIONAL_QUESTIONS = [
  // --- Categoría: Intereses (5) ---
  {
    id: 1,
    category: 'interests',
    categoryName: 'Intereses',
    question: '¿Qué actividades disfrutás más en tu tiempo libre?',
    options: [
      { id: 'a', label: 'Crear contenido digital, programar, armar dispositivos o experimentar con tecnología.', value: 'Tecnología y computación' },
      { id: 'b', label: 'Dibujar, escribir, diseñar, componer música o expresarme artísticamente.', value: 'Arte, diseño y creatividad' },
      { id: 'c', label: 'Conversar, organizar salidas, participar en voluntariados o debatir sobre temas sociales.', value: 'Área social y comunitaria' },
      { id: 'd', label: 'Investigar fenómenos naturales, leer sobre ciencia, salud o cómo funcionan las cosas.', value: 'Ciencias y biología' },
    ],
  },
  {
    id: 2,
    category: 'interests',
    categoryName: 'Intereses',
    question: '¿Qué tipo de desafíos o problemas te resulta más apasionante resolver?',
    options: [
      { id: 'a', label: 'Desafíos lógicos, cálculos matemáticos o construcción de sistemas y algoritmos.', value: 'Lógica e ingeniería' },
      { id: 'b', label: 'Problemas visuales, de comunicación, estética o experiencia del usuario.', value: 'Diseño y estética' },
      { id: 'c', label: 'Conflictos humanos, asesoramiento a personas o mediación en grupos.', value: 'Relaciones humanas y psicología' },
      { id: 'd', label: 'Optimización de finanzas, planes de negocios o creación de emprendimientos.', value: 'Negocios y finanzas' },
    ],
  },
  {
    id: 3,
    category: 'interests',
    categoryName: 'Intereses',
    question: '¿Preferís trabajar con personas, datos, objetos o ideas?',
    options: [
      { id: 'a', label: 'Con personas: escuchando, liderando, educando o brindando asistencia y salud.', value: 'Personas' },
      { id: 'b', label: 'Con datos: analizando estadísticas, números, patrones y reportes estratégicos.', value: 'Datos' },
      { id: 'c', label: 'Con objetos: máquinas, herramientas, laboratorios, construcciones físicas o prototipos.', value: 'Objetos y materiales' },
      { id: 'd', label: 'Con ideas: teorías conceptuales, arte, filosofía, historias y visiones innovadoras.', value: 'Ideas y conceptos' },
    ],
  },
  {
    id: 4,
    category: 'interests',
    categoryName: 'Intereses',
    question: '¿Qué temas de noticias o lecturas despiertan tu curiosidad inmediata?',
    options: [
      { id: 'a', label: 'Avances en inteligencia artificial, gadgets, robótica y desarrollo espacial.', value: 'Innovación tecnológica' },
      { id: 'b', label: 'Economía, startups que crecen, inversiones y tendencias del mercado global.', value: 'Economía y emprendimiento' },
      { id: 'c', label: 'Descubrimientos médicos, biotecnología, neurociencias y medio ambiente.', value: 'Salud y ecología' },
      { id: 'd', label: 'Cultura, cinematografía, arquitectura contemporánea, diseño y sociedad.', value: 'Cultura y humanidades' },
    ],
  },
  {
    id: 5,
    category: 'interests',
    categoryName: 'Intereses',
    question: '¿En qué tipo de proyectos te entusiasmaría invertir horas sin notar el paso del tiempo?',
    options: [
      { id: 'a', label: 'Desarrollando una aplicación web o automatizando tareas repetitivas en una computadora.', value: 'Desarrollo de software' },
      { id: 'b', label: 'Diseñando la identidad visual, marca o maqueta de un nuevo producto.', value: 'Diseño y branding' },
      { id: 'c', label: 'Coordinando un evento solidario, dando una clase o guiando a un compañero.', value: 'Educación y acompañamiento' },
      { id: 'd', label: 'Armando un modelo financiero o plan de crecimiento comercial para una idea.', value: 'Estrategia comercial' },
    ],
  },

  // --- Categoría: Habilidades (5) ---
  {
    id: 6,
    category: 'skills',
    categoryName: 'Habilidades',
    question: '¿En cuál de estas habilidades considerás que te destacás con mayor facilidad?',
    options: [
      { id: 'a', label: 'Pensamiento lógico-analítico y resolución de acertijos o patrones abstractos.', value: 'Lógica analítica' },
      { id: 'b', label: 'Creatividad, originalidad visual e ingenio para proponer soluciones fuera de la caja.', value: 'Creatividad' },
      { id: 'c', label: 'Facilidad de palabra, oratoria persuasiva y empatía interpersonal.', value: 'Comunicación interpersonal' },
      { id: 'd', label: 'Organización metódica, atención minuciosa al detalle y perseverancia.', value: 'Organización y detalle' },
    ],
  },
  {
    id: 7,
    category: 'skills',
    categoryName: 'Habilidades',
    question: '¿Cómo te desenvolvés al comunicar una idea compleja a otras personas?',
    options: [
      { id: 'a', label: 'Utilizo diagramas, esquemas o ejemplos interactivos concretos.', value: 'Gráfica y esquemática' },
      { id: 'b', label: 'Explico con historias analógicas, empatía y adaptándome al oyente.', value: 'Narrativa y empática' },
      { id: 'c', label: 'Apoyo cada argumento en datos exactos, métricas y fuentes verificables.', value: 'Basada en métricas y datos' },
      { id: 'd', label: 'Sintetizo en pasos claros de acción orientados a la implementación práctica.', value: 'Práctica y ejecutiva' },
    ],
  },
  {
    id: 8,
    category: 'skills',
    categoryName: 'Habilidades',
    question: '¿Cómo describís tu forma habitual de resolver problemas difíciles?',
    options: [
      { id: 'a', label: 'Descompongo el problema en partes más pequeñas y analizo la causa raíz sistemáticamente.', value: 'Descomposición analítica' },
      { id: 'b', label: 'Busco inspiración en otras áreas e invento una alternativa novedosa y disruptiva.', value: 'Pensamiento lateral' },
      { id: 'c', label: 'Hablo con personas involucradas y busco un consenso que beneficie a todos.', value: 'Resolución colaborativa' },
      { id: 'd', label: 'Consulto manuales, referencias probadas y aplico el método estandarizado más seguro.', value: 'Metodología probada' },
    ],
  },
  {
    id: 9,
    category: 'skills',
    categoryName: 'Habilidades',
    question: '¿Qué tan cómodo te sentís aprendiendo herramientas digitales o tecnologías nuevas?',
    options: [
      { id: 'a', label: 'Es natural en mí: me encanta investigar funciones avanzadas y atajos por mi cuenta.', value: 'Adopción tecnológica avanzada' },
      { id: 'b', label: 'Me adapto rápido si la herramienta me ayuda a diseñar o plasmar ideas visuales.', value: 'Herramientas creativas' },
      { id: 'c', label: 'Las utilizo con soltura como medio para comunicar y gestionar tareas con otros.', value: 'Herramientas de comunicación' },
      { id: 'd', label: 'Prefiero herramientas simples y estables; me enfoco más en el contenido que en el software.', value: 'Uso instrumental básico' },
    ],
  },
  {
    id: 10,
    category: 'skills',
    categoryName: 'Habilidades',
    question: '¿Qué rol asumís espontáneamente al realizar un trabajo en grupo?',
    options: [
      { id: 'a', label: 'El especialista técnico: resolviendo la parte más compleja del proyecto.', value: 'Especialista técnico' },
      { id: 'b', label: 'El creativo: aportando ideas originales, identidad y visión innovadora.', value: 'Generador de ideas' },
      { id: 'c', label: 'El facilitador o líder: coordinando tiempos, motivando y repartiendo tareas.', value: 'Líder y facilitador' },
      { id: 'd', label: 'El revisor: asegurando que todo cumpla los estándares de calidad con rigurosidad.', value: 'Control de calidad' },
    ],
  },

  // --- Categoría: Personalidad (4) ---
  {
    id: 11,
    category: 'personality',
    categoryName: 'Personalidad',
    question: '¿Te sentís más cómodo trabajando solo o en equipo?',
    options: [
      { id: 'a', label: 'En soledad: máxima concentración y autonomía sin interrupciones constantes.', value: 'Trabajo autónomo e individual' },
      { id: 'b', label: 'En equipo interdisciplinario: compartiendo debates, retroalimentación y sinergia.', value: 'Equipo colaborativo' },
      { id: 'c', label: 'Un balance: momentos a solas para investigar y reuniones puntuales de alineación.', value: 'Modalidad híbrida' },
      { id: 'd', label: 'En constante interacción cara a cara con clientes, pacientes o público.', value: 'Atención directa y presencial' },
    ],
  },
  {
    id: 12,
    category: 'personality',
    categoryName: 'Personalidad',
    question: '¿Cómo reaccionás en situaciones de alta presión o plazos de entrega ajustados?',
    options: [
      { id: 'a', label: 'Mantengo la calma analítica, priorizo tareas críticas y ejecuto con frialdad.', value: 'Calma y priorización metódica' },
      { id: 'b', label: 'La adrenalina estimula mi creatividad y encuentro soluciones ingeniosas de último momento.', value: 'Inspiración bajo presión' },
      { id: 'c', label: 'Busco apoyo en mis compañeros para repartir el esfuerzo y mantener la moral alta.', value: 'Apoyo mutuo en equipo' },
      { id: 'd', label: 'Prefiero planificar con suficiente antelación para minimizar la incertidumbre y el estrés.', value: 'Prevención y anticipación' },
    ],
  },
  {
    id: 13,
    category: 'personality',
    categoryName: 'Personalidad',
    question: '¿Al tomar decisiones importantes, te considerás más guiado por la lógica o por la intuición y empatía?',
    options: [
      { id: 'a', label: 'Puramente por la lógica deductiva y las evidencias concretas.', value: 'Lógica pura y evidencia' },
      { id: 'b', label: 'Por la intuición creativa y la sensación de impacto positivo.', value: 'Intuición y corazonada' },
      { id: 'c', label: 'Por la empatía y cómo afectará el bienestar de las personas involucradas.', value: 'Empatía y bienestar humano' },
      { id: 'd', label: 'Por el análisis costo-beneficio y la viabilidad económica a futuro.', value: 'Viabilidad y rentabilidad' },
    ],
  },
  {
    id: 14,
    category: 'personality',
    categoryName: 'Personalidad',
    question: '¿Preferís seguir un método probado paso a paso o inventar nuevas formas de hacer las cosas?',
    options: [
      { id: 'a', label: 'Inventar constantemente nuevos caminos, cuestionar lo establecido y experimentar.', value: 'Innovación constante' },
      { id: 'b', label: 'Seguir protocolos comprobados para garantizar seguridad, precisión y excelencia.', value: 'Protocolos y precisión' },
      { id: 'c', label: 'Partir de un marco existente pero optimizarlo y adaptarlo según la necesidad.', value: 'Optimización pragmática' },
      { id: 'd', label: 'Depende del objetivo: valoro la estabilidad en lo crítico y la audacia en lo creativo.', value: 'Equilibrio adaptativo' },
    ],
  },

  // --- Categoría: Preferencias Académicas (3) ---
  {
    id: 15,
    category: 'academic',
    categoryName: 'Académico',
    question: '¿Qué materias del colegio o estudios previos te resultaron más fáciles o interesantes?',
    options: [
      { id: 'a', label: 'Matemática, Física, Informática o Tecnología.', value: 'Exactas y tecnología' },
      { id: 'b', label: 'Literatura, Historia, Filosofía, Psicología o Sociología.', value: 'Humanidades y ciencias sociales' },
      { id: 'c', label: 'Biología, Química, Salud o Ciencias de la Tierra.', value: 'Ciencias naturales y salud' },
      { id: 'd', label: 'Economía, Administración, Contabilidad o Emprendimiento.', value: 'Ciencias económicas' },
    ],
  },
  {
    id: 16,
    category: 'academic',
    categoryName: 'Académico',
    question: '¿Qué formato de aprendizaje te resulta más efectivo y motivador?',
    options: [
      { id: 'a', label: 'Aprender haciendo: proyectos prácticos, talleres, código o simulaciones reales.', value: 'Práctico y proyectos reales' },
      { id: 'b', label: 'Lectura profunda, debates teóricos y análisis de casos de estudio.', value: 'Teórico y debate analítico' },
      { id: 'c', label: 'Laboratorios experimentales, pruebas de campo y observación científica.', value: 'Laboratorio y experimentación' },
      { id: 'd', label: 'Tutorías personalizadas, dinámicas grupales y juego de roles aplicados.', value: 'Dinámicas grupales interactivas' },
    ],
  },
  {
    id: 17,
    category: 'academic',
    categoryName: 'Académico',
    question: '¿Qué nivel de exigencia en matemáticas o lecturas analíticas preferís para tu carrera?',
    options: [
      { id: 'a', label: 'Alto en matemáticas y lógica formal: disfruto los modelos cuantitativos.', value: 'Alto en matemáticas y lógica' },
      { id: 'b', label: 'Alto en lectura, argumentación y redacción reflexiva.', value: 'Alto en comprensión lectora y humanismo' },
      { id: 'c', label: 'Equilibrado: conceptos numéricos aplicados a problemas concretos sin abstracción excesiva.', value: 'Matemática aplicada práctica' },
      { id: 'd', label: 'Mínimo en matemática pura; me apasiona el diseño visual y la comunicación directa.', value: 'Enfoque práctico/visual no matemático' },
    ],
  },

  // --- Categoría: Metas y Futuro (3) ---
  {
    id: 18,
    category: 'goals',
    categoryName: 'Metas',
    question: '¿Te imaginás trabajando más en una oficina, al aire libre, viajando o desde casa (remoto)?',
    options: [
      { id: 'a', label: 'Trabajo 100% remoto con libertad geográfica o nómada digital.', value: 'Remoto y flexible' },
      { id: 'b', label: 'En una oficina corporativa moderna, estudio de diseño o polo tecnológico.', value: 'Oficina corporativa innovadora' },
      { id: 'c', label: 'En movimiento: viajando, en contacto con la naturaleza, obras o terreno.', value: 'Campo, viajes y aire libre' },
      { id: 'd', label: 'En instituciones de salud, universidades o centros comunitarios.', value: 'Instituciones asistenciales o educativas' },
    ],
  },
  {
    id: 19,
    category: 'goals',
    categoryName: 'Metas',
    question: '¿Qué aspecto valorás más en tu futuro trabajo o carrera profesional?',
    options: [
      { id: 'a', label: 'Excelente remuneración, alta demanda global y estabilidad financiera.', value: 'Ingresos y alta demanda laboral' },
      { id: 'b', label: 'Impacto social tangible: saber que mi labor mejora la vida de las personas.', value: 'Propósito e impacto social' },
      { id: 'c', label: 'Libertad creativa, autonomía en mis decisiones y proyectos no rutinarios.', value: 'Creatividad y autonomía' },
      { id: 'd', label: 'Liderar empresas, crear mi propia compañía y alcanzar prestigio en la industria.', value: 'Liderazgo empresarial y prestigio' },
    ],
  },
  {
    id: 20,
    category: 'goals',
    categoryName: 'Metas',
    question: '¿Dónde y cómo te visualizás profesionalmente dentro de 5 a 10 años?',
    options: [
      { id: 'a', label: 'Como especialista senior en tecnología o ingeniería liderando proyectos globales.', value: 'Líder técnico o de ingeniería' },
      { id: 'b', label: 'Al frente de mi propia empresa, consultora o proyecto autogestionado.', value: 'Emprendedor y fundador' },
      { id: 'c', label: 'Ejerciendo una profesión con vocación comunitaria o de salud consolidada.', value: 'Profesional de la salud o social' },
      { id: 'd', label: 'Como director creativo, investigador o referente de opinión en mi disciplina.', value: 'Director creativo o investigador' },
    ],
  },
];
