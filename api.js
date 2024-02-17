export const obtenerNotas = async ()=> {
    const res = await fetch(API)
    return await res.json()
}

export const guardarNotas = async (NewNote) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(NewNote)
    }
    const res = await fetch(API, options)
    const data = await res.json()
    return await data
}

export const borrarNota = async (idNota) => {
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
}
