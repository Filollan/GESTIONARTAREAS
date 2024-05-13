//se importan las dependencias de mongoose
const mongoose = require('mongoose');

//se define la estructura del documento 
const { Schema } = mongoose;

//estructura de cada tarea
const TaskSchema = new Schema({
    title: String,
    description: String,
    hour: String,
    status: {
        type: String,
        enum: ['No realizada', 'En progreso', 'completada'],
        default: 'No realizada'
    }
});

//se exporta el modelo Task 
module.exports = mongoose.model('Task', TaskSchema);
