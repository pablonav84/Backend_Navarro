import mongoose from 'mongoose';

const chatColl="messages"
const messageSchema = new mongoose.Schema(
    {
  nombre:String,
  mensaje:String,
},
{
  timestamps:true
});

export const chatModelo=mongoose.model(chatColl, messageSchema);