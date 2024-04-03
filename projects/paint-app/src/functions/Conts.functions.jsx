import { getSvgPathFromStroke } from "./Utils";
import { getStroke } from "perfect-freehand";

export const DrawElement = (rough, element, ctx) => {
       if(element.type === "line"){
           rough.draw(element.roughtElement)
       } else if (element.type === "rect") {
           rough.draw(element.roughtElement)
       } else if(element.type === "pencil") {
                const stroke = getSvgPathFromStroke(getStroke(element.points));
                ctx.fill(new Path2D(stroke));
       } else {
            throw new Error(`The type is not recognised:  ${element.type}`)
       }
}