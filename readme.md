#Document of API methods 

#Servicio GET MATERIAS 

#Request Body Example

{
    "paginaActual": 0,
    "cantidadAVer": 2
}

#Response Body Example

#service ok: 

{
    "id": integer,
    "nombre": string
}

#Invalid Request body

{
    "errorCode": 400,
    "errorMessage": "Numero invalido"
}