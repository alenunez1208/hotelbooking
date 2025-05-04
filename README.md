# hotelbooking-front

Para arrancar esta parte, accedemos a la carpeta "front" y ejecutamos el comando "npm i" para poder instalar nuestras dependencias. Es recomendable ejecutar y arrancar primero el proyecto "back" para evitar posibles errores.

Una vez tengamos nuestras dependencias instaladas ejecutamos el comando "npm start" en la consola para levantarlo.

# hotelbooking-back

Es recomentable ejecutar este proceso primero.

Para poder arrancar el proyecto es necesario realizar los siguientes pasos:

    1. En primer lugar, realizamos la instalacion de nuestra dependencias usando el comando "npm i" en consola.

    2. En la raiz principal del proyecto, encontramos el archivo ".env". En este archivo podemos encontrar diversas variables las cuales debemos de configurar antes de arrancar nuestro proyecto. Dependiendo de que manera queremos tratar los datos:

        a. "DB" (base de datos): Si la variable "DATA_TYPE" es "DB" significa que vamos a tratar nuestros datos de la aplicación a través de un gestor de base de datos. En este caso, debemos de configurar las variables "DB_HOST"(nombre del servidor, en nuestro caso "localhost"), "DB_USER" (especificamos el nombre de usuario de nuestra base de datos), "DB_PASSWORD" (rellenamos esta variable en el caso de que tengamos una contraseña asignada a nuestro usuario de la base de datos) y "DB_NAME" (donde pondremos el nombre de la base de datos, en nuestro caso seria "HotelBooking").

        Es necesario que, si elegimos esta opción, importar la base de datos "hotelbooking.sql" que encontramos en la carpeta "/config" de nuestro proyecto. No hace falta crear previamente la base de datos ya que el propio archivo al ejecutarlo te la crea.

        b. "FS" (fileSystem): si ponemos en el "DATA_TYPE" el valor "FS" significa que vamos a tratar nuestros datos desde una estructura con carpetas y archivos metadata. En este caso, sólo tendremos que rellenar la variable "FS_FOLDER" para especificar la ruta dónde queremos que se guarden los registros. En el caso de que no esté la carpeta espeficia, la crea sola automaticamente. Por defecto, se crea esta estructura en la misma carpeta raiz del proyecto.

    Por último, tenemos la variable "PORT" la cual debemos de poner el puerto donde queramos correr nuestra app (por defecto el puerto 8000).


    3. Una vez hayamos configurado nuestra app, procedemos a levantar el proyecto usando el comando "npm run dev". En el caso de que la app arranque sin problemas, saldrá el mensaje en consola "Servidor corriendo en el puerto XXX". Si hemos elegido la opcion "BD" en el "DATA_TYPE", nos saldrá un mensaje adicional "Conectado a la base de datos XXXX". En el caso de que el "DATA_TYPE" sea "FS", se nos crearan las carpetas en la ruta especificada en el caso de no existir.


