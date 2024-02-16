const API = 'https://notas-0c0y.onrender.com/notas'

export const obtenerNotas = async ()=> {
    const res = await fetch(API)
    console.log(res);
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
    console.log(res);
    return await res.json()
}