// const mongoose = require('mongoose')
// const uniqueValidator = require('mongoose-unique-validator')

// let Schema = mongoose.Schema

// let categoriaSchema = new Schema({
//     nombre: {
//         type: String,
//         required: [true, 'El nombre es necesario']
//     }
// })

// usuarioSchema.plugin( uniqueValidator, { message: '{PATH} debe ser unico'})

// module.exports = mongoose.model( 'Usuario', categoriaSchema)


const mongoose = require('mongoose')
const Schema = mongoose.Schema;
 
let categoriaSchema = new Schema({
    descripcion: { type: String, unique: true, required: [true, 'La descripción es obligatoria'] },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
});
 
 
module.exports = mongoose.model('Categoria', categoriaSchema);