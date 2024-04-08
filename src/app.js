import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import __dirname from './utils.js';
import path from 'path';
import { router as cartRouter } from "./routes/cartRouter.js"
import { router as vistasRouter } from './routes/vistasRouter.js';
import { router as productRouter } from "./routes/productRouter.js"
import { ChatManager } from './dao/chatManagerMongo.js';
const PORT = 8080;
let io;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use("/", vistasRouter)
app.use("/api/cart", cartRouter)
app.use("/api/productos", productRouter);

app.get('*', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.status(404).send('error 404 - page not found');
});

const server = app.listen(PORT, () => {
  console.log(`Server escuchando en puerto ${PORT}`);
});

const connect = async () => {
    try {
      await mongoose.connect(
        "mongodb+srv://pablonav84:pablo1810@cluster0.1ym0zxu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        { dbName: "ecommerce" }
      );
      console.log("DB Online");
    } catch (error) {
      console.log("Fallo conexión. Detalle:", error.message);
    }
  };
  connect();

  let mensajes=[]
let usuarios=[]

  io = new Server(server);

  let cManager=new ChatManager()
  io.on('connection', (socket) => {
    console.log(`Cliente Conectado con el id ${socket.id}`);
    socket.emit('saludo', { emisor: 'server', mensaje: 'Bienvenido al server' });
  
    socket.on("compra", (idCart, id, description)=>{
      cartManager.comprar(idCart, id, description)
  })

    socket.on('confirmacion', nombre => {
  usuarios.push({id:socket.id, nombre})
  socket.emit("historial", mensajes)
      socket.broadcast.emit("nuevoUsuario", nombre)
    });
    socket.on("mensaje", (nombre, mensaje) => {
      cManager.guardarMensaje(nombre, mensaje)
      .then(mensajeGuardado => {
        console.log('Mensaje guardado exitosamente:', mensajeGuardado);
      })
      .catch(error => {
        console.error('Error al guardar el mensaje:', error);
      });
      io.emit("nuevoMensaje", nombre, mensaje)
    });
    
  socket.on("disconnect", ()=>{
    let usuario=usuarios.find(u=>u.id===socket.id)
    if(usuario){
        socket.broadcast.emit("saleUsuario", usuario.nombre)
    }
  })
  socket.on("connection", socket=>{
    console.log(`Se conecto un cliente con id ${socket.id}`)
  });
  })