# Maria's Meat Market - Evershop E-commerce

Plataforma de e-commerce construida con [Evershop](https://evershop.io/), una solución de comercio electrónico open-source basada en Node.js, React y GraphQL.

## Requisitos Previos

- **Node.js** >= 18.x
- **PostgreSQL** >= 13.x
- **npm** >= 8.x

## Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd my-evershop-app
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar base de datos

Crear una base de datos PostgreSQL y configurar las variables de entorno:

```bash
# Crear archivo .env en la raíz del proyecto
cp .env.example .env
```

Editar `.env` con tus credenciales:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=evershop
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_SSLMODE=disable
```

### 4. Ejecutar setup inicial

```bash
npm run setup
```

Este comando creará las tablas necesarias en la base de datos.

### 5. (Opcional) Cargar datos de prueba

```bash
npm run seed
```

> **Nota:** Solo usar en entornos de desarrollo/testing.

## Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run setup` | Configuración inicial de la base de datos |
| `npm run build` | Compilar el proyecto para producción |
| `npm run dev` | Iniciar en modo desarrollo (hot-reload) |
| `npm run start` | Iniciar en modo producción |
| `npm run seed` | Cargar datos de prueba |

## Desarrollo

### Iniciar servidor de desarrollo

```bash
npm run build && npm run dev
```

El servidor estará disponible en:
- **Tienda:** http://localhost:3000
- **Admin:** http://localhost:3000/admin

### Estructura del Proyecto

```
my-evershop-app/
├── config/
│   └── default.json       # Configuración de extensiones y tema
├── extensions/
│   └── sample/            # Extensión de ejemplo
│       ├── src/
│       │   ├── api/       # Endpoints REST
│       │   ├── pages/     # Componentes de página
│       │   ├── graphql/   # Tipos y resolvers GraphQL
│       │   ├── subscribers/ # Event listeners
│       │   └── crons/     # Tareas programadas
│       └── package.json
├── themes/
│   └── sample/            # Tema personalizado
│       └── src/
│           └── pages/
│               ├── all/       # Componentes globales (Header, Footer)
│               └── homepage/  # Componentes solo para homepage
├── media/                 # Archivos subidos
├── .env                   # Variables de entorno (no commitear)
└── package.json
```

### Personalización del Tema

Los componentes del tema se encuentran en `themes/sample/src/pages/`:

- **`all/`** - Componentes que aparecen en todas las páginas
  - `Header.tsx` - Cabecera con navegación
  - `Footer.tsx` - Pie de página
  - `GoogleFonts.tsx` - Carga de fuentes

- **`homepage/`** - Componentes solo para la página principal
  - `LandingPage.tsx` - Landing page completa con secciones

### Agregar una nueva extensión

1. Crear carpeta en `extensions/mi-extension/`
2. Agregar `package.json` con `"type": "module"`
3. Registrar en `config/default.json`:

```json
{
  "system": {
    "extensions": [
      {
        "name": "mi-extension",
        "resolve": "extensions/mi-extension",
        "enabled": true
      }
    ]
  }
}
```

4. Ejecutar `npm run build`

## GraphQL

Evershop expone una API GraphQL. Ejemplos de queries:

### Obtener categorías

```graphql
query {
  categories {
    items {
      categoryId
      name
      url
      image {
        url
      }
    }
  }
}
```

### Obtener productos

```graphql
query {
  products {
    items {
      productId
      name
      price {
        regular { value text }
        special { value text }
      }
      image { url }
      url
    }
  }
}
```

## Producción

### Compilar para producción

```bash
npm run build
```

### Iniciar servidor de producción

```bash
npm run start
```

### Variables de entorno recomendadas

```env
NODE_ENV=production
DB_HOST=tu-host-produccion
DB_PORT=5432
DB_NAME=evershop_prod
DB_USER=usuario_prod
DB_PASSWORD=password_seguro
DB_SSLMODE=require
```

## Despliegue

Evershop soporta despliegue en:

- **Docker** - Ver `docker-compose.yml`
- **Heroku** - `heroku create && git push heroku main`
- **AWS** - EC2, ECS, o Elastic Beanstalk
- **DigitalOcean** - App Platform o Droplets

## Solución de Problemas

### Error de conexión a base de datos

Verificar que PostgreSQL esté corriendo y las credenciales en `.env` sean correctas.

### Error en build

```bash
# Limpiar cache y reconstruir
rm -rf .evershop node_modules
npm install
npm run build
```

### Las fuentes no cargan

Verificar conexión a Google Fonts y que el componente `GoogleFonts.tsx` esté activo.

## Recursos

- [Documentación Evershop](https://evershop.io/docs)
- [API GraphQL](https://evershop.io/docs/development/knowledge-base/data-fetching)
- [Guía de Extensiones](https://evershop.io/docs/development/module/extension-development)

## Licencia

MIT
