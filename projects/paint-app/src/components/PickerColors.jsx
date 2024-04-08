import { useState } from "react"
import './Components.css'

export function ColorPicker() {
    const [color, setColor] = useState("#FFFFFF");

    const handleChangeColor = (event) => {
        const newColor = event.target.value;
        setColor(newColor)
    }
    return(
        <input type="color" value={color} onChange={handleChangeColor}
        className="color-picker"
        style={{
            width: "2rem",
            height: "2rem",
            background: "transparent",
            border: "none",
            outline: "none",
            cursor: "pointer",
        }}/>
    )
}