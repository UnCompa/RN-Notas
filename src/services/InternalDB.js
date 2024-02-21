import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mis_notas.db');

// Crear la tabla notas dentro de una transacción
export const iniciarNotas = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS notas (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, autor TEXT, content TEXT, important BOOL, date TEXT);',
      [],
      // Manejar éxito
      () => {
        console.log('Tabla de notas creada con éxito');
      },
      // Manejar errores
      (_, error) => {
        console.error('Error al crear la tabla de notas:', error);
      }
    );
  });
}

// Método para guardar una nueva nota
export const guardarNotasOff = (note) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO notas (title, autor, content, date, important) VALUES (?, ?, ?, ?, ?);',
      [note.title, note.autor, note.content, new Date().toISOString(), note.important ? 1 : 0],
      (_, { insertId }) => {
        console.log('Nota insertada con ID:', insertId);
      },
      (_, error) => {
        console.error('Error al insertar la nota:', error);
      }
    );
  });
};

// Método para obtener todas las notas
export const obtenerNotas = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM notas;',
      [],
      (_, { rows }) => {
        const notas = rows._array;
        callback(notas);
      },
      (_, error) => {
        console.error('Error al obtener las notas:', error);
      }
    );
  });
};

// Método para actualizar una nota existente
export const actualizarNota = (note) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE notas SET title=?, autor=?, content=?, important=?, date=? WHERE id=?;',
      [note.title, note.autor, note.content, note.important ? 1 : 0, new Date().toISOString(), note.id],
      () => {
        console.log('Nota actualizada con éxito');
      },
      (_, error) => {
        console.error('Error al actualizar la nota:', error);
      }
    );
  });
};

// Método para eliminar una nota
export const eliminarNota = (id) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM notas WHERE id=?;',
      [id],
      () => {
        console.log('Nota eliminada con éxito');
      },
      (_, error) => {
        console.error('Error al eliminar la nota:', error);
      }
    );
  });
};
