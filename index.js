const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require("express")

const app = express();
const PORT = process.env.PORT ?? 3000
const userRoutes = require('./src/routes/userRoutes')

app.use(express.json());
dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.log('Error de conexión a MongoDB:', err));

  

app.use("/", userRoutes);
  
  app.listen(PORT, ()=>{
    console.log("Funcionando en http://localhost:"+ PORT );
    
  })