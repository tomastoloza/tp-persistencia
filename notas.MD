```npx sequelize-cli model:generate --name carrera --attributes nombre:string```  genera un archivo (se puede modificar) y luego usar
```npx sequelize db:migrate``` para "pushear" los cambios, esto genera las tablas


https://sequelize.org/master/manual/migrations.html

git pull origin main o branch

Cambios que quiera


git checkout -b <branch-name>


git status ->

Changes not staged for commit:
(use "git add <file>..." to update what will be committed)
(use "git restore <file>..." to discard changes in working directory)
modified:   Archivos a agregar


git add <nombres de archivos>
git commit -m "Titulo del commit"


git push origin <branch-name> 

Si queres borrar los cambios locales

git checkout <nombre_archivo>
git checkout .


Si hay cambios en remoto:

git pull origin <branch-name>

Shift + shift -> Resolve conflicts
>>>>>
=====

git checkout main
git pull origin main

git checkout autenticacion
git merge main

