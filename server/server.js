require('./config/config')

const mongoose = require('mongoose')
 
const express = require('express')
const app = express()
 
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use( require('./routes/usuario') )
 
mongoose.connect(process.env.URLDB, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }, () => 
    {
        // if ( err ) {
        //     throw err
        // }

        console.log('Base de datos online');

    })

mongoose.connect('mongodb://localhost:27017/cafe', 
    {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
    })
    .then( resp => {
        console.log( `Base de datos online` );
    })
    .catch( err => {
        console.log( `Error connecion: `, err );
    })

app.listen(process.env.PORT, () =>
{
    console.log('Escuchando puerto: ', 3000)
})