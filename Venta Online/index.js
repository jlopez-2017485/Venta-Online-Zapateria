'use strict'

const mongoconfig = require('./configs/mongoConfig');
const app = require('./configs/app');
const port = 3200;

mongoconfig.init();

app.listen(port, ()=>{
    console.log(`Servidor http corriendo en el puerto ${port}`);
});