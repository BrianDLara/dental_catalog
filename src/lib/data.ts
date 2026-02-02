// src/lib/data.ts
import type { LucideIcon } from "lucide-react";
import { Sparkles, Drill, ShieldCheck, Hammer, Smile, Trash2 } from "lucide-react";

import heroImage from "../images/clinica.png";

// resinas
import resinImage from "../images/resin.png";
import resinBeforeImage from "../images/resin_before.png";
import resinAfterImage from "../images/resin_after.png";

// coronas
import crownImage from "../images/crown.png";
import crownBeforeImage from "../images/crown_before.png";
import crownAfterImage from "../images/crown_after.png";

// endodoncia
import rootImage from "../images/root.png";
import rootBeforeImage from "../images/root_before.png";
import rootAfterImage from "../images/root_after.png";

// implantes
import implantImage from "../images/implant.png";
import implantBeforeImage from "../images/implant_before.png";
import implantAfterImage from "../images/implant_after.png";

// ortodoncia
import bracesImage from "../images/braces.png";
import bracesBeforeImage from "../images/braces_before.png";
import bracesAfterImage from "../images/braces_after.png";

// limpieza
import cleaningImage from "../images/cleaning.png";
import cleaningBeforeImage from "../images/cleaning_before.png";
import cleaningAfterImage from "../images/cleaning_after.png";

// extraccion
import extractionImage from "../images/extraction.png";
import extractionBeforeImage from "../images/extraction_before.png";
import extractionAfterImage from "../images/extraction_after.png";

export interface Step {
  title: string;
  description: string;
  image?: string;
}

export interface ProcedureFAQ {
  question: string;
  answer: string;
}

export interface ProcedureAlternative {
  title: string;
  description: string;
}

export interface ProcedureMedia {
  diagram?: string;
  videoUrl?: string;
  model3dUrl?: string;
}

export interface ProcedureSectionsEnabled {
  beforeAfter?: boolean;
  benefits?: boolean;
  steps?: boolean;
  recommendedFor?: boolean;
  notRecommendedFor?: boolean;
  results?: boolean;
  longevity?: boolean;
  afterCare?: boolean;
  faq?: boolean;
  considerations?: boolean;
  alternatives?: boolean;
  technology?: boolean;
  anesthesia?: boolean;
  recoveryTime?: boolean;
  urgency?: boolean;
  educationalMedia?: boolean;
  cta?: boolean;
}

export interface Procedure {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;

  icon: LucideIcon;
  image: string;
  beforeImage?: string;
  afterImage?: string;

  duration: string;
  painLevel: "Bajo" | "Medio" | "Alto";

  // new quick-facts
  anesthesia?: string;
  recoveryTime?: string;
  longevity?: string;

  // core content
  benefits: string[];
  steps: Step[];

  // new educational / conversion blocks
  results?: string[];
  recommendedFor?: string[];
  notRecommendedFor?: string[];
  considerations?: string[];
  afterCare?: string[];
  alternatives?: ProcedureAlternative[];
  faq?: ProcedureFAQ[];
  technology?: string[];
  educationalMedia?: ProcedureMedia;

  urgency?: {
    title: string;
    description: string;
  };

  cta?: {
    title: string;
    description?: string;
    buttonLabel: string;
    linkTo?: string;
  };

  sectionsEnabled?: ProcedureSectionsEnabled;
}

const defaultSections: ProcedureSectionsEnabled = {
  beforeAfter: true,
  benefits: true,
  steps: true,
  recommendedFor: true,
  notRecommendedFor: true,
  results: true,
  longevity: true,
  afterCare: true,
  faq: true,
  considerations: true,
  alternatives: true,
  technology: true,
  anesthesia: true,
  recoveryTime: true,
  urgency: true,
  educationalMedia: false,
  cta: true,
};

export const procedures: Procedure[] = [
  {
    id: "resinas",
    title: "Resinas dentales (Empastes)",
    shortDescription: "Reparan caries y dientes dañados de forma natural y estética.",
    fullDescription:
      "Las resinas dentales se utilizan para reparar dientes con caries, fracturas o desgaste. Son del mismo color del diente, por lo que el resultado se ve natural y casi no se nota. Además de mejorar la apariencia, ayudan a que el diente recupere su fuerza y funcione correctamente al masticar.",
    icon: Sparkles,
    image: resinImage,
    beforeImage: resinBeforeImage,
    afterImage: resinAfterImage,
    duration: "30 a 60 minutos",
    painLevel: "Bajo",

    anesthesia: "Anestesia local (en la mayoría de los casos)",
    recoveryTime: "Inmediato",
    longevity: "5 a 10 años (según hábitos y cuidado)",

    benefits: [
      "Se ven naturales y no se notan",
      "Ayudan a conservar el diente",
      "El tratamiento es rápido",
      "Generalmente se realiza en una sola cita",
      "Mejoran la función al masticar",
    ],

    results: [
      "El diente recupera forma y función",
      "Se elimina la caries y se protege la estructura dental",
      "Mejora estética al igualar el color del diente",
    ],

    recommendedFor: [
      "Caries pequeñas o medianas",
      "Fracturas leves o desgaste dental",
      "Pacientes que buscan una opción estética",
    ],

    notRecommendedFor: [
      "Caries muy profundas cercanas al nervio (puede requerir endodoncia)",
      "Dientes con destrucción extensa (puede requerir incrustación o corona)",
    ],

    considerations: [
      "Puede pigmentarse con café, vino o tabaco con el tiempo",
      "En mordidas muy fuertes puede requerir mantenimiento o reemplazo",
    ],

    afterCare: [
      "Evitar comer hasta que pase la anestesia",
      "No masticar alimentos muy duros durante las primeras 24 horas",
      "Mantener higiene dental y uso de hilo dental",
      "Asistir a revisiones periódicas",
    ],

    alternatives: [
      {
        title: "Incrustación (inlay/onlay)",
        description: "Más resistente para caries grandes, fabricada en laboratorio o CAD/CAM.",
      },
      {
        title: "Corona dental",
        description: "Indicada cuando el diente está muy debilitado o con pérdida extensa de estructura.",
      },
    ],

    technology: [
      "Resinas fotopolimerizables estéticas",
      "Lámpara LED de fotocurado",
      "Pulido de alta precisión para mejor brillo y sellado",
    ],

    urgency: {
      title: "¿Qué pasa si no se trata?",
      description:
        "La caries puede avanzar, volverse más profunda y llegar al nervio, lo que aumenta el dolor, el costo y la complejidad del tratamiento.",
    },

    faq: [
      {
        question: "¿Duele el procedimiento?",
        answer:
          "Generalmente no. Se utiliza anestesia local cuando es necesario y la molestia suele ser mínima.",
      },
      {
        question: "¿La resina se nota?",
        answer: "No. Se elige un tono similar al de tu diente para que el resultado sea natural.",
      },
      { question: "¿Cuántas citas necesito?", answer: "Normalmente una sola cita." },
      {
        question: "¿Cuánto dura una resina?",
        answer:
          "En promedio 5–10 años, dependiendo de higiene, alimentación y hábitos como rechinar los dientes.",
      },
    ],

    cta: {
      title: "¿Quieres saber si eres candidato?",
      description:
        "Agenda una valoración. Te diremos qué opción es mejor según el tamaño y profundidad de la caries.",
      buttonLabel: "Agendar valoración",
      linkTo: "/",
    },

    sectionsEnabled: { ...defaultSections },

    steps: [
      {
        title: "1. Limpieza del diente",
        description:
          "Retiramos la caries o la parte dañada del diente para dejarlo limpio y listo para el tratamiento.",
      },
      { title: "2. Preparación", description: "Preparamos el diente para que la resina se adhiera correctamente." },
      { title: "3. Colocación de la resina", description: "Aplicamos la resina del color de tu diente y le damos la forma adecuada." },
      { title: "4. Endurecimiento", description: "Usamos una luz especial para endurecer la resina en pocos segundos." },
      { title: "5. Ajuste y pulido", description: "Ajustamos la mordida y pulimos el diente para que se sienta cómodo y se vea natural." },
    ],
  },

  {
    id: "coronas",
    title: "Coronas dentales",
    shortDescription: "Protegen y refuerzan dientes muy dañados o debilitados.",
    fullDescription:
      "Una corona dental es una funda que cubre completamente el diente para protegerlo y devolverle su forma y fuerza. Se recomienda cuando un diente está muy desgastado, roto o después de una endodoncia. Además de protegerlo, la corona mejora la apariencia del diente y permite masticar con normalidad.",
    icon: ShieldCheck,
    image: crownImage,
    beforeImage: crownBeforeImage,
    afterImage: crownAfterImage,
    duration: "2 citas",
    painLevel: "Bajo",

    anesthesia: "Anestesia local",
    recoveryTime: "Inmediato (puede haber sensibilidad 1–3 días)",
    longevity: "10 a 15 años (o más con buen cuidado)",

    benefits: [
      "Protege dientes débiles o dañados",
      "Devuelve la fuerza al diente",
      "Mejora la apariencia de la sonrisa",
      "Permite masticar con mayor seguridad",
      "Tiene una larga duración",
    ],

    results: [
      "Diente más fuerte y protegido",
      "Mejora estética y forma natural",
      "Masticación más cómoda y estable",
    ],

    recommendedFor: [
      "Dientes con grandes restauraciones o fracturas",
      "Dientes con endodoncia (para protección adicional)",
      "Desgaste severo o debilitamiento",
    ],

    notRecommendedFor: [
      "Caries activa extensa sin tratamiento previo",
      "Encías muy inflamadas (primero se controla la salud gingival)",
    ],

    considerations: [
      "Puede haber sensibilidad temporal al frío/calor al inicio",
      "Requiere buena higiene para evitar caries en el borde de la corona",
    ],

    afterCare: [
      "Evitar alimentos muy duros el primer día si hay sensibilidad",
      "Cepillado e hilo dental diario, especialmente en el borde de la corona",
      "Acudir a revisiones y limpiezas periódicas",
    ],

    alternatives: [
      { title: "Incrustación", description: "Opción conservadora si el daño no cubre todo el diente." },
      { title: "Carilla", description: "Solo estética en dientes anteriores cuando no se requiere cobertura total." },
    ],

    technology: [
      "Escaneo o impresión dental para ajuste preciso",
      "Materiales estéticos (porcelana/cerámica o zirconia según el caso)",
      "Cementos de alta resistencia",
    ],

    urgency: {
      title: "¿Qué pasa si no se trata?",
      description:
        "Un diente debilitado puede fracturarse con la mordida. En algunos casos, una fractura profunda puede llevar a la necesidad de extracción.",
    },

    faq: [
      { question: "¿Se ve natural?", answer: "Sí. El color y la forma se diseñan para integrarse con tu sonrisa." },
      { question: "¿Duele?", answer: "No suele doler. Se utiliza anestesia local y el procedimiento es cómodo." },
      { question: "¿Cuántas citas requiere?", answer: "Generalmente 2 citas: preparación y colocación final." },
      { question: "¿Cuánto dura una corona?", answer: "En promedio 10–15 años, dependiendo de higiene y hábitos." },
    ],

    cta: {
      title: "¿Tu diente está debilitado o se fracturó?",
      description: "Agenda una valoración para determinar si necesitas corona o una opción más conservadora.",
      buttonLabel: "Agendar valoración",
      linkTo: "/",
    },

    sectionsEnabled: { ...defaultSections },

    steps: [
      { title: "1. Preparación del diente", description: "Ajustamos el diente para que la corona encaje correctamente y quede cómoda." },
      { title: "2. Toma de medidas", description: "Tomamos un molde o escaneo del diente para fabricar la corona a la medida exacta." },
      { title: "3. Corona provisional", description: "Colocamos una corona temporal para proteger el diente mientras se elabora la definitiva." },
      { title: "4. Colocación final", description: "En la segunda cita colocamos y fijamos la corona definitiva para que puedas usarla con normalidad." },
    ],
  },

  {
    id: "endodoncia",
    title: "Endodoncia (Tratamiento de conducto)",
    shortDescription: "Elimina la infección del diente y quita el dolor, conservando el diente natural.",
    fullDescription:
      "La endodoncia, también conocida como tratamiento de conducto, se realiza cuando el nervio del diente está infectado o muy inflamado. Este tratamiento permite eliminar la infección desde el interior del diente, aliviar el dolor y evitar que el diente tenga que ser extraído. Después del tratamiento, el diente puede seguir funcionando normalmente con la protección adecuada.",
    icon: Drill,
    image: rootImage,
    beforeImage: rootBeforeImage,
    afterImage: rootAfterImage,
    duration: "1 a 2 citas",
    painLevel: "Medio",

    anesthesia: "Anestesia local",
    recoveryTime: "24 a 48 horas de sensibilidad leve",
    longevity: "Puede durar muchos años con una buena restauración",

    benefits: [
      "Elimina el dolor causado por la infección",
      "Salva el diente natural",
      "Evita la extracción del diente",
      "Detiene la infección y evita que se propague",
      "Permite seguir masticando con normalidad",
    ],

    results: [
      "Dolor e inflamación disminuyen al eliminar la infección",
      "El diente se conserva en boca",
      "Se recupera la función con la restauración final",
    ],

    recommendedFor: [
      "Dolor intenso o sensibilidad prolongada",
      "Caries profunda cerca del nervio",
      "Absceso o infección en la raíz",
      "Trauma dental con afectación del nervio",
    ],

    notRecommendedFor: [
      "Diente con fractura vertical extensa",
      "Pérdida severa de estructura sin posibilidad de restauración",
    ],

    considerations: [
      "Puede haber sensibilidad al morder por algunos días",
      "En muchos casos se recomienda una corona para proteger el diente",
    ],

    afterCare: [
      "Evitar masticar alimentos duros del lado tratado por 24–48 horas",
      "Tomar medicamentos solo si tu dentista lo indica",
      "Acudir a la restauración final (resina/corona) para sellar el diente",
    ],

    alternatives: [
      { title: "Extracción", description: "Se considera cuando el diente no puede salvarse; puede requerir implante después." },
      { title: "Re-tratamiento o cirugía apical", description: "Opciones si hay infección persistente en casos específicos." },
    ],

    technology: [
      "Instrumentación y desinfección de conductos",
      "Sellado tridimensional para evitar reinfección",
      "Radiografías de control",
    ],

    urgency: {
      title: "¿Qué pasa si no se trata?",
      description:
        "La infección puede aumentar, formar abscesos, causar dolor severo e incluso afectar otros tejidos. En etapas avanzadas puede llevar a la pérdida del diente.",
    },

    faq: [
      { question: "¿Duele la endodoncia?", answer: "Se realiza con anestesia local. La mayoría de pacientes sienten alivio porque elimina el dolor de la infección." },
      { question: "¿Cuántas citas son?", answer: "Generalmente 1–2 citas dependiendo del caso." },
      { question: "¿Necesito corona después?", answer: "Muchas veces sí, sobre todo en molares, para proteger el diente de fracturas." },
      { question: "¿El diente queda “muerto”?", answer: "Se retira el nervio, pero el diente puede funcionar normalmente con restauración adecuada." },
    ],

    cta: {
      title: "¿Sientes dolor al masticar o sensibilidad fuerte?",
      description: "Agenda una valoración. Si hay infección, tratarla a tiempo evita complicaciones.",
      buttonLabel: "Agendar valoración",
      linkTo: "/",
    },

    sectionsEnabled: { ...defaultSections },

    steps: [
      { title: "1. Acceso al diente", description: "Abrimos el diente cuidadosamente para poder llegar al nervio y a los conductos internos." },
      { title: "2. Limpieza profunda", description: "Retiramos el nervio dañado y limpiamos el interior del diente para eliminar bacterias e infección." },
      { title: "3. Sellado del diente", description: "Rellenamos y sellamos los conductos para evitar que la infección vuelva a aparecer." },
      { title: "4. Restauración final", description: "Reconstruimos el diente para devolverle su función y, en muchos casos, colocamos una corona para protegerlo." },
    ],
  },

  {
    id: "implantes",
    title: "Implantes dentales",
    shortDescription: "Reemplazan dientes perdidos de forma segura, estética y duradera.",
    fullDescription:
      "Un implante dental es una raíz artificial hecha de titanio que se coloca en el hueso para reemplazar un diente perdido. Con el tiempo, el implante se integra al hueso y funciona como la base de un nuevo diente. Sobre el implante se coloca una corona que se ve, se siente y funciona como un diente natural, permitiendo comer y sonreír con confianza.",
    icon: Hammer,
    image: implantImage,
    beforeImage: implantBeforeImage,
    afterImage: implantAfterImage,
    duration: "3 a 6 meses",
    painLevel: "Medio",

    anesthesia: "Anestesia local (con o sin sedación según el caso)",
    recoveryTime: "3 a 7 días (inflamación leve)",
    longevity: "15+ años (con buena higiene y mantenimiento)",

    benefits: [
      "Reemplazo fijo y duradero del diente perdido",
      "Ayuda a prevenir la pérdida de hueso",
      "No requiere desgastar dientes vecinos",
      "Mejora la masticación y el habla",
      "Apariencia y sensación de diente natural",
    ],

    results: [
      "Se restaura un diente fijo con apariencia natural",
      "Mejora la mordida y la confianza al sonreír",
      "Conserva el hueso y la estructura facial",
    ],

    recommendedFor: [
      "Pacientes con uno o más dientes perdidos",
      "Quienes buscan una opción fija (no removible)",
      "Casos con hueso suficiente o con posibilidad de injerto",
    ],

    notRecommendedFor: [
      "Fumadores intensos sin control (reduce éxito)",
      "Diabetes no controlada o problemas de cicatrización (se evalúa caso a caso)",
    ],

    considerations: [
      "Requiere tiempo de integración al hueso",
      "Puede requerir injerto óseo si falta soporte",
      "Es importante el mantenimiento y limpiezas periódicas",
    ],

    afterCare: [
      "Seguir indicaciones de higiene y medicamentos si se prescriben",
      "Dieta blanda los primeros días",
      "No fumar durante la cicatrización",
      "Asistir a controles programados",
    ],

    alternatives: [
      { title: "Puente dental", description: "Opción fija, pero requiere desgastar dientes vecinos." },
      { title: "Prótesis removible", description: "Opción más accesible, pero menos estable y cómoda." },
    ],

    technology: [
      "Implantes de titanio biocompatibles",
      "Planeación radiográfica/escaneo según el caso",
      "Componentes protésicos de precisión",
    ],

    urgency: {
      title: "¿Qué pasa si no se reemplaza un diente?",
      description:
        "Los dientes vecinos pueden moverse, la mordida cambia y puede haber pérdida de hueso con el tiempo, afectando estética y función.",
    },

    faq: [
      { question: "¿El implante duele?", answer: "Se realiza con anestesia. Puede haber inflamación leve después, controlable con indicaciones." },
      { question: "¿Cuánto tarda?", answer: "Depende del caso: suele tomar 3–6 meses incluyendo integración al hueso." },
      { question: "¿Se ve natural?", answer: "Sí. La corona se diseña para parecer un diente real en color y forma." },
      { question: "¿Cuánto dura un implante?", answer: "Muchos años; con buen cuidado puede durar décadas." },
    ],

    cta: {
      title: "¿Te falta un diente?",
      description: "Agenda una valoración para evaluar si eres candidato a implante y el plan ideal para ti.",
      buttonLabel: "Agendar valoración",
      linkTo: "/",
    },

    sectionsEnabled: { ...defaultSections },

    steps: [
      { title: "1. Colocación del implante", description: "Colocamos el implante en el hueso mediante un procedimiento controlado y seguro." },
      { title: "2. Integración al hueso", description: "Esperamos el tiempo necesario para que el hueso se una firmemente al implante y le dé estabilidad." },
      { title: "3. Colocación del conector", description: "Colocamos una pequeña pieza que conecta el implante con el diente definitivo." },
      { title: "4. Colocación de la corona", description: "Fijamos el diente definitivo sobre el implante para restaurar la función y la estética." },
    ],
  },

  {
    id: "ortodoncia",
    title: "Ortodoncia",
    shortDescription: "Alinea los dientes para mejorar la sonrisa y la mordida.",
    fullDescription:
      "La ortodoncia es un tratamiento que ayuda a acomodar los dientes y mejorar la mordida. Puede realizarse con brackets tradicionales o con alineadores transparentes, según cada caso. Además de mejorar la apariencia de la sonrisa, facilita la limpieza dental y ayuda a prevenir problemas futuros como desgaste o dolor en la mandíbula.",
    icon: Smile,
    image: bracesImage,
    beforeImage: bracesBeforeImage,
    afterImage: bracesAfterImage,
    duration: "12 a 24 meses",
    painLevel: "Bajo",

    anesthesia: "No aplica",
    recoveryTime: "Ajuste inicial: 2 a 7 días de molestia leve",
    longevity: "Resultados duraderos con retención adecuada",

    benefits: [
      "Mejora la apariencia de la sonrisa",
      "Corrige la mordida y la forma de masticar",
      "Facilita la limpieza de los dientes",
      "Ayuda a prevenir desgaste y problemas dentales",
      "Resultados duraderos con el cuidado adecuado",
    ],

    results: [
      "Dientes alineados y sonrisa más armónica",
      "Mejor distribución de fuerzas al masticar",
      "Mejor higiene dental y salud de encías",
    ],

    recommendedFor: [
      "Dientes encimados o separados",
      "Mordida cruzada, abierta o profunda",
      "Problemas de alineación que afectan estética o función",
    ],

    notRecommendedFor: [
      "Enfermedad periodontal activa sin control (primero se trata)",
      "Pacientes que no puedan asistir a controles regulares (se evalúa)",
    ],

    considerations: [
      "Requiere constancia en citas y cuidados",
      "Puede haber molestias leves tras ajustes",
      "El uso de retenedores es clave para mantener resultados",
    ],

    afterCare: [
      "Higiene estricta (cepillado e hilo dental; cepillos interdentales si hay brackets)",
      "Evitar alimentos muy duros o pegajosos con brackets",
      "Asistir a ajustes programados",
      "Usar retenedores según indicación al finalizar",
    ],

    alternatives: [
      { title: "Alineadores transparentes", description: "Opción estética y removible en casos seleccionados." },
      { title: "Ortodoncia estética", description: "Brackets cerámicos o sistemas menos visibles." },
    ],

    technology: [
      "Estudio con fotografías, radiografías y escaneo según el caso",
      "Plan de movimiento dental progresivo",
      "Retención personalizada al finalizar",
    ],

    urgency: {
      title: "¿Qué pasa si no se trata?",
      description:
        "Una mala mordida puede aumentar desgaste, dificultad para limpiar, inflamación de encías y molestias en la mandíbula en algunos casos.",
    },

    faq: [
      { question: "¿Duele?", answer: "Suele haber molestia leve 2–7 días al inicio o después de ajustes." },
      { question: "¿Cuánto dura el tratamiento?", answer: "En promedio 12–24 meses, depende del caso." },
      { question: "¿Necesito retenedores?", answer: "Sí, ayudan a mantener los dientes en su nueva posición." },
      { question: "¿Puedo elegir alineadores en vez de brackets?", answer: "Depende del caso. Se determina en una valoración." },
    ],

    cta: {
      title: "¿Quieres mejorar tu sonrisa y mordida?",
      description: "Agenda una valoración para recomendarte brackets o alineadores según tu caso.",
      buttonLabel: "Agendar valoración",
      linkTo: "/",
    },

    sectionsEnabled: { ...defaultSections },

    steps: [
      { title: "1. Evaluación y estudio", description: "Realizamos estudios como radiografías, fotografías y escaneos para planificar el tratamiento." },
      { title: "2. Inicio del tratamiento", description: "Colocamos los brackets o entregamos los primeros alineadores, según el tipo de ortodoncia." },
      { title: "3. Ajustes periódicos", description: "Programamos citas de seguimiento para ir moviendo los dientes de forma gradual y segura." },
      { title: "4. Retención", description: "Al finalizar el tratamiento, indicamos el uso de retenedores para mantener los dientes alineados." },
    ],
  },

  {
    id: "limpieza",
    title: "Limpieza dental",
    shortDescription: "Mantiene dientes y encías limpios y saludables.",
    fullDescription:
      "La limpieza dental profesional elimina el sarro y la placa que no se pueden quitar solo con el cepillado diario. Este tratamiento ayuda a mantener las encías sanas, prevenir infecciones y detectar a tiempo posibles problemas dentales. Es recomendable realizarla de forma periódica para conservar una buena salud bucal.",
    icon: Sparkles,
    image: cleaningImage,
    beforeImage: cleaningBeforeImage,
    afterImage: cleaningAfterImage,
    duration: "30 a 45 minutos",
    painLevel: "Bajo",

    anesthesia: "No aplica (en casos de sensibilidad se puede usar anestesia tópica)",
    recoveryTime: "Inmediato",
    longevity: "Recomendado cada 6 meses (según riesgo)",

    benefits: [
      "Ayuda a prevenir enfermedades de las encías",
      "Reduce y elimina el mal aliento",
      "Deja los dientes más limpios y brillantes",
      "Permite detectar problemas dentales a tiempo",
      "Contribuye a una mejor salud bucal",
    ],

    results: [
      "Menos sarro y placa acumulada",
      "Encías más sanas y menos inflamación",
      "Sensación de limpieza y frescura",
    ],

    recommendedFor: [
      "Personas que buscan prevención y mantenimiento",
      "Pacientes con sangrado de encías leve",
      "Antes de tratamientos estéticos o restaurativos",
    ],

    notRecommendedFor: [
      "No suele tener contraindicaciones; si hay periodontitis puede requerir limpieza profunda (se evalúa).",
    ],

    considerations: [
      "Puede haber sensibilidad leve al frío por 24 horas",
      "Si hay sarro profundo puede requerir limpieza profunda (profilaxis + raspado)",
    ],

    afterCare: [
      "Evitar alimentos y bebidas muy pigmentantes por unas horas (café, vino) si se pulió intensamente",
      "Mantener cepillado e hilo dental diario",
      "Programar limpiezas periódicas según recomendación",
    ],

    alternatives: [
      { title: "Limpieza profunda (raspado y alisado)", description: "Indicada cuando hay enfermedad periodontal." },
      { title: "Mantenimiento periodontal", description: "Seguimiento para casos con periodontitis controlada." },
    ],

    technology: [
      "Ultrasonido para desprender sarro",
      "Pulido para eliminar manchas superficiales",
      "Flúor opcional según riesgo de caries",
    ],

    urgency: {
      title: "¿Qué pasa si no se hace limpieza?",
      description:
        "La placa y el sarro pueden provocar gingivitis, mal aliento y, con el tiempo, enfermedad periodontal con pérdida de hueso.",
    },

    faq: [
      { question: "¿Duele la limpieza?", answer: "Normalmente no. Puede haber molestia leve si hay mucha sensibilidad o inflamación." },
      { question: "¿Cada cuánto debo hacerla?", answer: "Usualmente cada 6 meses; algunas personas requieren 3–4 meses." },
      { question: "¿El flúor es obligatorio?", answer: "No. Es opcional y se recomienda según riesgo de caries." },
      { question: "¿Blanquea los dientes?", answer: "El pulido puede remover manchas, pero no sustituye un blanqueamiento." },
    ],

    cta: {
      title: "Cuida tus encías y tu sonrisa",
      description: "Agenda tu limpieza y mantén tu salud bucal al día.",
      buttonLabel: "Agendar limpieza",
      linkTo: "/",
    },

    sectionsEnabled: { ...defaultSections },

    steps: [
      { title: "1. Limpieza con ultrasonido", description: "Utilizamos un equipo especial que desprende el sarro acumulado de forma segura y eficaz." },
      { title: "2. Pulido dental", description: "Pulimos los dientes para eliminar manchas superficiales y dejar la superficie más lisa." },
      { title: "3. Aplicación de flúor (opcional)", description: "Aplicamos flúor para ayudar a fortalecer el esmalte y proteger los dientes." },
    ],
  },

  {
    id: "extraccion",
    title: "Extracción dental",
    shortDescription: "Retiro seguro de dientes muy dañados o muelas del juicio.",
    fullDescription:
      "La extracción dental se realiza cuando un diente está muy dañado, infectado o no puede salvarse con otros tratamientos. También es común en el caso de las muelas del juicio, cuando no tienen espacio para salir correctamente. El procedimiento es controlado, seguro y se realiza con anestesia para evitar dolor.",
    icon: Trash2,
    image: extractionImage,
    beforeImage: extractionBeforeImage,
    afterImage: extractionAfterImage,
    duration: "20 a 40 minutos",
    painLevel: "Bajo",

    anesthesia: "Anestesia local",
    recoveryTime: "3 a 7 días (según complejidad)",
    longevity: "Cicatrización completa: 2 a 4 semanas (aprox.)",

    benefits: [
      "Elimina la infección y el dolor",
      "Previene problemas mayores en dientes vecinos",
      "Mejora la salud bucal",
      "Permite continuar con otros tratamientos como implantes u ortodoncia",
    ],

    results: [
      "Se elimina el foco de infección o dolor",
      "Mejora la salud de encías y tejidos cercanos",
      "Prepara el área para tratamientos posteriores si aplica",
    ],

    recommendedFor: [
      "Dientes no restaurables por caries o fractura",
      "Infección severa sin posibilidad de salvar el diente",
      "Muelas del juicio sin espacio o con dolor recurrente",
    ],

    notRecommendedFor: [
      "Casos donde el diente puede salvarse con endodoncia/restauración (se evalúa)",
      "Pacientes con ciertas condiciones médicas sin control (se revisa historial)",
    ],

    considerations: [
      "Es normal inflamación leve y molestia algunos días",
      "Riesgo de “alveolitis seca” si no se siguen indicaciones",
      "Puede requerir reemplazo (implante/puente) para evitar movimiento de dientes vecinos",
    ],

    afterCare: [
      "Morder la gasa 30–60 minutos para controlar sangrado",
      "No escupir, no usar popote, no fumar por 48–72 horas",
      "Aplicar frío externo las primeras 24 horas si se indica",
      "Dieta blanda y buena hidratación",
      "Mantener higiene, evitando cepillar directamente la zona las primeras 24 horas",
    ],

    alternatives: [
      { title: "Endodoncia + corona", description: "Si el diente aún es recuperable, se prioriza conservarlo." },
      { title: "Extracción quirúrgica", description: "Opción cuando el diente está retenido o fracturado (muelas del juicio)." },
    ],

    technology: [
      "Anestesia local para procedimiento cómodo",
      "Técnicas atraumáticas para proteger hueso y tejido",
      "Indicaciones postoperatorias para mejor cicatrización",
    ],

    urgency: {
      title: "¿Qué pasa si no se extrae un diente indicado?",
      description:
        "La infección puede extenderse, aumentar dolor e inflamación, y afectar dientes vecinos o tejidos cercanos.",
    },

    faq: [
      { question: "¿Duele la extracción?", answer: "No durante el procedimiento porque se usa anestesia. Después puede haber molestia controlable con indicaciones." },
      { question: "¿Cuánto tarda en sanar?", answer: "Generalmente 3–7 días para sentirte mejor, y 2–4 semanas para cicatrización más completa." },
      { question: "¿Puedo trabajar al día siguiente?", answer: "Depende de la complejidad. En muchas extracciones simples, sí; en quirúrgicas puede requerir 1–2 días." },
      { question: "¿Qué debo evitar?", answer: "Popote, fumar, ejercicio intenso y alimentos duros los primeros días." },
    ],

    cta: {
      title: "¿Tienes dolor o muela del juicio inflamada?",
      description: "Agenda una valoración para revisar la causa y elegir el tratamiento más seguro.",
      buttonLabel: "Agendar valoración",
      linkTo: "/",
    },

    sectionsEnabled: { ...defaultSections },

    steps: [
      { title: "1. Anestesia", description: "Aplicamos anestesia local para que la zona quede completamente adormecida y el procedimiento sea cómodo." },
      { title: "2. Retiro del diente", description: "Extraemos el diente con cuidado, procurando proteger el hueso y los tejidos cercanos." },
      { title: "3. Recuperación y cuidados", description: "Colocamos una gasa y te explicamos los cuidados necesarios para una buena cicatrización." },
    ],
  },
];

export { heroImage };
