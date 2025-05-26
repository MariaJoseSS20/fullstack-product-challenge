# Frontend Vue - Gestión de Productos

Este es el frontend de la aplicación de gestión de productos, desarrollado con Vue.js.

## Requisitos Previos

- Node.js 14.0 o superior
- npm o yarn

## Instalación

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd frontend-vue
```

2. Instalar dependencias:
```bash
npm install
```

## Ejecutar la Aplicación

Para iniciar el servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Características

- Lista de productos
- Formulario para agregar nuevos productos
- Botón para eliminar productos existentes

## Estructura del Proyecto

```
frontend-vue/
├── public/
├── src/
│   ├── views/
│   │   └── HomeView.vue    # Vista principal
│   ├── components/         # Componentes reutilizables
│   ├── router/            # Configuración de rutas
│   └── App.vue            # Componente raíz
└── package.json
```

## Dependencias Principales

- vue: ^3.3.0
- vue-router: ^4.2.0
- axios: ^1.6.0

## Configuración

La aplicación está configurada para comunicarse con el backend en:
- http://localhost:8000
