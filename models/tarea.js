const db = require('../db/db');

class Tarea {
    // Método para agregar una tarea
    static agregar(tarea, callback) {
        const sql = `INSERT INTO tareas (titulo, descripcion, fecha_vencimiento, estado) VALUES (?, ?, ?, ?)`;
        db.run(sql, [tarea.titulo, tarea.descripcion, tarea.fecha_vencimiento, tarea.estado], function(err) {
            callback(err, { id: this.lastID });
        });
    }

    // Método para obtener todas las tareas
    static obtenerTareas(callback) {
        const sql = `SELECT * FROM tareas`;
        db.all(sql, [], callback);
    }

    // Método para actualizar una tarea
    static actualizar(id, tarea, callback) {
        const sql = `UPDATE tareas SET titulo = ?, descripcion = ?, fecha_vencimiento = ? WHERE id = ?`;
        db.run(sql, [tarea.titulo, tarea.descripcion, tarea.fecha_vencimiento, id], callback);
    }

    // Método para actualizar solo el estado de una tarea
    static actualizarEstado(id, nuevoEstado, callback) {
        const sql = `UPDATE tareas SET estado = ? WHERE id = ?`;
        db.run(sql, [nuevoEstado, id], callback);
    }

    // Método para eliminar una tarea
    static eliminar(id, callback) {
        const sql = `DELETE FROM tareas WHERE id = ?`;
        db.run(sql, id, callback);
    }
}

module.exports = Tarea;