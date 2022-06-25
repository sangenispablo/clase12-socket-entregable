const express = require("express");
const cors = require("cors");

// data de productos
const productos = require("../data/productos");
const chat = require("../data/chat");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = require("http").createServer(this.app);
    this.io = require("socket.io")(this.server);

    this.paths = {};

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();

    // Sockets
    this.sockets();
  }

  sockets() {
    this.io.on("connection", (socket) => {
      // apenas se conecta mando los productos que ya tengo
      this.io.emit("enviar-producto", productos);
      this.io.emit("enviar-mensaje", chat);

      // si quiero controlar las desconexiones
      // socket.on("disconnect", () => {
      //   console.log("cliente desconectado", socket.id);
      // });

      // escuchando al cliente
      socket.on("enviar-producto", (payload) => {
        // guardo el producto en el array global
        productos.push(payload);
        // este mismo producto se lo mando a todos los clientes conectados
        // para eso uso el this.io
        this.io.emit("enviar-producto", productos);
      });

      // escucho al cliente en otro evento
      socket.on("enviar-mensaje", (payload) => {
        chat.push(payload);
        this.io.emit("enviar-mensaje", chat);
      });
    });
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio Público
    this.app.use(express.static("public"));
  }

  routes() {
    // this.app.use(this.paths.auth, require("../routes/auth"));
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
