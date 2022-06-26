# Servidor WEB con ExpressJS + Socket con socket.io

### Para instalar los paquetes necesarios usar:

``` npm install ```

### Para usar en local entrar a cada carpeta según el interes y ejecutar:

``` npm run dev ``` or ``` npm start ```

### Que hace este pequeño ejemplo ?:
- Primero que nada, es un servidor web de una pagina que tiene dos partes, una la que mantiene una lista de productos que puede ir agregando en tiempo real.
- Segundo un chat de usuarios que pueden enviar mensajes en una sala global

### Caracteristicas:
- Uso de clases: el server esta dentro de una clase que se instancia en app.js
- Modularizado: para evitar tener codigo todo en un mismo archivo, se modularizo el codigo que maneja el socket en una carpeta llamada ``` sockets ``` donde esta el controlador del mismo.

### Por hacer:
- Se puede persistir facilmente usando un paquete [lowDB](https://github.com/typicode/lowdb) si lo crees conveniente avisame y creo un branch con esa modificación.