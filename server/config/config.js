


// ====================
//         PORT
// ====================

process.env.PORT = process.env.PORT || 3000


// ====================
//      ENVIROMENT
// ====================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ====================
//      DATA_BASE
// ====================

// mongo "mongodb+srv://cluster0-sp6zb.mongodb.net/cafe" --username polisho
// polisho : ZvzXP8Bx9RzmojUS

let urlDB;

    if ( process.env.NODE_ENV === 'dev') {
        urlDB ='mongodb://localhost:27017/cafe'
    } else {
        urlDB = process.env.MONGO_URI
    }
// urlDB = 'mongodb+srv://polisho:ZvzXP8Bx9RzmojUS@cluster0-sp6zb.mongodb.net/cafe'

process.env.URLDB = urlDB