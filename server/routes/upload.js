const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()

const fs = require('fs')
const path = require('path')

const Usuario = require('../models/usuario')
const Producto = require('../models/producto')

// default options
app.use( fileUpload({ useTempFiles: true }))

app.put('/upload/:tipo/:id', (req, res) => {
   
    let tipo = req.params.tipo
    let id = req.params.id

    if (!req.files) {
      return res.status(400)
        .json({
            ok: false,
            err: {
                message: "No se ha seleccionado ningun archivo"
            }
        })
    }

    // Validar tipo
    let tiposValidos = ['productos', 'usuarios']

    if( tiposValidos.indexOf(tipo) < 0){
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Los tipos validos son ' + tiposValidos.join(', '),
                tipo: `Tipo recibido: ${tipo}`
            }
        })
    }

    let archivo = req.files.archivo
    let nombreCortado = archivo.name.split('.')
    let extension = nombreCortado[nombreCortado.length -1 ]

    // Extensiones permitidas
    let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg']    

    if( extensionesValidas.indexOf(extension) < 0){
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Las extensiones permitidas son ' + extensionesValidas.join(', '),
                ext: `Extension recibida: ${extension}`
            }
        })
    }

    // Cambio de nombre al archivo
    // id-milisegundos.extension
    let nombreArchivo = `${id}-${ new Date().getMilliseconds()}.${extension}`


    archivo.mv(`uploads/${tipo}/${nombreArchivo}`, (err) => {
           
        if (err){
            return res.status(500)
             .json({
                ok: false,
                err
            })
        }
    
        // Imagen cargada
        // let ruta = req.files.archivo.tempFilePath

        if( tipo === 'usuarios'){
            imagenUsuario(id, res, nombreArchivo)
        } else {
            imagenProducto(id, res, nombreArchivo)
        }
            
    })
     


})


const imagenUsuario = (id, res, nombreArchivo) => {
   
    Usuario.findById(id, (err, usuarioDB) => {
        
        if(err){

            borrarArchivo(nombreArchivo, 'usuarios')

            return res.status(500).json({
                ok: false,
                err
            })

        }

        if(!usuarioDB){

            borrarArchivo(nombreArchivo, 'usuarios')

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no existe'
                }
            })

        }

        borrarArchivo(usuarioDB.img, 'usuarios')

        usuarioDB.img = nombreArchivo

        usuarioDB.save((err, usuarioGuardado) => {       
            res.json({
                ok: true,
                message: "Usuario guardado correctamente",
                usuario: usuarioGuardado,
                img: nombreArchivo              
            })
        })

    })
}

const imagenProducto = (id, res, nombreArchivo) => {
   
    Producto.findById(id, (err, productoDB) => {
        
        if(err){

            borrarArchivo(nombreArchivo, 'productos')
            
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if(!productoDB){

            borrarArchivo(nombreArchivo, 'productos')
            
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no existe'
                }
            })
        }

        borrarArchivo(productoDB.img, 'productos')

        productoDB.img = nombreArchivo

        productoDB.save((err, productoGuardado) => {       
            res.json({
                ok: true,
                message: "Producto guardado correctamente",
                usuario: productoGuardado,
                img: nombreArchivo              
            })
        })

    })
}


const borrarArchivo = (nombreImagen, tipo) => {
   
    let pathImg = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`)
    if( fs.existsSync(pathImg)){
        fs.unlinkSync(pathImg)
    }

}


module.exports = app

   