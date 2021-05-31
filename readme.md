#Document of API methods 

#Servicio GET MATERIAS 

#Request Authotization:
   Type: Basic Auth
   Username: persistencia
   Password: 1234

#Request Body Example:
{
    "paginaActual": 0, *Optional*
    "cantidadAVer": 2 *Optional*
}
    #si no le pasamos body el servicio devolvera todos los registros sin paginar.
#Response successfully Body Example   
[
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
    },
]


#Request Errors example

{
    "errorCode": 400,
    "errorMessage": "Invalid Number"
}
{
    "errorCode": 404,
    "errorMessage": "Unauthorized"
}

#Curl  

curl --location --request GET 'localhost:3001/mat' \
--header 'Authorization: Basic cGVyc2lzdGVuY2lhOjEyMzQ='