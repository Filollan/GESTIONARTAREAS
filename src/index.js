const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose')

const app = express();
mongoose.connect('mongodb://localhost/mevn-database')
//configuraciones de express
app.set('port', process.env.PORT || 3000);
//Middlewares (Funciones que se ejecutan antes que se entren a las rutas)
app.use(morgan('dev'));
app.use(express.json());

//rutas

app.use('/api/tasks', require('./routes/tasks'));

//archivos estaticos o los archivos que enviamos al frontend


app.use(express.static(path.join(__dirname, 'public')));;
// Server esta escuchando
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
  });
  