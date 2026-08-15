# Rexsite-Site

Landing de **RexSite.app** — sitio inmobiliario profesional, activo en máximo 2 horas.

👉 El sitio está en [`rexsite-landing/`](rexsite-landing/) — HTML, CSS y JS puro, sin build.
Documentación completa (cómo verlo, cómo cambiar el enlace de pago y los colores) en
[`rexsite-landing/README.md`](rexsite-landing/README.md).

## Ver en local

```bash
python3 -m http.server 4321 --directory rexsite-landing
```

Abre http://localhost:4321

## Publicar

Cualquier hosting estático sirve. Sube el contenido de `rexsite-landing/` como raíz del sitio.

- **Netlify / Vercel**: publish directory = `rexsite-landing`
- **Hosting tradicional (cPanel, Hostinger)**: sube `index.html` y la carpeta `assets/` a `public_html/`

## Material fuente

Las imágenes originales, los videos y el `.docx` con el texto están en la carpeta local
`Landing-rex-site-1/` (476 MB) y **no se versionan** — ver `.gitignore`. Las imágenes que
usa la landing ya están optimizadas en `rexsite-landing/assets/img/` (1 MB en total).
