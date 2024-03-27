import './components.scss'
export function Botones({children, Value}){
    let className = Value == true ? 'bottones focus' : 'bottones';
    return (
        <div className='text-center '>
            <button className={className}>
                {children}
            </button>
        </div>
    )
}