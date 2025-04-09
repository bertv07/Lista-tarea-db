const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Tarea = require('./models/tarea')
const app = express();
const port = 3000;

//ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'assets')))

//ruta principal
app.get('/', (req, res) => {
    Tarea.obtenerTareas((err,tareas)=>{
        if(err){
            res.status(500).send('Error al obtener las tareas');
        } else {
            res.render('index', {tareas})
        }
    })
})

// index.js
const tareaRouter = require('./controllers/tarea');

// Usar el router de tareas
app.use('/', tareaRouter);


//iniciar server
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});