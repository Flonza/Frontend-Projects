import { useEffect, useLayoutEffect, useState } from 'react'
import './Components.css'

export function ColorLabel({ColorValue, For}) {

    const [className, setClassName] = useState("")
    useLayoutEffect(() => {
        checkClassname(ColorValue)
    }, [ColorValue])

    const checkClassname = (value) => {
        setClassName(value)
        console.log(className);
    }

    return(
        <></>
    )
}