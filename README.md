# Una pregunta importante 💗

Página romántica responsiva para una relación a distancia, construida con HTML, CSS y JavaScript vanilla. No necesita npm ni frameworks.

## Ejecutar

Abre `index.html` en un navegador. Para desarrollo, puedes abrir la carpeta con VS Code y usar Live Server.

La página requiere conexión a Internet para cargar el SDK remoto de EmailJS y enviar el mensaje. La notificación solo se intenta después de pulsar **«sí, quiero»**; el botón de broma no envía ningún correo.

## Interacciones

- **Sí, quiero:** abre una confirmación emotiva, cambia la página a un estado de celebración y lanza confeti.
- **Leer mi cartita:** abre un modal centrado con una carta más grande, espacio entre párrafos y un cierre visible. También se cierra con `Escape`, al tocar el fondo o usando el botón inferior.
- La carta atrapa el foco al navegar con teclado y devuelve el foco al botón que la abrió.
- Se aumentó el tamaño del texto principal, botones, reproductor y mensajes secundarios, con ajustes adicionales para pantallas pequeñas.
- **Nuestra canción:** reproduce o pausa el archivo de audio configurado.
- **No (es broma):** responde con mensajes juguetones, pero no fuerza una aceptación ni reemplaza la decisión de la otra persona.
- El diálogo de confirmación se cierra con el botón, al pulsar fuera de la tarjeta o con `Escape`.
- Incluye estados accesibles, controles con teclado y soporte para `prefers-reduced-motion`.

## Estructura

```text
propuesta-romantica/
├── index.html
├── styles.css
├── script.js
├── email-config.js
├── README.md
└── assets/
    ├── nuestra-cancion.mp3
    └── README.txt
```
