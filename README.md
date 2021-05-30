# Documentacion

Trabajo en progreso por [@tomastoloza](https://github.com/tomastoloza/)
y [@galosalerno](https://github.com/galosalerno/)

## Materias

### `GET` Request body example

```json
{
  "paginaActual": 0,
  "cantidadAVer": 2
}
```

### Response Example

```json
[
  {
    "id": 1,
    "nombre": "Matematica 1",
    "carreraId": 1,
    "Carrera-Relacionada": {
      "id": 1,
      "nombre": "Tecnicatura en Informatica"
    }
  },
  {
    "id": 2,
    "nombre": "Matematica 2",
    "carreraId": 1,
    "Carrera-Relacionada": {
      "id": 1,
      "nombre": "Tecnicatura en Informatica"
    }
  }
]
```

---

### `POST` Request body example

```json
{
  "nombre": "Estructura de datos",
  "carreraId": 1
}
```

`nombre` es el nombre de la materia.  
`carreraId` es el ID de la carrera a la que pertenece.

### Response example

```json
{
  "id": 5
}
```