# Cambios pendientes / temporales

## ⚠️ Sección "Datos de interés" OCULTA temporalmente

**Fecha:** 2026-07-11
**Estado:** pendiente de volver a mostrar

La sección **DATOS DE INTERÉS** (`id="datos"`) está oculta temporalmente, junto con su enlace en la navbar.

### Qué se cambió (en `index.html`)

1. **Enlace de la navbar** (~línea 81):
   ```html
   <a href="#datos" class="navbar__link" data-section="datos" style="display: none">DATOS DE INTERÉS</a>
   ```
2. **Sección** (~línea 356):
   ```html
   <section class="info" id="datos" style="display: none">
   ```

### Cómo volver a mostrarla

Eliminar `style="display: none"` de ambos elementos (y las comentarios `<!-- OCULTO temporalmente... -->` que los acompañan):

```html
<a href="#datos" class="navbar__link" data-section="datos">DATOS DE INTERÉS</a>
```
```html
<section class="info" id="datos">
```

Buscar en `index.html` por `id="datos"` o por el comentario `OCULTO temporalmente` para localizarlos rápidamente.

### Qué contiene la sección (para recordarlo al reactivarla)

La sección tiene 3 columnas (`.info__grid`):

1. **Dress code** — Elegante formal: vestido largo y tacones (mujeres) / traje, camisa de manga larga, corbata o pajarita (hombres). Tiene 2 enlaces "Mira inspiración" con `href="#"` **sin destino real**: rellenarlos antes de reactivar.
2. **Clima en Mayo** — Max. 24º / Min. 12º, suelo apto para tacones, parking propio en la finca.
3. **Contacto** — Wedding Planner Carmen, +34 651 062 083 (para sorpresas/consultas).

Revisar contenido antes de publicar: fechas/clima y sobre todo los enlaces "Mira inspiración".
