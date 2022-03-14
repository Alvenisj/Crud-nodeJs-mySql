const express =  require('express');
const morgan  =  require('morgan');
const pool = require('./settings/db');
const hbs = require('express-handlebars');
const path = require('path');


const app = express();


//ASIGNAMOS EL PUERTO PARA EL SERVIDOR
app.set('port', process.env.PORT || 3000);

//DEFINIMOS LA RUTA A LA CARPETA DE VISTAS "VIEW"
app.set('view', path.join(__dirname, 'view'));

//CONFIGURAMOS EL ENRUTAMIENTO DE LAS VISTAS
app.engine('.hbs', hbs ({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layout'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));

app.set('view engine', '.hbs');





//EXPRESS-HANDLEBARS COMO EL MOTOR DE VISTAS DEL PROYECTO




//MIDDLEWARE
app.use(morgan('dev'));


//RUTAS
app.use(require('./routes/routes-app'));
app.use('/support', require('./routes/admin'));
app.use('/req', require('./routes/authentication'));



//DEFINIMOS LA RUTA DE LOS ARCHIVOS PUBLICOS ESTATICOS
app.use(express.static(path.join(__dirname, 'public')));



app.listen(app.get('port'), () => {

    console.log('SERVER ON PORT', app.get('port'));

});







