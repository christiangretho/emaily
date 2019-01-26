// Keys.js - decide which keys to return

if(process.env.NODE_ENV === 'production'){
    // we are in production - return prod keys
    module.exports = require('./prod');
} else {
    // we are in development - return the dex keys!!!
    module.exports = require('./dev');
}
