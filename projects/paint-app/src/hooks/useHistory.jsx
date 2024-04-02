import { useState } from "react"


export const useHistory = (initialState, overwrite = false) => {
    // Crea dos estados locales: index para seguir la posición actual en el historial y history para almacenar el historial de estados.
    const [index, setIndex] = useState(0);
    const [history, setHistory] = useState([initialState]);

    // Define una función setState que permite actualizar el estado y agregar un nuevo estado al historial.
    const setState = (action) => {
        const newState = typeof action === "function" ? action(history[index]) : action; // Evalúa la acción para determinar el nuevo estado.
        if(overwrite === true){
            const historyCopy = [...history];
            historyCopy[index] = newState;
            setHistory(historyCopy)
        } else {
            setHistory(prevState => [...prevState, newState]); // Agrega el nuevo estado al historial.
            setIndex(prevState => prevState + 1); // Incrementa el índice del historial.
        }
    }
    const undo = () => {
        if(index > 0) {
            setIndex(prevState => prevState - 1)
        }
    } 
    const redo = () => {
        if(index < (history.length - 1)) {
            setIndex(prevState => prevState + 1)
        }
    }
    // Retorna un array que contiene el estado actual y la función setState para actualizarlo.
    return [history[index], setState, redo, undo]
}