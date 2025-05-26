# Frontend React - Gestión de Productos

Este es el frontend de la aplicación de gestión de productos, desarrollado con React.

## Requisitos Previos

- Node.js 14.0 o superior
- npm o yarn

## Instalación

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd frontend-react
```

2. Instalar dependencias:
```bash
npm install
```

## Ejecutar la Aplicación

Para iniciar el servidor de desarrollo:
```bash
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## Características

- Lista de productos
- Formulario para agregar nuevos productos
- Botón para eliminar productos existentes

## Estructura del Proyecto

```
frontend-react/
├── public/
├── src/
│   ├── App.jsx           # Componente raíz
│   └── index.jsx         # Punto de entrada
└── package.json
```

## Dependencias Principales

- react: ^18.2.0
- react-dom: ^18.2.0
- react-router-dom: ^6.22.0
- axios: ^1.6.0

## Configuración

La aplicación está configurada para comunicarse con el backend en:
- http://localhost:8000 