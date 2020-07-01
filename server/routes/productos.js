const express = require('express')

const { verificaToken } = require('../middlewares/autenticacion')

let app = express();
let Producto = require('../models/producto');
const { findByIdAndUpdate, findById } = require('../models/producto');
const producto = require('../models/producto');



// ===========================
//      Buscar productos
// ===========================

app.get('/productos/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino

    let regex = new RegExp(termino, 'i' )

    Producto.find({ nombre: regex })
            .populate('categoria', 'nombre')
            .exec( (err, productos) => {

                if( err ){
                    return res.status(500).json({
                        ok: false,
                        err
                    }) 
                }

                res.json({
                    ok: true,
                    productos
                })
            })

})


// ===========================
//      Obtener productos
// ===========================

app.get('/productos', verificaToken, (req, res) => {
    // Trae todos los productos
    // populate: usuario categoria
    // paginado?

    let desde = req.query.desde || 0
    desde = Number(desde)

    // let limite = req.query.desde || 5
    // limite = Number(limite)

    Producto.find({ disponible: true})
        .skip(desde)
        .limit(5)
        .populate('usuario', 'categoria')
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {
           
            if( err ){
                return res.status(500).json({
                    ok: false,
                    err
                }) 
            }

            res.json({
                ok: true,
                productos
            })
        })

})


app.get('/productos/:id', (req, res) => {
    // populate: usuario categoria
    // paginado?
    let id = req.params.id

    Producto.findById( id )
        .populate('usuario', 'nombre email')
        .populate('categoria', 'nombre')
        .exec((err, productoDB) => {
            if( err )
            {
            return res.status(500).json({
                    ok: false,
                    err
                }) 
            }
            if( !productoDB )
            {
            return res.status(500).json({
                    ok: false,
                    err: {
                        message: 'ID no exists'
                    }
                }) 
            }   
            res.json({
                ok: true,
                producto: productoDB
            })
            
        })

})


// ===========================
//      Crear productos
// ===========================


app.post('/productos', verificaToken, (req, res) => {
    
    let body = req.body

    let producto = new Producto({
        usuario: req.usuario._id,
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria
    })

    producto.save( (err, productoDB) => {
        if ( err ) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        res.status(201).json({
            ok: true,
            producto: productoDB
        })

    })
})


// ===========================
//      Actualizar producto
// ===========================

app.put('/productos/:id', verificaToken, (req, res) => {
    // grabar el usuario
    // grabar una categoria del listado
    let body = req.body
    let id = req.params.id

 
    Producto.findById(id, (err, productoDB) => {
        if( err )
        {
           return res.status(500).json({
                   ok: false,
                   err
               }) 
        }
        if( !productoDB )
        {
           return res.status(400).json({
                   ok: false,
                   err: {
                       message: 'El ID no existe'
                   }
               }) 
        }

        productoDB.nombre = body.nombre
        productoDB.precioUni = body.precioUni
        productoDB.descripcion = body.descripcion
        productoDB.disponible = body.disponible
        productoDB.categoria = body.categoria

        productoDB.save( (err, productoGuardado) => {
            if( err )
            {
               return res.status(500).json({
                       ok: false,
                       err
                   }) 
            }
            
            res.json({
                ok: true,
                producto: productoGuardado
            })  
        })

     
    })


})

app.delete('/productos/:id', (req, res) => {
    // cambiar el disponible
    let id = req.params.id

    producto.findById(id, (err, productoDB) => {
        if( err )
        {
           return res.status(500).json({
                   ok: false,
                   err
               }) 
        } 
        if( !productoDB )
        {
           return res.status(400).json({
                   ok: false,
                   err: {
                       test: 'product does not exists'
                   }
               }) 
        }  

        productoDB.disponible = false

        productoDB.save( (err, productoBorrado) => {
         
            if( err )
            {
               return res.status(500).json({
                       ok: false,
                       err
                   }) 
            } 

        res.json({
            ok: true,
            producto: productoBorrado,
            message: "Producto eliminado"
        }) 



        })


    
    })

})


module.exports = app