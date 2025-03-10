const express = require("express")
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const UserRoute = require("./src/routes/UserRoute")
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(cors());


const PORT = process.env.PORT ?? 3000

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.log('Error de conexión a MongoDB:', err));

  app.use("/User", UserRoute)

  app.listen(PORT, ()=>{
    console.log("Funcionando en http://localhost:"+ PORT );
    
  })