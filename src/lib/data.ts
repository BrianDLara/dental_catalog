import type { LucideIcon } from "lucide-react";
import { Sparkles, Drill, ShieldCheck, Hammer, Smile, Trash2 } from "lucide-react";

import heroImage from "../images/clinica.png";

//resin images
import resinImage from "../images/resin.png";
import resinBeforeImage from "../images/resin_before.png";
import resinAfterImage from "../images/resin_after.png";

//crown images
import crownImage from "../images/crown.png";
import crownBeforeImage from "../images/crown_before.png";
import crownAfterImage from "../images/crown_after.png";


//root-canal
import rootImage from "../images/root.png";
import rootBeforeImage from "../images/root_before.png";
import rootAfterImage from "../images/root_after.png";

//implants
import implantImage from "../images/implant.png";
import implantBeforeImage from "../images/implant_before.png";
import implantAfterImage from "../images/implant_after.png";

//braces
import bracesImage from "../images/braces.png";
import bracesBeforeImage from "../images/braces_before.png";
import bracesAfterImage from "../images/braces_after.png";

//cleaning
import cleaningImage from "../images/cleaning.png";
import cleaningBeforeImage from "../images/cleaning_before.png";
import cleaningAfterImage from "../images/cleaning_after.png";

//cleaning
import extractionImage from "../images/extraction.png";
import extractionBeforeImage from "../images/extraction_before.png";
import extractionAfterImage from "../images/extraction_after.png";


export interface Step {
  title: string;
  description: string;
  image?: string;
}

export interface Procedure {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: LucideIcon;
  image: string;
  steps: Step[];
  beforeImage?: string;
  afterImage?: string;
  benefits: string[];
  duration: string;
  painLevel: "Bajo" | "Medio" | "Alto";
}

export const procedures: Procedure[] = [
  {
  id: "resinas",
  title: "Resinas dentales (Empastes)",
  shortDescription: "Reparan caries y dientes dañados de forma natural y estética.",
  fullDescription: "Las resinas dentales se utilizan para reparar dientes con caries, fracturas o desgaste. Son del mismo color del diente, por lo que el resultado se ve natural y casi no se nota. Además de mejorar la apariencia, ayudan a que el diente recupere su fuerza y funcione correctamente al masticar.",
  icon: Sparkles,
  image: resinImage,
  beforeImage: resinBeforeImage,
  afterImage: resinAfterImage,
  duration: "30 a 60 minutos",
  painLevel: "Bajo",
  benefits: [
    "Se ven naturales y no se notan",
    "Ayudan a conservar el diente",
    "El tratamiento es rápido",
    "Generalmente se realiza en una sola cita",
    "Mejoran la función al masticar"
  ],
  steps: [
    {
      title: "1. Limpieza del diente",
      description: "Retiramos la caries o la parte dañada del diente para dejarlo limpio y listo para el tratamiento.",
    },
    {
      title: "2. Preparación",
      description: "Preparamos el diente para que la resina se adhiera correctamente.",
    },
    {
      title: "3. Colocación de la resina",
      description: "Aplicamos la resina del color de tu diente y le damos la forma adecuada.",
    },
    {
      title: "4. Endurecimiento",
      description: "Usamos una luz especial para endurecer la resina en pocos segundos.",
    },
    {
      title: "5. Ajuste y pulido",
      description: "Ajustamos la mordida y pulimos el diente para que se sienta cómodo y se vea natural.",
    }
  ]
},
  {
  id: "coronas",
  title: "Coronas dentales",
  shortDescription: "Protegen y refuerzan dientes muy dañados o debilitados.",
  fullDescription: "Una corona dental es una funda que cubre completamente el diente para protegerlo y devolverle su forma y fuerza. Se recomienda cuando un diente está muy desgastado, roto o después de una endodoncia. Además de protegerlo, la corona mejora la apariencia del diente y permite masticar con normalidad.",
  icon: ShieldCheck,
  image: crownImage,
  beforeImage: crownBeforeImage,
  afterImage: crownAfterImage,
  duration: "2 citas",
  painLevel: "Bajo",
  benefits: [
    "Protege dientes débiles o dañados",
    "Devuelve la fuerza al diente",
    "Mejora la apariencia de la sonrisa",
    "Permite masticar con mayor seguridad",
    "Tiene una larga duración"
  ],
  steps: [
    {
      title: "1. Preparación del diente",
      description: "Ajustamos el diente para que la corona encaje correctamente y quede cómoda.",
    },
    {
      title: "2. Toma de medidas",
      description: "Tomamos un molde o escaneo del diente para fabricar la corona a la medida exacta.",
    },
    {
      title: "3. Corona provisional",
      description: "Colocamos una corona temporal para proteger el diente mientras se elabora la definitiva.",
    },
    {
      title: "4. Colocación final",
      description: "En la segunda cita colocamos y fijamos la corona definitiva para que puedas usarla con normalidad.",
    }
  ]
}
,
  {
  id: "endodoncia",
  title: "Endodoncia (Tratamiento de conducto)",
  shortDescription: "Elimina la infección del diente y quita el dolor, conservando el diente natural.",
  fullDescription: "La endodoncia, también conocida como tratamiento de conducto, se realiza cuando el nervio del diente está infectado o muy inflamado. Este tratamiento permite eliminar la infección desde el interior del diente, aliviar el dolor y evitar que el diente tenga que ser extraído. Después del tratamiento, el diente puede seguir funcionando normalmente con la protección adecuada.",
  icon: Drill,
  image: rootImage, 
  beforeImage: rootBeforeImage,
  afterImage: rootAfterImage,
  duration: "1 a 2 citas",
  painLevel: "Medio",
  benefits: [
    "Elimina el dolor causado por la infección",
    "Salva el diente natural",
    "Evita la extracción del diente",
    "Detiene la infección y evita que se propague",
    "Permite seguir masticando con normalidad"
  ],
  steps: [
    {
      title: "1. Acceso al diente",
      description: "Abrimos el diente cuidadosamente para poder llegar al nervio y a los conductos internos.",
    },
    {
      title: "2. Limpieza profunda",
      description: "Retiramos el nervio dañado y limpiamos el interior del diente para eliminar bacterias e infección.",
    },
    {
      title: "3. Sellado del diente",
      description: "Rellenamos y sellamos los conductos para evitar que la infección vuelva a aparecer.",
    },
    {
      title: "4. Restauración final",
      description: "Reconstruimos el diente para devolverle su función y, en muchos casos, colocamos una corona para protegerlo.",
    }
  ]
}
,
  {
    id: "implantes",
    title: "Implantes dentales",
    shortDescription: "Reemplazan dientes perdidos de forma segura, estética y duradera.",
    fullDescription: "Un implante dental es una raíz artificial hecha de titanio que se coloca en el hueso para reemplazar un diente perdido. Con el tiempo, el implante se integra al hueso y funciona como la base de un nuevo diente. Sobre el implante se coloca una corona que se ve, se siente y funciona como un diente natural, permitiendo comer y sonreír con confianza.",
    icon: Hammer,
    image: implantImage, 
    beforeImage: implantBeforeImage,
    afterImage: implantAfterImage,
    duration: "3 a 6 meses",
    painLevel: "Medio",
    benefits: [
      "Reemplazo fijo y duradero del diente perdido",
      "Ayuda a prevenir la pérdida de hueso",
      "No requiere desgastar dientes vecinos",
      "Mejora la masticación y el habla",
      "Apariencia y sensación de diente natural"
    ],
    steps: [
      {
        title: "1. Colocación del implante",
        description: "Colocamos el implante en el hueso mediante un procedimiento controlado y seguro.",
      },
      {
        title: "2. Integración al hueso",
        description: "Esperamos el tiempo necesario para que el hueso se una firmemente al implante y le dé estabilidad.",
      },
      {
        title: "3. Colocación del conector",
        description: "Colocamos una pequeña pieza que conecta el implante con el diente definitivo.",
      },
      {
        title: "4. Colocación de la corona",
        description: "Fijamos el diente definitivo sobre el implante para restaurar la función y la estética.",
      }
    ]
  },
  {
    id: "ortodoncia",
    title: "Ortodoncia",
    shortDescription: "Alinea los dientes para mejorar la sonrisa y la mordida.",
    fullDescription: "La ortodoncia es un tratamiento que ayuda a acomodar los dientes y mejorar la mordida. Puede realizarse con brackets tradicionales o con alineadores transparentes, según cada caso. Además de mejorar la apariencia de la sonrisa, facilita la limpieza dental y ayuda a prevenir problemas futuros como desgaste o dolor en la mandíbula.",
    icon: Smile,
    image: bracesImage, 
    beforeImage: bracesBeforeImage,
    afterImage: bracesAfterImage,
    duration: "12 a 24 meses",
    painLevel: "Bajo",
    benefits: [
      "Mejora la apariencia de la sonrisa",
      "Corrige la mordida y la forma de masticar",
      "Facilita la limpieza de los dientes",
      "Ayuda a prevenir desgaste y problemas dentales",
      "Resultados duraderos con el cuidado adecuado"
    ],
    steps: [
      {
        title: "1. Evaluación y estudio",
        description: "Realizamos estudios como radiografías, fotografías y escaneos para planificar el tratamiento.",
      },
      {
        title: "2. Inicio del tratamiento",
        description: "Colocamos los brackets o entregamos los primeros alineadores, según el tipo de ortodoncia.",
      },
      {
        title: "3. Ajustes periódicos",
        description: "Programamos citas de seguimiento para ir moviendo los dientes de forma gradual y segura.",
      },
      {
        title: "4. Retención",
        description: "Al finalizar el tratamiento, indicamos el uso de retenedores para mantener los dientes alineados.",
      }
    ]
  },
  {
    id: "limpieza",
    title: "Limpieza dental",
    shortDescription: "Mantiene dientes y encías limpios y saludables.",
    fullDescription: "La limpieza dental profesional elimina el sarro y la placa que no se pueden quitar solo con el cepillado diario. Este tratamiento ayuda a mantener las encías sanas, prevenir infecciones y detectar a tiempo posibles problemas dentales. Es recomendable realizarla de forma periódica para conservar una buena salud bucal.",
    icon: Sparkles, 
    image: cleaningImage, 
    beforeImage: cleaningBeforeImage,
    afterImage: cleaningAfterImage,
    duration: "30 a 45 minutos",
    painLevel: "Bajo",
    benefits: [
      "Ayuda a prevenir enfermedades de las encías",
      "Reduce y elimina el mal aliento",
      "Deja los dientes más limpios y brillantes",
      "Permite detectar problemas dentales a tiempo",
      "Contribuye a una mejor salud bucal"
    ],
    steps: [
      {
        title: "1. Limpieza con ultrasonido",
        description: "Utilizamos un equipo especial que desprende el sarro acumulado de forma segura y eficaz.",
      },
      {
        title: "2. Pulido dental",
        description: "Pulimos los dientes para eliminar manchas superficiales y dejar la superficie más lisa.",
      },
      {
        title: "3. Aplicación de flúor (opcional)",
        description: "Aplicamos flúor para ayudar a fortalecer el esmalte y proteger los dientes.",
      }
    ]
  },
  {
  id: "extraccion",
  title: "Extracción dental",
  shortDescription: "Retiro seguro de dientes muy dañados o muelas del juicio.",
  fullDescription: "La extracción dental se realiza cuando un diente está muy dañado, infectado o no puede salvarse con otros tratamientos. También es común en el caso de las muelas del juicio, cuando no tienen espacio para salir correctamente. El procedimiento es controlado, seguro y se realiza con anestesia para evitar dolor.",
  icon: Trash2,
  image: extractionImage, 
  beforeImage: extractionBeforeImage,
  afterImage: extractionAfterImage,
  duration: "20 a 40 minutos",
  painLevel: "Bajo",
  benefits: [
    "Elimina la infección y el dolor",
    "Previene problemas mayores en dientes vecinos",
    "Mejora la salud bucal",
    "Permite continuar con otros tratamientos como implantes u ortodoncia"
  ],
  steps: [
    {
      title: "1. Anestesia",
      description: "Aplicamos anestesia local para que la zona quede completamente adormecida y el procedimiento sea cómodo.",
    },
    {
      title: "2. Retiro del diente",
      description: "Extraemos el diente con cuidado, procurando proteger el hueso y los tejidos cercanos.",
    },
    {
      title: "3. Recuperación y cuidados",
      description: "Colocamos una gasa y te explicamos los cuidados necesarios para una buena cicatrización.",
    }
  ]
}

];

export { heroImage };
