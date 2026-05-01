# Sitio personal de Kevin Carmen

## Resumen

Este proyecto es una pagina personal estatica reconstruida sobre una base simple.
Ya no depende de la plantilla anterior ni de librerias como jQuery.

Objetivos de esta version:

- Mantener la linea visual del CV anterior.
- Simplificar mantenimiento y edicion.
- Soportar tema claro y oscuro.
- Tener una navegacion mas usable en movil.
- Eliminar la seccion blog.

## Estructura principal

- `index.html`
  Contiene la estructura completa de la pagina, las secciones del CV, la navegacion y el modal de proyectos.

- `css/site.css`
  Contiene todos los estilos visuales y responsivos del sitio.

- `js/main.js`
  Contiene la logica del tema, la navegacion activa, el texto rotativo y el modal de proyectos.

- `images/`
  Recursos graficos como foto de perfil, fondos y favicon.

- `cv/`
  Archivos PDF del CV para descarga.

## Secciones de la pagina

Las secciones visibles estan definidas en `index.html`:

- `#sobre-mi`
- `#experiencia`
- `#habilidades`
- `#educacion`
- `#proyectos`
- `#contacto`

Cada una tiene su propio panel y puede editarse directamente en el HTML.

## Navegacion

La pagina usa dos navegaciones con el mismo contenido:

- Navegacion fija dentro de la pagina.
- Navegacion flotante para scroll.

### Comportamiento actual

- En escritorio, la navegacion fija aparece dentro de la pagina.
- En escritorio, la barra flotante aparece cuando se hace scroll hacia abajo.
- En movil, al cargar se muestra la navegacion fija dentro de la pagina.
- En movil, la barra flotante aparece recien cuando se hace scroll hacia abajo.
- Los botones del menu usan iconos y mayor tamano visual para mejorar la pulsacion.

### Archivos relacionados

- HTML de navegacion: `index.html`
- Estilos de navegacion: `css/site.css`
- Logica de visibilidad y seccion activa: `js/main.js`

## Tema claro y oscuro

El cambio de tema se controla con variables CSS y `localStorage`.

### Donde esta implementado

- Variables base: `css/site.css` en `:root`
- Tema claro: `css/site.css` en `html[data-theme="light"]`
- Boton del tema: `index.html`
- Logica del cambio: `js/main.js`

### Como funciona

- Se detecta el tema guardado en `localStorage`.
- Si no existe uno guardado, se usa la preferencia del sistema.
- El boton cambia entre claro y oscuro.

## Proyectos

La seccion de proyectos tiene tarjetas en `index.html` y el detalle se carga desde un objeto en `js/main.js`.

### Para editar un proyecto existente

1. Busca el boton del proyecto en `index.html`.
2. Busca la clave correspondiente dentro del objeto `projects` en `js/main.js`.
3. Edita:
   - `kicker`
   - `title`
   - `problem`
   - `solution`
   - `tech`
   - `links`

### Para agregar un proyecto nuevo

1. Duplica una tarjeta dentro de la seccion `#proyectos` en `index.html`.
2. Cambia el atributo `data-project`.
3. Agrega una nueva entrada con la misma clave en el objeto `projects` de `js/main.js`.

## Tipografia

La pagina usa `Poppins` desde Google Fonts.

Mejoras aplicadas en esta version:

- Jerarquia de titulos mas clara.
- Mejor balance de lineas en encabezados.
- Lectura mas limpia en parrafos largos.
- Ajustes para movil con mejor compactacion visual.

Si quieres cambiar la personalidad visual mas adelante, la primera decision fuerte seria cambiar la fuente base y recalibrar tamanos en `css/site.css`.

## Ajustes responsivos

El comportamiento movil vive principalmente en:

- `@media (max-width: 1120px)`
- `@media (max-width: 760px)`

En ese bloque se controla:

- Paso de dos columnas a una.
- Menu inicial fijo en movil.
- Barra flotante inferior al hacer scroll.
- Compactacion de textos y espaciados.

## Como editar contenido rapido

### Bloque inicial

El bloque inicial esta pensado como presentacion corta.

- No muestra el resumen largo del perfil.
- Ese texto vive solamente en la seccion `Sobre mi`.
- En movil, el bloque inicial se compacta para que entren nombre, botones, menu, datos rapidos, redes y cambio de tema con mejor prioridad visual.

### Texto de perfil

Editar en `index.html` dentro de la seccion `Sobre mi`.

### Experiencia laboral

Editar en `index.html` dentro de la seccion `#experiencia`.

### Habilidades

Editar en `index.html` dentro de la seccion `#habilidades`.

### Contacto

Editar enlaces y datos en `index.html` dentro de `#contacto`.

### CV descargable

Cambiar el PDF dentro de `cv/` y actualizar el enlace si el nombre cambia.

## Verificacion recomendada despues de cambios

Despues de cualquier ajuste visual o funcional, revisar:

1. Escritorio
   - Navegacion fija visible.
   - Barra flotante aparece al hacer scroll.
   - Tema claro y oscuro funcionando.

2. Movil
   - Navegacion fija visible al cargar.
   - Barra flotante aparece despues de hacer scroll.
   - La barra no tapa demasiado contenido.
   - La navegacion sigue funcionando por seccion.

3. Proyectos
   - El modal abre y cierra bien.
   - Los enlaces del proyecto apuntan correctamente.

## Mantenimiento futuro recomendado

- Si agregas muchas secciones nuevas, conviene centralizar las entradas del menu en un solo array y renderizarlas por JavaScript.
- Si la pagina crece bastante, puede valer la pena separar contenido en JSON o Markdown.
- Si quieres una version mas profesional para SEO o despliegue automatico, el siguiente paso natural seria migrarla a Vite o Astro, pero hoy no es necesario.
