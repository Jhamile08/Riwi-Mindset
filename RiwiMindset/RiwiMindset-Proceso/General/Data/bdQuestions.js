// Preguntas del test

export const preguntasIngles= [
    {
      "id": 1,
      "contenido": "- Can I park here?",
      "respuestas": [
        {
          "contenido": "A. Sorry, I did that.",
          "correcta": false
        },
        {
          "contenido": "B. It's the same place.",
          "correcta": false
        },
        {
          "contenido": "C. Only for half an hour.",
          "correcta": true
        }
    
      ]
    },
    {
      "id": 2,
      "contenido": "- What colour will you paint the children's bedroom??",
      "respuestas": [
        {
          "contenido": "A. I hope it was right.",
          "correcta": false
        },
        {
          "contenido": "B. We can't decide.",
          "correcta": true
        },
        {
          "contenido": "C. It wasn't very difficult.",
          "correcta": false
        }
    
      ]
    },
    {
      "id": 3,
      "contenido": "- I can't understand this email.",
      "respuestas": [
        {
          "contenido": "A. Would you like some help?",
          "correcta": true
        },
        {
          "contenido": "B. Don't you know?",
          "correcta": false
        },
        {
          "contenido": "C. I suppose you can.",
          "correcta": false
        }
    
      ]
    },
  ]

  export const preguntasLogicas= [
    {
      "id": 1,
      "contenido": "- Si tienes una lista de números enteros en Python y quieres encontrar el número más grande, ¿cuál sería el enfoque más eficiente?",
      "respuestas": [
        {
          "contenido": "A. Recorrer la lista y comparar cada número con un valor máximo inicializado",
          "correcta": true
        },
        {
          "contenido": "B. Utilizar la función max() en la lista.",
          "correcta": false
        },
        {
          "contenido": "C. Ordenar la lista de forma ascendente y seleccionar el último elemento",
          "correcta": false
        }
    
      ]
    },
    {
      "id": 2,
      "contenido": "Supongamos que estás diseñando un sistema de gestión de archivos y deseas organizar los archivos en una estructura de árbol. ¿Qué tipo de estructura de datos sería más adecuada para representar este árbol de archivos?",
      "respuestas": [
        {
          "contenido": "A. Lista",
          "correcta": false
        },
        {
          "contenido": "B. Conjunto",
          "correcta": false
        },
        {
          "contenido": "C. Árbol binario",
          "correcta": true
        }
    
      ]
    },
    {
      "id": 1,
      "contenido": "Si estás desarrollando un programa que necesita almacenar datos que deben persistir después de que el programa se cierre, ¿cuál de las siguientes opciones sería la más apropiada?",
      "respuestas": [
        {
          "contenido": "A. Variables locales",
          "correcta": false
        },
        {
          "contenido": "B. Arreglos",
          "correcta": false
        },
        {
          "contenido": "C. Archivos de texto",
          "correcta": true
        }
    
      ]
    },
  ]
  export const preguntasMentales= [
    {
      "id": 1,
      "contenido": "He estado trabajando en mi proyecto durante largas horas consecutivas sin tomar descansos. ¿Cuál de las siguientes afirmaciones describe mejor mi situación de salud mental?",
      "respuestas": [
        {
          "contenido": "A. Soy altamente productivo y estoy aprovechando al máximo mi tiempo.",
          "correcta": false
        },
        {
          "contenido": "B. Puedo experimentar fatiga mental y aumentar el riesgo de errores debido a la falta de descanso.",
          "correcta": true
        },
        {
          "contenido": "C. Mi capacidad mental es ilimitada y no se verá afectada por la falta de descanso.",
          "correcta": false
        }
    
      ]
    },
    {
      "id": 2,
      "contenido": "He recibido críticas negativas sobre mi código durante una revisión de código. ¿Cómo podría afectar esto a mi salud mental?",
      "respuestas": [
        {
          "contenido": "A. No afectará mi salud mental, ya que las críticas son parte del proceso de desarrollo.",
          "correcta": false
        },
        {
          "contenido": "B. Puede aumentar mi estrés y ansiedad, afectando negativamente mi bienestar emocional.",
          "correcta": true
        },
        {
          "contenido": "C. Las críticas solo pueden tener un impacto positivo en mi salud mental al motivarme a mejorar.",
          "correcta": false
        }
    
      ]
    },
    {
      "id": 3,
      "contenido": "Me siento abrumado por la presión de cumplir con plazos ajustados y múltiples tareas. ¿Cuál sería una estrategia saludable para manejar esta situación?",
      "respuestas": [
        {
          "contenido": "A. Ignorar mis sentimientos de estrés y continuar trabajando sin descanso.",
          "correcta": false
        },
        {
          "contenido": "B. Comunicarme con el equipo sobre la carga de trabajo y explorar opciones para redistribuir tareas.",
          "correcta": true
        },
        {
          "contenido": "C. Ocultar mis sentimientos de abrumamiento para evitar ser percibido como incompetente.",
          "correcta": false
        }
    
      ]
    },
  ]


export  let ingles = {
    "nombre": "Test de ingles",
    "preguntas": "20 preguntas",
    "duracion": "20 min"
  }
export  let mentales = {
    "nombre": "Test de logicas",
    "preguntas": "20 preguntas",
    "duracion": "40 min"
  }
export let logicas = {
    "nombre": "Test de mentales",
    "preguntas": "20 preguntas",
    "duracion": "30 min"
  }

export let resultadosIngles = {
  "fecha": "",
  "buenas": 0,
  "malas": 0,
  "porcentaje": 0
}
export let resultadosLogicas = {
  "fecha": "",
  "buenas": 0,
  "malas": 0,
  "porcentaje": 0
}
export let resultadosMentales = {
  "fecha": "",
  "buenas": 0,
  "malas": 0,
  "porcentaje": 0
}

// guardar los objetos en el localStorage 

const preguntasInglesString = JSON.stringify(preguntasIngles)
const preguntasLogicasString = JSON.stringify(preguntasLogicas)
const preguntasMentalesString = JSON.stringify(preguntasMentales)


// guardar los string en el localStorage con formato de objetos

localStorage.setItem('preguntasIngles', preguntasInglesString)
localStorage.setItem('preguntasLogicas', preguntasLogicasString)
localStorage.setItem('preguntasMentales', preguntasMentalesString)


console.log(preguntasInglesString)
console.log(preguntasLogicasString)
console.log(preguntasMentalesString)
