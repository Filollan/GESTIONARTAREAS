const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose')

//inicializandolo
const app = express();
mongoose.connect('mongodb://localhost/mevn-database')

//configuraciones de express, se establece el puerto
app.set('port', process.env.PORT || 3000);

//Middlewares (Funciones que se ejecutan antes que se entren a las rutas)
app.use(morgan('dev'));
app.use(express.json());

// se definen las rutas
app.use('/api/tasks', require('./routes/tasks'));

// se usan los archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));;

// Server esta escuchando las solicutudes
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
  });
  
 