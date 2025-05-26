# Backend Laravel - API de Productos

Este es el backend de la aplicación de gestión de productos, desarrollado con Laravel.

## Requisitos Previos

- PHP 8.2 o superior
- Composer
- MySQL o SQLite

## Instalación

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd backend
```

2. Instalar dependencias:
```bash
composer install
```

3. Configurar el archivo .env:
```bash
cp .env.example .env
php artisan key:generate
```

4. Configurar la base de datos en el archivo .env:
```bash
DB_CONNECTION=sqlite
```

5. Crear la base de datos SQLite:
```bash
touch database/database.sqlite
```

6. Ejecutar las migraciones:
```bash
php artisan migrate
```

## Ejecutar el Servidor

Para iniciar el servidor de desarrollo:
```bash
php artisan serve
```

El servidor estará disponible en `http://localhost:8000`

## Endpoints de la API

### Productos

- `GET /api/products` - Listar todos los productos
- `POST /api/products` - Crear un nuevo producto
  - Body: `{ "name": "string", "price": number }`
- `DELETE /api/products/{id}` - Eliminar un producto

## CORS

La API está configurada para aceptar peticiones desde:
- http://localhost:3000 (React)
- http://localhost:5173 (Vue)
