# Documentacion

Trabajo en progreso por [@tomastoloza](https://github.com/tomastoloza/)
y [@galosalerno](https://github.com/galosalerno/)

## Servicios disponibles:
* [Autorizacion](##Autorizacion)
* [Materias](##Materias)
* [Carreras](##Carreras)

##Autorizacion

Nuestra API soporta los siguientes tipos de autenticacion:
* Basic Auth 
* Bearer Token

Para utilizar los servicios que necesitan autenticacion es necesario darla de alta utilizando el servicio `POST` de `/auth`

### `POST`

Este servicio es utilizado para dar de alta una autenticacion en el servicio.
Para ello es necesario invocar al servicio `POST` con el header Authorization y nuestra autenticacion

```http request
curl --location --request GET 'localhost:3001/auth' \
--header 'Authorization: Basic cGVyc2lzdGVuY2lhOjEyMzQ='
```

### `POST` response examples
```json
{
  "token": "cGVyc2lzdGVuY2lhOjEyMzQ="
}
```

Si falla la autenticacion tendremos la siguiente respuesta:

```
Unauthorized!
```



##Materias

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