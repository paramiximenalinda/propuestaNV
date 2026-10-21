# Una pregunta importante 💗

Página romántica responsiva para una relación a distancia, construida con HTML, CSS y JavaScript vanilla. No necesita npm ni frameworks.

## Ejecutar

Abre `index.html` en un navegador. Para desarrollo, puedes abrir la carpeta con VS Code y usar Live Server.

## Antes de compartirla

### 1. Personaliza el mensaje

En `script.js`, al comienzo del archivo, edita el objeto `CONFIG`:

```js
const CONFIG = {
  nickname: "mi persona favorita",
  songSrc: "assets/nuestra-cancion.mp3",
  songTitle: "Nuestra canción"
};
```

Cambia el apodo y el nombre visible de la canción. Si quieres usar una ruta o URL diferente para el audio, actualiza `songSrc`.

### 2. Añade la canción

Copia un archivo MP3 que tengas derecho a usar dentro de `assets/` y llámalo `nuestra-cancion.mp3`. La ruta debe coincidir con `songSrc`. El audio solo comienza cuando la persona pulsa el botón; no se reproduce automáticamente.

Si aún no añades el MP3, la página seguirá funcionando y mostrará un mensaje amable cuando se pulse el reproductor.

### 3. Personaliza la carta

En `index.html`, busca `id="letter-panel"` y modifica los párrafos de la carta para incluir anécdotas, apodos o promesas que realmente quieras compartir. La carta ya está escrita pensando en una relación a distancia, pero conviene que suene a ti.

## Notificación por correo con EmailJS (opcional)

Al pulsar **«sí, quiero»**, la página puede enviar un correo a tu bandeja de entrada usando EmailJS. La celebración en pantalla aparece de inmediato y no depende de que el correo se envíe correctamente. Si EmailJS no está configurado o la petición falla, se muestra un aviso y la propuesta sigue funcionando.

### Configuración paso a paso

1. Crea una cuenta en [EmailJS](https://www.emailjs.com/) y conecta el servicio de correo que usarás para recibir la notificación.
2. En **Email Templates**, crea una plantilla de notificación. Configura el campo **To Email** directamente en el panel con tu propio correo; no lo envíes desde el navegador como una variable.
3. Puedes usar estos parámetros en el asunto y cuerpo de la plantilla:

   - `{{response}}` — respuesta recibida.
   - `{{nickname}}` — apodo configurado en la página.
   - `{{song_title}}` — nombre visible de la canción.
   - `{{response_time}}` — hora local aproximada del clic.
   - `{{page_url}}` — URL desde la que se respondió.
   - `{{message}}` — texto descriptivo de la notificación.
   - `{{name}}` y `{{time}}` — alias compatibles con la plantilla HTML que muestra el nombre/apodo y la fecha/hora.

   Ejemplo de asunto: `¡Tengo una respuesta a mi propuesta! 💗`

   Ejemplo de cuerpo: `{{response}}. Hora: {{response_time}}. Canción: {{song_title}}. {{message}}`

4. Abre `email-config.js` y copia los valores de **Public Key**, **Service ID** y **Template ID** desde tu panel de EmailJS en sus campos correspondientes.
5. En la configuración de seguridad de EmailJS, limita los orígenes permitidos al dominio donde publiques la página (por ejemplo, `https://TU-USUARIO.github.io`) y revisa los límites de envío.
6. Publica los archivos actualizados y prueba el flujo con tu propia bandeja de entrada antes de compartir el enlace.

**Seguridad:** el `Public Key` está pensado para uso en el navegador, pero la integración queda visible para cualquier visitante. No incluyas la contraseña de tu correo ni una `Private Key` en `email-config.js` o en ningún archivo del repositorio. Configura el destinatario fijo desde EmailJS y restringe los orígenes permitidos. Si los tres campos no están rellenados, la página no intenta enviar el correo y lo indica en pantalla.

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
