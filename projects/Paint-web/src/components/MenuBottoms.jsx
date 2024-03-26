import './components.css'
import {Botones} from './Bottones'
import {menuItems} from '../constants/constantes-globales.jsx'
export function MenuButtons() {
    let style = false;
    
    const changeValue = (val) => {
        let array = new Array(9).fill(false);
        console.log('bot el estilo es '+ style);
        array.forEach((val, index) => {
            array[index] = false; // Asignar false a cada elemento del array
          });
        array[val] = true;
        style = true;
        console.log('bot el estilo es '+ style);

    }
    return(
        <div className='w-20'>
            <div className='flex flex-col justify-center align-middle m-3 my-auto border border-slate-300 border-1 shadow-xl rounded-md py-2 px-[0.2px] w-auto'>
                <div onClick={() => changeValue(0)}>
                    <Botones style={style}>
                        {menuItems.pointer}
                    </Botones>
                </div>
            <Botones onClick={() => changeValue(1)} style={style}>
                {menuItems.pencil}
            </Botones>
            <Botones onClick={() => changeValue(2)}>
                {menuItems.square}
            </Botones>
            <Botones onClick={() => changeValue(3)}>
                {menuItems.circle}
            </Botones>
            <Botones onClick={() => changeValue(4)}>
                {menuItems.text}
            </Botones>
            <Botones onClick={() => changeValue(5)}>
                {menuItems.arrow}
            </Botones>
            <Botones onClick={() => changeValue(6)}>
                {menuItems.line}
            </Botones>
            <Botones onClick={() => changeValue(7)}>
                {menuItems.image}
            </Botones>
            <Botones onClick={() => changeValue(8)}>
                {menuItems.erased}
            </Botones>
            </div>
        </div>
    )
}