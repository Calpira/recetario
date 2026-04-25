
<img src="assets/logo.png" alt="logo" width="200">


Libro de recetas personal, para un rapido acceso multiplataforma. Las recetas se guardan en un archivo JSON editable.

## Estructura

```
recetario/
├── index.html        ← página principal
├── recetas.json      ← recetas (para editar)
├── vercel.json       ← configuración de Vercel
├── css/
│   └── style.css
└── js/
│   └── app.js
└── assets/
    └── logo.png

```
<img alt="Static Badge" src="https://img.shields.io/badge/cargar_recetas-en_proceso-yellow">
<img alt="Static Badge" src="https://img.shields.io/badge/cargar_imagenes-pendiente-red">
<img alt="Static Badge" src="https://img.shields.io/badge/editar_porciones-pendiente-red">

---

### categorias: 
-  'Panes y masas':      '🍞',
-  'Postres':            '🍮',
-  'Cafetería':          '☕',
-  'Pastelería':         '🥐',
-  'Tragos y bebidas':   '🍹',
-  'Sopas y caldos':     '🍲',
-  'Pastas':             '🍝',
-  'Salsas y aderezos':  '🥣',
-  'Snacks y aperitivos':'🍟',
-  'Platos principales': '🥘',
-  'Tartas y quiches':   '🥧',
-  'Entradas':           '🧆',
-  'Ensaladas':          '🥗',
-  'Desayunos':          '🍳',
-  'Guarniciones':       '🍚',
-  'Ingredientes':       '🧂',

---

### Informacion para cada receta en el json
```
{"id" : "",
"titulo" : "",
"categoria" : "",
"tiempo" : "",
"porciones" : ,
"porcion_unidad" : "",
"dificultad" : "",
"descripcion" : "",
"ingredientes" : [],
"pasos" : [],
"tips" : [],
"etiquetas" : [],
"imagen" : "https://kirolab3d.tienda-online.com/server/Portal_0009770/img/products/no_image_xxl.jpg"
}

