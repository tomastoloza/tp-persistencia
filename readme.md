<<<<<<< Updated upstream
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
=======
#Document of API methods

#GET SERVICE /MAT

##Request Authotization:
####Type: Basic Auth
####Username: persistencia
####Password: 1234

##Request Body Example:
###con paginado:
    {
        "paginaActual": 0, *optional*
        "cantidadAVer": 2  *optional*
    }
######si no le pasamos body el servicio devolvera todos los registros sin paginar.

##Response successfully Body Example

    {
        "id": 1,
        "nombre": "String",
        "carreraId": integer,
        "Carrera-Relacionada": {
            "id": integer,
            "nombre": "String"
        }
    },
    {
        "id": 2,
        "nombre": "String",
        "carreraId": integer,
        "Carrera-Relacionada": {
            "id": integer,
            "nombre": "String"
        }
    }

##Response Errors example

    {
        "errorCode": 400,
        "errorMessage": "Invalid Number"
    }
    {
        "errorCode": 404,
        "errorMessage": "Unauthorized"
    }

##Curl:
{   
curl --location --request GET 'localhost:3001/mat' \
--header 'Authorization: Basic cGVyc2lzdGVuY2lhOjEyMzQ='
}Y2lhOjEyMzQ='
>>>>>>> Stashed changes
