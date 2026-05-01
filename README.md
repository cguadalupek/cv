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

La pagina usa una navegacion especifica para movil.

### Comportamiento actual

- En escritorio y tablet se muestra una navegacion fija dentro del contenido.
- En escritorio y tablet, al seleccionar una opcion se muestra solo la tarjeta de esa seccion.
- En escritorio y tablet, la barra flotante aparece al hacer scroll hacia abajo.
- En movil, al cargar se muestra una navegacion integrada debajo de `Cambiar tema`.
- En movil, la barra flotante aparece solo al hacer scroll.
- En movil, cuando aparece la barra flotante, el menu integrado se oculta para que nunca haya dos menus visibles a la vez.
- En movil, los botones del menu se presentan en una sola fila completa, con icono arriba y texto abajo.
- En movil, el menu no muestra la opcion `Contacto`; el acceso principal a esa seccion queda en el boton `Contactame` y en el contenido de la pagina.
- Los botones del menu usan iconos, menor redondeado y un reparto uniforme por columna para mejorar pulsacion y encaje visual.

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
- Menu inicial integrado debajo del cambio de tema.
- Barra flotante superior en escritorio/tablet e inferior en movil.
- Vista por tarjetas para mostrar solo una seccion a la vez.
- Compactacion de textos y espaciados.

## Como editar contenido rapido

### Bloque inicial

El bloque inicial esta pensado como presentacion corta.

- No muestra el resumen largo del perfil.
- Ese texto vive solamente en la seccion `Sobre mi`.
- En movil, el bloque inicial se compacta para que entren nombre, botones principales, menu integrado, datos rapidos, redes y cambio de tema con mejor prioridad visual.

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
   - Navegacion fija visible dentro del contenido.
   - Barra flotante visible despues de scroll.
   - Tema claro y oscuro funcionando.

2. Movil
   - El menu inicial aparece debajo de `Cambiar tema`.
   - La barra flotante aparece solo despues de scroll.
   - Nunca se ven los dos menus al mismo tiempo.
   - La barra no tapa demasiado contenido.
   - La navegacion abre una sola seccion visible por vez.

3. Proyectos
   - El modal abre y cierra bien.
   - Los enlaces del proyecto apuntan correctamente.

## Mantenimiento futuro recomendado

- Si agregas muchas secciones nuevas, conviene centralizar las entradas del menu en un solo array y renderizarlas por JavaScript.
- Si la pagina crece bastante, puede valer la pena separar contenido en JSON o Markdown.
- Si quieres una version mas profesional para SEO o despliegue automatico, el siguiente paso natural seria migrarla a Vite o Astro, pero hoy no es necesario.
