import './components.css'
export function Botones({children, style}){
    return (
        <div className={`m-2 text-center ${style ? 'focus' : ''}`}>
            <button className="bottones">{children}</button>
        </div>
    )
}