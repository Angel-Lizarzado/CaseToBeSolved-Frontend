# Gestor de albaranes

!Case to be solved - Frontend

## Descripción

El **Gestor de albaranes** es una aplicación diseñada para gestionar clientes y proyectos, generar albaranes en formato PDF y mucho más. Este proyecto es parte del **Case to be solved** del Módulo 4 Frontend y se conecta a la API de Bildy.

## Instalación

Sigue estos pasos para instalar y ejecutar el proyecto localmente:

1. Clona el repositorio:
    ```bash
    git clone https://github.com/Angel-Lizarzado/CaseToBeSolved-Frontend
    
    cd CaseToBeSolved-Frontend
    ```

2. Instala las dependencias necesarias:
    ```bash
    npm install
    ```

3. Inicia la aplicación:
    ```bash
    npm run dev
    ```

## Funcionalidades

- **Autenticación**: Registro y login de usuarios.
- **Verificación de Código**: Tras el registro, se muestra una sección para verificar el código enviado al correo.
- **Dashboard**: Una vez autenticado, el usuario es redirigido al `/dashboard`, donde puede gestionar clientes.
- **Gestión de Proyectos**: En `/dashboard/projects`, se pueden crear proyectos y asignarlos a clientes existentes, además de modificar los datos del proyecto.
- **Generación de Albaranes**: En `/dashboard/delivery`, se pueden generar albaranes en formato PDF, abrirlos en otra pestaña y descargarlos. Los albaranes pueden ser por horas o por materiales.
- **Seguridad**: Funcionalidad de logout y rutas protegidas.

## API

La aplicación utiliza la API de Bildy.

## Website

[Gestor de albaranes desplegado en vercel](https://gestordealbaranes-angellizarzados-projects.vercel.app/)

## Firma

Desarrollado por **Angel Lizarzado**.
