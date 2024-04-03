import { getSvgPathFromStroke, distance } from "./Utils";
import { getStroke } from "perfect-freehand";



//? Encargado de la creacion de elementos con rough y FreeHAND
export const DrawElement = (rough, element, ctx) => {
    const {roughtElement, x1, y1, type, text, points} = element

       if(type === "line"){
           rough.draw(roughtElement)
       } else if (type === "rect") {
           rough.draw(roughtElement)
       } else if(type === "pencil") {
             const stroke = getSvgPathFromStroke(getStroke(points));
             ctx.fill(new Path2D(stroke));
       } else if(type === "circle"){
           rough.draw(roughtElement)
       } else if(type === "text"){
            ctx.font = "22px sans-serif"
            ctx.fillText(text, x1, y1)
       }
        else {
            throw new Error(`The type is not recognised:  ${type}`)
       }
}


//? Revisar si el tipo esta dentro del array
export const CheckAdjustElement = (type) => {
    const arr = ["rect", "line", "circle"]
    if ( arr.includes(type)){
        return true
    }
}

//? Funcion encargada de la verificacion de los guntos de corte de las lineas o dibujos a lapiz
export const onLine = (x1, y1, x2, y2, x, y, maxOffset = 1) => {
    const a = {x: x1, y: y1};
    const b = {x: x2, y: y2};
    const c = {x, y};
    const offSet = distance(a, b) - (distance(a, c) + distance(b, c));
    return Math.abs(offSet) < maxOffset ? "inside" : null;
}