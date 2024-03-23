import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import __dirname from './utils.js';
import path from 'path';
import { router as vistasRouter } from './routes/vistasRouter.js';

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




app.get('*', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.status(404).send('error 404 - page not found');
});

const server = app.listen(PORT, () => {
  console.log(`Server escuchando en puerto ${PORT}`);
});

io = new Server(server);

io.on('connection', (socket) => {
  console.log(`Cliente Conectado con el id ${socket.id}`);
  socket.emit('saludo', { emisor: 'server', mensaje: 'Bienvenido al server' });
});