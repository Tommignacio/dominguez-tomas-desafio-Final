# Inicialización:

_Ejecutar este comando 🚀:_

```
  npm i
```

# Comandos para ejecutar la aplicación:

_Ejecutar el modo FORK, que seria por defecto._

- [PRODUCTION - FORK] - usando node || pm2.

```
npm start -- -p <número del puerto> -m fork
```

```
set NODE_ENV=production && pm2 start src/index.js --name "fork-server" -- -p <número del puerto>
```

- [PRODUCTION - CLUSTER] - usando node || pm2.

```
npm start -- -p <número del puerto> -m cluster
```

```
set NODE_ENV=production && pm2 start src/index.js -i max --name "cluster-server" -- -p <número del puerto>
```

- [DEVELOPMENT] - usando nodemon || pm2.

```
npm run dev -- -p <número del puerto>
```

```
pm2 start src/index.js -- -p <número del puerto>
```

_Comando para compilar los archivos css._

```
npm run watch-css
```

# Data usada durante el desarrollo de la app:

- [PRODUCTS]:

```

 {
 "title": "Remera",
 "price": 150,
 "thumbnail": "https://upload.wikimedia.org/wikipedia/commons/8/81/Camiseta-negra.jpg",
 "description": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi ex iste quae quam minima reiciendis atque nostrum magni sit autem laudantium sunt odio ad culpa facere, mollitia architecto aperiam at!",
 "category": "ropa"
 },
 {
 "title": "pantalon",
 "price": 200,
 "thumbnail": "https://d368r8jqz0fwvm.cloudfront.net/26600-product_lg/pantalon-de-hombre-venture.jpg",
 "description": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi ex iste quae quam minima reiciendis atque nostrum magni sit autem laudantium sunt odio ad culpa facere, mollitia architecto aperiam at!",
 "category": "ropa"
 },

```

- [users]:

```

  {
  "firstname": "Tomas",
  "lastname": "Dominguez",
  "birth": <Date>,
  "email": <env.ADMIN_EMAIL>,
  "password": <env.ADMIN_PASS>,
  "avatar": <not required>,
  "phone": 459997709,
  "card": 120113144
  }



```

## **🚨 Tener en cuenta 🚨 📢** (Estas configuraciones evitarán ciertos errores durante el testeo)

_- Modificar el archivo .env de la siguiente manera:_

- Ubicarse en "./.env.example"
- Cambiar el nombre a ".env"
- Modificar los datos y guardar.

_- Usar user admin para funciones de la API REST con postman :_

- Poner en el env:

```
ADMIN_EMAIL=admin.test@gmail.com

```

- Ingresar session:

```
Email: admin.test@gmail.com
Password: 1


```

## **Recomendaciones 💬**

- _Eliminar middlewares : isAdmim y auth de todas las rutas en [collections.routes.js] para usar funcionalidades de la API con Postman (POST,PUT,CREATE,DELETE) ._

- _Leer el archivo "env.md" para ver mas detalles a considerar._

## **Deploy del proyecto 🚀**

- _HEROKU_
