const express = require('express');
const Tarea = require('../models/tarea');

const router = express.Router();

// Clave única para acceder a la gestión de tareas
const CLAVE_UNICA = '12345678';

// Ruta para mostrar el formulario de login
router.get('/login', (req, res) => {
    res.render('login');
});

// Middleware para validar la clave única
const validarClave = (req, res, next) => {
    const clave = req.query.clave || req.body.clave; // Busca la clave en query o body
    if (clave === CLAVE_UNICA) {
        next(); // Continuar con la siguiente función
    } else {
        res.redirect('/login'); // Redirigir al login si la clave es incorrecta
    }
};

// Ruta para mostrar la vista de gestión de tareas
router.get('/gestion', validarClave, (req, res) => {
    Tarea.obtenerTareas((err, tareas) => {
        if (err) {
            res.status(500).send('Error al obtener las tareas');
        } else {
            res.render('gestion', { tareas });
        }
    });
});

// Ruta para agregar una nueva tarea
router.post('/tareas', validarClave, (req, res) => {
    const nuevaTarea = {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        fecha_vencimiento: req.body.fecha_vencimiento,
        estado: req.body.estado
    };
    Tarea.agregar(nuevaTarea, (err) => {
        if (err) {
            res.status(500).send('Error al agregar la tarea');
        } else {
            res.redirect('/gestion?clave=12345678'); // Redirigir a la gestión
        }
    });
});

// Ruta para cambiar el estado de una tarea (desde el index)
router.post('/tareas/cambiar-estado/:id', (req, res) => {
    const nuevoEstado = req.body.estado;
    Tarea.actualizarEstado(req.params.id, nuevoEstado, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al cambiar el estado de la tarea');
        } else {
            res.redirect('/');
        }
    });
});

// Ruta para editar una tarea (desde la gestión)
router.post('/tareas/editar/:id', validarClave, (req, res) => {
    const tareaActualizada = {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        fecha_vencimiento: req.body.fecha_vencimiento
    };
    Tarea.actualizar(req.params.id, tareaActualizada, (err) => {
        if (err) {
            res.status(500).send('Error al actualizar la tarea');
        } else {
            res.redirect('/gestion?clave=12345678'); // Redirigir a la gestión
        }
    });
});

// Ruta para eliminar una tarea (desde la gestión)
router.post('/tareas/eliminar/:id', validarClave, (req, res) => {
    Tarea.eliminar(req.params.id, (err) => {
        if (err) {
            res.status(500).send('Error al eliminar la tarea');
        } else {
            res.redirect('/gestion?clave=12345678'); // Redirigir a la gestión
        }
    });
});

module.exports = router;