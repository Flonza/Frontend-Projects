import './components.scss'
import {Botones} from './Bottones'
import {menuItems} from '../constants/constantes-globales.jsx'
import { useState } from 'react'
export function MenuButtons({sendStyles}) {

    const [style, setStyle] = useState([])
    
    const changeValue = (val) => {
        const newArray = new Array(9).fill(false);
        newArray[val] = true;
        setStyle(newArray);
        sendStyles(newArray)
      };
    
    // useEffect(() => {
    //     console.log('Estado de style actualizado:', style);
    // }, [style]);

    return(
        <div className='w-20'>
            <div className='flex flex-col justify-center align-middle m-3 my-auto border border-slate-300 border-1 shadow-xl rounded-md py-2 px-[0.2px] w-auto'>
                <div className='m-2 rounded-lg'  onClick={() => changeValue(0)}>
                    <Botones Value={style[0]}>
                        {menuItems.pointer}
                    </Botones>
                </div>

                <div className='m-2 rounded-lg'  onClick={() => changeValue(1)}>
                    <Botones Value={style[1]}>
                        {menuItems.pencil}
                    </Botones>
                </div>

                <div className='m-2 rounded-lg'  onClick={() => changeValue(2)}>
                    <Botones Value={style[2]}>
                        {menuItems.square}
                    </Botones>
                </div>

                <div className='m-2 rounded-lg'  onClick={() => changeValue(3)}>
                    <Botones Value={style[3]}>
                        {menuItems.circle}
                    </Botones>
                </div>

                <div className='m-2 rounded-lg'  onClick={() => changeValue(4)}>
                    <Botones Value={style[4]}>
                        {menuItems.text}
                    </Botones>
                </div>

                <div className='m-2 rounded-lg'  onClick={() => changeValue(5)}>
                    <Botones Value={style[5]}>
                        {menuItems.arrow}
                    </Botones>
                </div>

                <div className='m-2 rounded-lg'  onClick={() => changeValue(6)}>
                    <Botones Value={style[6]}>
                        {menuItems.line}
                    </Botones>
                </div>

                <div className='m-2 rounded-lg'  onClick={() => changeValue(7)}>
                    <Botones Value={style[7]}>
                        {menuItems.image}
                    </Botones>
                </div>

                <div className='m-2 rounded-lg'  onClick={() => changeValue(8)}>
                    <Botones Value={style[8]}>
                        {menuItems.erased}
                    </Botones>
                </div>
            </div>
        </div>
    )
}