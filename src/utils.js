import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// la criptografia sirve para agregar seguridad al proyecto cifrandolo por medio de algoritmos matematicos
// convirtiendolos en caracteres indescifrables, hay algoritmos de cifrado y de hashing
// el cifrado se utiliza para intercambio de mensajes y el hashing para las contraseñas
import crypto from "crypto"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

export const rutaProducts = join(__dirname);

export const SECRET="coder123"
export const creaHash=password=>crypto.createHmac("sha256", SECRET).update(password).digest("hex")
//digest es un algoritmo complementario que normaliza las contraseñas no importa la cantidad de caracteres este algoritmo devuelve una estructura con la misma cantidad de caracteres
// garantiza a dos entradas diferentes devuelve dos salidas diferentes
