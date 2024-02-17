import { create } from "zustand";
const API = "https://notas-0c0y.onrender.com/notas";

const useNotasStore = create((set) => ({
  notas: [],
  agregarNota: (nota) => set((state) => ({ notas: [...state.notas, nota] })),
  cargarNotas: async () => {
    try {
      const res = await fetch(API); // Reemplaza 'https://api.com/notas' con tu URL de API para obtener las notas
      const data = await res.json();
      set({ notas: data });
    } catch (error) {
      console.error("Error al cargar las notas:", error);
    }
  },
  guardarNotas: async (NewNote) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(NewNote),
      };
      const res = await fetch(API, options);
      if (!res.ok) {
        throw new Error("Error al guardar la nota");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error al guardar la nota:", error);
      throw error; // Re-lanza el error para que el llamador pueda manejarlo
    }
  },
  borrarNota: async (idNota) => {
    console.log(idNota);
    const url = `${API}/${idNota}`;
    console.log(url);
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const res = await fetch(url, options);
        if (res.ok) {
            return { success: true, message: 'Nota eliminada correctamente' };
        } else {
            const errorMessage = await res.text();
            return { success: false, message: `Error al eliminar nota: ${errorMessage}` };
        }
    } catch (error) {
        return { success: false, message: `Error al eliminar nota: ${error.message}` };
    }
  },
  actualizarNota: async (idNota, notaActualizada) => {
    const url = `${API}/${idNota}`;
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notaActualizada),
    };
    try {
      const res = await fetch(url, options);
      if (res.ok) {
        // Actualiza la nota en el estado global después de la actualización en la API
        const updatedNotas = [...(useNotasStore.getState().notas)]; // Clona el arreglo de notas
        const index = updatedNotas.findIndex((nota) => nota.id === idNota); // Encuentra el índice de la nota a actualizar
        updatedNotas[index] = notaActualizada; // Reemplaza la nota antigua con la nota actualizada
        set({ notas: updatedNotas }); // Actualiza el estado global con las notas actualizadas
        return { success: true, message: 'Nota actualizada correctamente' };
      } else {
        const errorMessage = await res.text();
        return { success: false, message: `Error al actualizar nota: ${errorMessage}` };
      }
    } catch (error) {
      return { success: false, message: `Error al actualizar nota: ${error.message}` };
    }
  },
}));

export default useNotasStore;
