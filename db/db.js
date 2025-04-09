    const  sqlite3 =  require('sqlite3').verbose();//el verbose es para ver detalles en la consola
const { error } = require('console');
const Module = require('module');
    const path = require('path')

    //ruta de la db
    const dbPath = path.resolve(__dirname, 'tareas.db');
    
    //conectar a la db
    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error(`Error al conectar a la db ${err.message}`);
        } else {
            console.log('Conectado a la db');
            //crear la tabla (no estoy seguro si se creo o si esta bien y seguro mato a confianza)
            db.run(`
                    CREATE TABLE IF NOT EXISTS tareas (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        titulo TEXT NOT NULL,
                        descripcion TEXT,
                        fecha_vencimiento DATE,
                        estado TEXT NOT NULL DEFAULT 'pendiente'
                    )
                `)
        }
    });

module.exports = db;