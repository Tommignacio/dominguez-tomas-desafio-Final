# Como configurar el archivo ".env":
  * Guarda los datos de una cuenta [Admin], el cual recibe los mesnajes via email:
      ```
      ADMIN_MAIL=<email>
      ADMIN_PASS=<password>
      ```
    _Se recomienda usar una cuenta válida._
  ##

  * Guarda los datos de la [Base de Datos], el cual servirá para la correcta ejecucion del servidor:
      ```
      DB_DEPLOY=<name database deploy>
      DB_NAME=<name database>
      DB_MAIL=<email>
      DB_PASS=<password>
      DB_PERSISTENCE_SERVER=<mongo || firebase>
      DB_PERSISTENCE_TYPE=<memory || file || cloud>
      ```
    ### Si se decide usar cualquier tipo de persistencia a escepción de [cloud], se puede eliminar [DB_PERSISTENCE_SERVER].
      ```
      DB_DEPLOY=<name database deploy>
      DB_NAME=<name database>
      DB_MAIL=<email>
      DB_PASS=<password>
      DB_PERSISTENCE_TYPE=<memory || file>
      ```
    **Diferencia entre [DB_DEPLOY] y [DB_NAME].**
      - [DB_DEPLOY]:<p align="center"><img src="https://firebasestorage.googleapis.com/v0/b/backend-clases.appspot.com/o/DB_DEPLOY.PNG?alt=media&token=02b2c4f8-5552-4f48-9c88-e6a94e92b4a4" alt="DB_DEPLOY"/></p>
      - [DB_NAME]:<p align="center"><img src="https://firebasestorage.googleapis.com/v0/b/backend-clases.appspot.com/o/DB_NAME.PNG?alt=media&token=a80e3473-22fc-467f-8332-095f0de58846" alt="DB_NAME"/></p>
  ##

  * Permite crear un ambiente de [desarrollo] o de [producción]:
      ```
      NODE_ENV=<production || development>
      ```
    _No es necesario indicarlo porque está en el package.json_
  ##

  * Instancia el puerto al cual se conectara el servidor:
      ```
      PORT=<port>
      ```
  ##

  * Guarda los datos de la [cookie], el cual servirá para el registro e ususarios:
      ```
      SESSION_NAME=my-session
      SESSION_SECRET=secret
      SESSION_TIMEOUT=43200000
      ```
    _Se pueden cambiar los valores si así lo desea, o conservarlo y ejecutarlo como se muestra._
  ##

  * En caso de querer crear al usuario pero no el carrito, debe cambiar el valor de la siguiente variable de entorno de [true] a [false], crear un nuevo usuario y luego copiar su ID para poder crear un nuevo carrito:
      ```
      CREATE_CART_TOGETHER_WITH_USER=true
      ```
    - _Solo funcionará para el controlador de la api-rest: "src/controllers/json"._
    - _Al dejarlo en [true] se creará el carrito una vez sea registrado un nuevo usuario._
  ##