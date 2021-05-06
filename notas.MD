```npx sequelize-cli model:generate --name carrera --attributes nombre:string```  genera un archivo (se puede modificar) y luego usar
```npx sequelize db:migrate``` para "pushear" los cambios, esto genera las tablas


https://sequelize.org/master/manual/migrations.html 