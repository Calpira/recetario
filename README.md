# Mi Recetario

Libro de recetas personal, deployable en Vercel. Las recetas se guardan en un archivo JSON editable.

## Estructura

```
recetario/
├── index.html        ← página principal
├── recetas.json      ← tus recetas (editar aquí)
├── vercel.json       ← configuración de Vercel
├── css/
│   └── style.css
└── js/
    └── app.js
```

## Cómo agregar o editar recetas

Abrí `recetas.json` con cualquier editor de texto y seguí el formato existente:

```json
{
  "id": 4,
  "titulo": "Nombre de la receta",
  "categoria": "Postres",
  "tiempo": "30 min",
  "porciones": 4,
  "descripcion": "Descripción corta y apetitosa.",
  "ingredientes": [
    "Ingrediente 1",
    "Ingrediente 2"
  ],
  "pasos": [
    "Paso 1.",
    "Paso 2."
  ],
  "etiquetas": ["fácil", "dulce"]
}
```

**Importante:** el `id` debe ser único para cada receta. Los ids no tienen por qué ser consecutivos, solo distintos.

## Deploy en Vercel

### Opción A — desde GitHub (recomendado)

1. Subí la carpeta a un repositorio de GitHub
2. Entrá a [vercel.com](https://vercel.com) y logueate con GitHub
3. Hacé click en **Add New Project** → seleccioná el repo
4. Dejá todo por default y hacé click en **Deploy**
5. ¡Listo! Cada vez que hagas `git push`, Vercel actualiza el sitio automáticamente

### Opción B — Vercel CLI

```bash
npm i -g vercel
cd recetario
vercel
```

Seguí las instrucciones en pantalla.

## Desarrollo local

Necesitás servir los archivos con un servidor local (no abrir el HTML directamente) porque `fetch()` no funciona con el protocolo `file://`.

```bash
# con Python
python3 -m http.server 3000

# con Node
npx serve .
```

Luego abrí `http://localhost:3000` en el navegador.
