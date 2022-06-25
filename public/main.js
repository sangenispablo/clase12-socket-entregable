// referencias al dom
const lblOnline = document.querySelector("#lblOnline");
const lblOffline = document.querySelector("#lblOffline");
// Formulario de Productos
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const thumbnail = document.querySelector("#thumbnail");
const btnEnviarProducto = document.querySelector("#btnEnviarProducto");
// Formulario del Chat
const usuario = document.querySelector("#usuario");
const mensaje = document.querySelector("#mensaje");
const btnEnviarChat = document.querySelector("#btnEnviarChat");

const socket = io();

socket.on("connect", (payload) => {
  // para cuando es la primera vez que se conecta

  lblOffline.style.display = "none";
  lblOnline.style.display = "";
});

socket.on("disconnect", () => {
  console.log("desconectado del servidor");

  lblOffline.style.display = "";
  lblOnline.style.display = "none";
});

// funcion para recuperar la plantilla y renderizar en la tabla
async function renderProducto(productos) {
  const hbs = await fetch("/plantilla/productos.hbs");
  const textHbs = await hbs.text();
  const functionTemplate = Handlebars.compile(textHbs);
  const html = functionTemplate({ productos });
  document.querySelector("#bodyTable").innerHTML = html;
}

// pongo a escuchar al cliente lo que envia el server
socket.on("enviar-producto", (payload) => {
  renderProducto(payload);
});

btnEnviarProducto.addEventListener("click", () => {
  const producto = {
    title: title.value,
    price: price.value,
    thumbnail: thumbnail.value,
  };
  socket.emit("enviar-producto", producto);
  title.value = "";
  price.value = "";
  thumbnail.value = "";
});

const renderChat = (chat) => {
  let html = "";
  chat.forEach((element) => {
    html = html + `<li class="list-group-item">${element.usuario}-${element.mensaje}</li>`;
  });
  console.log(html);
  document.querySelector("#bodyChat").innerHTML = html;
};

// pongo a escuchar al cliente lo que envia el server
socket.on("enviar-mensaje", (payload) => {
  renderChat(payload);
});

btnEnviarChat.addEventListener("click", () => {
  const payload = {
    usuario: usuario.value,
    mensaje: mensaje.value,
  };
  socket.emit("enviar-mensaje", payload);
  mensaje.value = "";
});
