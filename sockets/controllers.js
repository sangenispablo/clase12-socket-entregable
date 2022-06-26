// data de productos
const productos = require("../data/productos");
const chat = require("../data/chat");

const socketController = (socket) => {
  // aca tambien puedo poner una bienvenida al usuario que se conecta

  // apenas se conecta mando los productos y mensajes que ya tengo
  socket.emit("enviar-producto", productos);
  socket.emit("enviar-mensaje", chat);

  // escuchando al cliente
  socket.on("enviar-producto", (payload, retorno) => {
    // guardo el producto en el array global
    productos.push(payload);
    // le respondo al que me emitio
    retorno(productos);
    // este mismo producto se lo mando a todos los clientes conectados
    socket.broadcast.emit("enviar-producto", productos);
  });

  // escucho al cliente en otro evento
  socket.on("enviar-mensaje", (payload, retorno) => {
    chat.push(payload);
    retorno(chat);
    socket.broadcast.emit("enviar-mensaje", chat);
  });
};

module.exports = socketController;
