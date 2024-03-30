const mongoose = require('mongoose');
const { Schema } = mongoose;

// Esquema para definir cómo lucirán los datos
const TaskSchema = new Schema ({
    title: String,
    description: String // Cambiando 'descripcion' a 'description'
});

module.exports = mongoose.model('Task', TaskSchema);
