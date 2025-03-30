# PAT__Practica_4
<!-- Repositorio GitHub:

https://github.com/fernandoperezalba/Practica_4

# API REST para Gestión de Plantas

## Descripción

Esta API REST permite gestionar una colección de plantas, permitiendo realizar operaciones de **Crear**, **Leer**, **Actualizar** y **Eliminar** plantas. Además, incluye una validación que asegura que el nombre de cada planta sea **único**. Si se intenta agregar una planta con un nombre ya existente, la API devuelve un error personalizado.

## Endpoints

| Método | Ruta               | Cuerpo                                                                                   | Descripción                                               | Posibles Respuestas                                          |
|--------|---------------------|------------------------------------------------------------------------------------------|-----------------------------------------------------------|-------------------------------------------------------------|
| POST   | /api/plants         | `{ "name": "Cactus", "description": "Planta suculenta" }`                                | Crea una nueva planta. Si el nombre ya existe, lanza error. | `201 Created`, `400 Bad Request` (si el nombre ya existe).   |
| GET    | /api/plants         | N/A                                                                                      | Obtiene todas las plantas.                                 | `200 OK` (lista de plantas).                                |
| GET    | /api/plants/{id}    | N/A                                                                                      | Obtiene una planta específica por su ID.                   | `200 OK`, `404 Not Found` (si no se encuentra la planta).    |
| PUT    | /api/plants/{id}    | `{ "name": "Nuevo nombre", "description": "Nueva descripción" }`                         | Actualiza los detalles de una planta.                      | `200 OK`, `404 Not Found` (si no se encuentra la planta).    |
| DELETE | /api/plants/{id}    | N/A                                                                                      | Elimina una planta por su ID.                              | `200 OK`, `404 Not Found` (si no se encuentra la planta).    |

## Comportamiento Esperado

Se ha implementado una excepción personalizada que se lanza cuando se intenta crear una planta con un nombre ya existente.
Cuando se intente crear una planta con un nombre duplicado, la API responderá con un mensaje de error similar al siguiente:

```json
{
    "message": "El nombre de la planta 'Cactus' ya existe. Introduce un nombre único."
}
