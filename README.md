# Documentacion

Trabajo en progreso por [@tomastoloza](https://github.com/tomastoloza/)
y [@galosalerno](https://github.com/galosalerno/)

## Request Authentication:
Key | Value
--- | --- 
Type      | Basic Auth
Username  | persistencia
Password  | 1234

## Curl

```http request
curl --location --request GET 'localhost:3001/mat' \
--header 'Authorization: Basic cGVyc2lzdGVuY2lhOjEyMzQ='
```

## Materias

### `GET` Request body example

```json
{
    "paginaActual": 0, //Optional
    "cantidadAVer": 2 //Optional
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