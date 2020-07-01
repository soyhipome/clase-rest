
// ================
//      CONFIG
// ================

// ====================
//         PORT
// ====================

process.env.PORT = process.env.PORT || 3000


// ====================
//      ENVIROMENT
// ====================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ===============================
//      TOKEN_EXPIRATION_DATE
// ===============================
// 60 SEGUNDOS, 60 MINUTOS, 24 HORAS, 30 DIAS

process.env.CADUCIDAD_TOKEN = '48h'

// ==============
//      SEED
// ==============

process.env.SEED = process.env.SEED || 'development-seed'


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

// =======================
//      GOOGLE_CLIENT
// =======================

process.env.CLIENT_ID = process.env.CLIENT_ID || '749468532861-jf54iiu4nvg5do1dllqdctfstik3cm5g.apps.googleusercontent.com'
