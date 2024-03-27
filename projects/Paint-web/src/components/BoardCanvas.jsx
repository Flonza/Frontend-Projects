import { useEffect, useLayoutEffect, useState } from 'react';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
import './components.scss'




export function BoardCanvas({Arr}) {

    //? Variables de los estilos de los cursores
    const [className, setClass] = useState("");
    const changeValues = () => {
        if(Arr[1] === true){
           setClass("cursor-pencil")
        } else if(Arr[2] || Arr[3] || Arr[5] || Arr[6]) {
           setClass("cursor-crosshair")
        } else if (Arr[4]){
            setClass("cursor-text")
        } else if(Arr[8]){
            setClass("cursor-erase")
        } else {
            setClass("")
        }

    }

    useEffect(() => {
        console.log(Arr);
        checkButtonActive()
        changeValues()
    }, [Arr])
    
    //? Revision de los botones
    const checkButtonActive = () => {
        for (let i = 0; i < Arr.length; i++) {
            if (Arr[i]) {
                switch (i) {
                    case 0: 
                        console.log('Boton 1 activo');
                        break;
                    case 1: 
                        console.log('Boton 2 activo');
                        break;
                    case 2: 
                        console.log('Boton 3 activo');
                        break;
                    case 3: 
                        console.log('Boton 4 activo');
                        break;
                    case 4: 
                        console.log('Boton 5 activo');
                        break;
                    case 5: 
                        console.log('Boton 6 activo');
                        break;
                    case 6: 
                        console.log('Boton 7 activo');
                        break;
                    case 7: 
                        console.log('Boton 8 activo');
                        break;
                    case 8: 
                        console.log('Boton 9 activo');
                        break;
                    default: 
                        console.log('hola');
                }
            }
        }
    }

    useLayoutEffect(() => {
        const tablero = document.getElementById('board');

        const board = new fabric.Canvas("board", {
            width: tablero.offsetWidth,
            height: tablero.offsetHeight
        })
       
        board.on('mouse:down', Draw)
        board.on('mouse:move', starDraw)
        board.on('mouse:up', stopDraw)

    }, [])

    return (
        <div className={`contenedor ${className} w-full`}>
            <canvas id="board" className='bg-slate-200 w-full my-auto'>
            
            </canvas>
        </div>
    )
}