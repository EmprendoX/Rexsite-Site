# RexSite.app — Landing

Landing de una sola página, en HTML/CSS/JS puro. Sin frameworks, sin build, sin dependencias.
Se puede subir tal cual a Netlify, Vercel, Hostinger, cPanel o cualquier hosting estático.

## Contenido

```
rexsite-landing/
├── index.html              ← toda la página
├── assets/
│   ├── css/styles.css      ← sistema de diseño + estilos
│   ├── js/main.js          ← header, animaciones, FAQ, barra móvil
│   └── img/                ← imágenes optimizadas (~900 KB en total)
└── README.md
```

## Ver la página en local

```bash
python3 -m http.server 4321 --directory rexsite-landing
```

Luego abre http://localhost:4321

## Cambiar el enlace de pago

El botón "EMPEZAR MIS 14 DÍAS GRATIS" apunta a Mercado Pago. Está en dos lugares:

1. `assets/js/main.js`, línea `var CTA_URL = '...'` — este valor pisa a todos los botones al cargar.
2. Los `href` del HTML, como respaldo si el visitante tiene JavaScript desactivado.

Para cambiarlo en todo el sitio:

```bash
cd rexsite-landing && sed -i '' 's|https://mpago.la/1qkqP8A|TU_NUEVO_ENLACE|g' index.html assets/js/main.js
```

## Cambiar colores

Todo el color vive en variables CSS al inicio de `assets/css/styles.css`:

```css
--navy: #0A1D36;   /* fondo de secciones oscuras */
--blue: #1878DE;   /* botones y acentos */
--ivory: #F7F3EC;  /* fondo de secciones claras */
--gold: #E9A93A;   /* badge "14 DÍAS GRATIS" */
```

## Texto

El texto es exactamente el del documento `Rexsite-landing-1.docx`, sin modificaciones.
Dos puntos del original conviene revisarlos antes de publicar:

- **FAQ "¿Qué recibiré en 2 horas?"** responde *"en un máximo de 24 horas"*, mientras el
  resto de la página promete 2 horas.
- **Paso 1** termina con doble punto: *"...acceso a tu sitio.."*

## Origen de las imágenes

| Archivo | Origen |
|---|---|
| `hero.webp`, `pareja.webp`, `cita.webp`, `desk.webp`, `agente.webp` | imágenes del `.docx` |
| `s-*.webp` | carpeta `IMAGENES_PANTALLA_1` (capturas reales del producto) |
| `logo.png`, `logo-white.png`, `favicon.png` | `LOGO-REXsite/RESITE-LOGO-2/5.png` |

Los videos de `Videos-hero-section/` no se usaron: pesan ~12 MB cada uno y harían muy lenta
la carga. Si quieres uno en el hero, primero hay que comprimirlo (objetivo: menos de 2 MB).

## Detalles técnicos

- Imágenes en WebP, con `width`/`height` para evitar saltos de layout, y `loading="lazy"`
  salvo la del hero.
- Fuentes: Plus Jakarta Sans + Inter desde Google Fonts, con `display=swap`.
- Respeta `prefers-reduced-motion`: si el usuario desactivó animaciones, no hay movimiento.
- Accesible: navegación por teclado, `:focus-visible`, textos alternativos, enlace "Ir al contenido".
- Barra fija inferior con el CTA en móvil, que aparece al pasar el hero.
