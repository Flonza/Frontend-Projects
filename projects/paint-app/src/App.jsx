import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import rough from 'roughjs/bundled/rough.esm'
import { MenuItems } from './constants/menus-items';
import { useHistory } from './hooks/useHistory';
import { Labels } from './components/Labels';
import './App.css'
import { CheckAdjustElement, DrawElement, onLine } from './functions/Conts.functions';


  //---------------------------------------------------------------------------------------------------------------
  // CONSTANTES
  //---------------------------------------------------------------------------------------------------------------

    const generator = rough.generator();
    const width = window.innerWidth;
    const height = window.innerHeight;

    const options = {
      size: 32,
      thinning: 0.5,
      smoothing: 0.5,
      streamline: 0.5,
      easing: (t) => t,
      start: {
        taper: 0,
        easing: (t) => t,
        cap: true
      },
      end: {
        taper: 100,
        easing: (t) => t,
        cap: true
      }
    };
  
  //---------------------------------------------------------------------------------------------------------------
  //FUNCIONES CONSTANTES
  //---------------------------------------------------------------------------------------------------------------

    /*Esta constante recibe 3 valores como parametros, x, y, element, el ultimo es un objeto. Del objeto se desarma para asi poder tener sus difetentes atributos.
    Uno de los atributos que tiene este objeto seria el atributo TYPE el cual tiene como tipo de dato un string en el cual se describe el tipo de elemento que este 
    posee, para que permita modificar o ejecutar las funciones de manera optima y deacuerdo al tipo de objeto.

    Esta funcion dependiendo del tipo de objeto realizara distintas operaciones matematicas deacuerdo a la geometria de estos (Por ejemplos los rectangulos o los vectores). Apartir de estas operaciones devolvera un valor verdadero o falso dependiendo del resultado de estas. */
    const positionWithin = (x, y, element) => {
      //? Desarmo el objeto en las variables pertinentes
      const {x1, y1, x2, y2, type} = element;
      if(type === "rect") {
        const topLeft = locationPoint(x, y, x1, y1, "topl")
        const topRight = locationPoint(x, y, x2, y1, "topr")
        const bottomLeft = locationPoint(x, y, x1, y2, "btnl")
        const bottomRight = locationPoint(x, y, x2, y2, "btnr")
        //? Esto lo que hace es devolver inside si se encuentra x y y dentro de los rangos de valores
        const inside = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;

        return inside || topRight || bottomRight || topLeft || bottomLeft
      } else if (type === 'line'){
        //? Esto devolvera true si el valor obsoluto del offSet es menor a uno (0)
        const on = onLine( x1, y1, x2, y2, x, y)
        const start = locationPoint(x, y, x1, y1, "start")
        const end = locationPoint(x, y, x2, y2, "end")
        return on || start || end
      } else if(type == 'pencil') {
        const betweenPoints = element.points.some((point, index) => {
          const nextPoint = element.points[index + 1];
          if (!nextPoint) return false;
          return onLine(point.x, point.y, nextPoint.x, nextPoint.y, x, y, 5) != null;
        })
        const onPath = betweenPoints ? 'inside' : null;
        return onPath;
      } else if (type == "text") {
        const inside = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;
        return inside
      } else {
        throw new Error("Type of tool not reconizeg")
      }
    }

    const adjustCoordinates = (element) => {
      const {x1, y1, x2, y2, type} = element;

      if(type == "rect" ) {
        const minX = Math.min(x1, x2);
        const maxX = Math.max(x1, x2);
        const minY = Math.min(y1, y2);
        const maxY = Math.max(y1, y2);
        return {x1: minX, y1: minY, x2: maxX, y2: maxY}
      } else if(type == "line"){
        if(x1 < x2 || (x1 === x2 && y1 < y2)){
          return {x1, y1, x2, y2}
        } else {
          return {x1:x2, y1:y2, x2:x1, y2:y1}
        }
      }
    }


    const locationPoint = (x1, y1, x2, y2, name) => {
        return Math.abs(x1 - x2) < 6 && Math.abs(y1 - y2) < 6 ? name : null
    }

    const cursorValue = (position) => {
      switch (position) {
        case "topl":
        case "btnr":
          return "nwse-resize";
        case "topr":
        case "btnl":
          return "nesw-resize"
        case "start":
        case "end":
          return "ns-resize" 
        default:
          return "move"
      }
    }

    const resizeCoordinates = (x, y, position, coordinates) => {
      const { x1, y1, x2, y2 } = coordinates;
    
      switch (position) {
        case "topl":
        case "start":
          return { x1: x, y1: y, x2, y2 };
        case "topr":
          return { x1, y1: y, x2: x, y2 };
        case "btnl":
          return { x1: x, y1, x2, y2: y };
        case "end":
        case "btnr":
          return { x1, y1, x2: x, y2: y };
        default:
          return null;
      }
    }
  
  //---------------------------------------------------------------------------------------------------------------
  //FUNCIONES
  //---------------------------------------------------------------------------------------------------------------
    // Esta funcion es mas sensilla de explicar. Recibe 6 parametros, dependiendo del parametro TYPE esta renderizara un elemento. 
    // Con los parametros obtenidos esta retornara un objeto que aparte de los parametros obtenidos, tambien enviara la renderizacion del elemento
    function createElement(id, x1, y1, x2, y2, type) {
      let roughtElement;
        if(type === "line") {
          roughtElement = generator.line( x1, y1, x2, y2 );
          return {id, x1, y1, x2, y2, type,  roughtElement, type}
        } else if (type == "rect") {
          roughtElement = generator.rectangle( x1, y1, x2 - x1, y2 -y1 )
          return {id, x1, y1, x2, y2, type,  roughtElement, type}
        } else if(type == "pencil") {
          return { id, type, points: [{ x: (x1 - 5), y: (y1 + 23) }] }
        } else if(type == "text"){
          return { id, type, x1, y1, x2, y2, text: "" }
        }
    }


    //Esta funcion es extraña. Lo que hace es por cada elemento del array ejecuta la funcion isWithin, para encontrar el elemento que tenga las cordenadas en el punto seleccionado
    function getElementPosition(x, y, elements) {
      return elements.map(element => 
        ({...element , position: positionWithin(x, y, element)})).find(element => element.position != null)
    }


function App() {

  
  //---------------------------------------------------------------------------------------------------------------
  // USE STATES
  //---------------------------------------------------------------------------------------------------------------

    const [elements, setElements, undo, redo] = useHistory([]);
    const [action, setAction] = useState("none");
    const [types, setTypes] = useState("line");
    const [slectElm, setSlect] = useState(null);
    const [grab,setGrab] = useState(false)
    const [pan, setPan] = useState({x: 0, y: 0})
    const textAreRef = useRef(null)
    const [className, setClass] = useState("bg-gray-600")
    const [scale, setScale] = useState(1)
    const [scaleOffset, setScaleOffset] = useState({x: 0, y: 0})

  //---------------------------------------------------------------------------------------------------------------
  // FUNCIONES CONSTANTES
  //---------------------------------------------------------------------------------------------------------------
    //* Esta funcion esta creada para evitar escribir codigo una y otra vez.
    // Se crea un nuevo elemento por medio del create element, luego se crea una variable para crear una copia de los ELEMENTOS
    // Y por ultimo se remplaza un valor del array que tenga el mismo index que el id que se recibe, es remplazado por lo qe deveulve la funcion
    const updateElement = (id, x1, y1, clientX, clientY, types, options) => {  
      const copyElements = [...elements];
      if(types == "line" || types == "rect") {
        const updateElement = createElement(id, x1, y1, clientX, clientY, types)
        copyElements[id] = updateElement
      } else if (types == "pencil") {
        copyElements[id].points = [...copyElements[id].points, { x : (clientX - 7) , y : (clientY + 23) }]
      } else if(types == "text") {
        const height = 22;
        const textWidht = document.getElementById("board").getContext("2d").measureText(options.text).width
        copyElements[id] = {
          ...createElement(id, x1, y1, x1 + textWidht, y1 + height, types),
          text: options.text
        }
      }
      setElements(copyElements, true)
    }

    const getMouseCoordinates = (event) => {
      const clientX = (((event.clientX - pan.x) + scaleOffset.x * scale) / scale) ;
      const clientY = (((event.clientY - pan.y) + scaleOffset.y * scale) / scale) ;
      return {clientX, clientY};
    }
    

    const onZoom = (value) => {
      setScale(prevState => Math.min(Math.max(prevState + value, 0.1), 3))
      console.log(scale);
    } 

    //! Funcion para cuando se clickee el canvas
    const handledMouseDown = (event) => {
      if( action == "writing" ) return;
      //Valores de la ubicacion del mouse
      const {clientX, clientY} = getMouseCoordinates(event);
      // Cambia el valor del cursor dependiendo de la ubicacion de este ademas de que cambia el valor de grab
      if(types === 'selection'){
        const element = getElementPosition(clientX, clientY, elements);
        event.target.style.cursor = element ? "move" : "default";
          if(element) {
            if(element.type == "pencil") {
              const offSetsArrX = element.points.map(point => clientX - point.x)
              const offSetsArrY = element.points.map(point => clientY - point.y)
              setSlect({...element, offSetsArrX, offSetsArrY})
            } else {
                const offsetX = clientX - element.x1;
                const offsetY = clientY - element.y1;
                setSlect({...element, offsetX, offsetY})
            }
            if(element.position == "inside") {
              setAction('moving')
            } else {
              setAction('resizing')
            }
          }
      } else if(action == "grab"){
      }else {
        if(types == "rect" || types == "line"){
          const element = getElementPosition(clientX, clientY, elements);
          event.target.style.cursor = element ? "crosshair" : "default";
           setClass("bg-gray-600")
        } else if (types == "text"){
          event.target.style.cursor = "text"
          setClass("bg-gray-600")
        } else if (types == "pencil") {
          event.target.style.cursor = "default"
          setClass("bg-gray-600 cursor-pencil")
        }
        const id = elements.length;
        //? Aqui se accede a las propiedades del objeto event por medio de su desustructuracion
        const element = createElement(id, clientX, clientY, clientX, clientY, types)
        
        //? Practicamente se hace un forEach en el cual se van agregando elementos dentro del state elements sin modificar el estado anterior
        setElements(prevState => [...prevState, element])
        setSlect(element)
        setAction(types == "text" ? "writing" : "drawing");
      }
      if(action == "grab" && types == "none"){
        event.target.style.cursor = "grabbing"
        setGrab(true)
        setClass("bg-gray-600")
      }
    }


    //! Funcion para cuando se mueva atraves del canvas
    const handledMouseMove = (event) => {
      const {clientX, clientY} = getMouseCoordinates(event);
        if (action === "drawing") {
          //? Aqui lo que se hace es obtener el valor previo que fue agregado en la funcion de click en el canvas
          const index = elements.length - 1;
          const {x1, y1} = elements[index] 
          
          updateElement(index, x1, y1, clientX, clientY, types, false)
        } else if (action === "moving") {
            if(slectElm.type == "pencil") {
              const newPoints = slectElm.points.map((_, index) =>({  
                  x: clientX - slectElm.offSetsArrX[index],
                  y: clientY - slectElm.offSetsArrY[index]
                }))
                const copyElements = [...elements];
                copyElements[slectElm.id] = {
                  ...copyElements[slectElm.id], points: newPoints
                }
                setElements(copyElements, true)
            } else {
              const { id, x1, y1, x2, y2, type, offsetX, offsetY } = slectElm
              const width = x2-x1;
              const height = y2-y1;
              const nextX = clientX - offsetX;
              const nextY = clientY - offsetY
              const options = type === "text" ? { text: slectElm.text } : {};
              updateElement(id, nextX, nextY, nextX + width, nextY + height, type, options, false)
            }
        } else if(action === "resizing") {
            const { id, type, position, ...coordinates } = slectElm
            const {x1, y1, x2, y2 } = resizeCoordinates(clientX, clientY, position, coordinates)
            updateElement(id, x1, y1, x2, y2, type, false)
        }

        if (types === "selection") {
          const element = getElementPosition(clientX, clientY, elements);
          event.target.style.cursor = element ?  cursorValue(element.position) : "default";
            setClass("bg-gray-600")
        } else if(types === "rect" || types === "line"){
          event.target.style.cursor = "crosshair";
            setClass("bg-gray-600")
        } else if (types == "text"){
          event.target.style.cursor = "text"
            setClass("bg-gray-600")
        } else if (types == "pencil") {
          event.target.style.cursor = "default"
          setClass("bg-gray-600 cursor-pencil")
        } else if (action === "grab" && grab === false) {
          event.target.style.cursor = "grab"; 
          setClass("bg-gray-600")
        } else if (action === "grab" && grab === true) { 
          event.target.style.cursor = "grabbing";
          setClass("bg-gray-600")
        }
    }

    //! Funcion para cuando se suelte el click en el canvas canvas
    const handledMouseUp = (event) => {
      const {clientX, clientY} = getMouseCoordinates(event);
      if(slectElm) {
        const index = slectElm.id;
        const {id, type} = elements[index];

        if((action === "drawing" || action === "resizing") && CheckAdjustElement(type)){  
          const {x1, y1, x2, y2} = adjustCoordinates(elements[index])
          updateElement(id, x1, y1, x2, y2, type)
        }

        if(
          slectElm.type == "text" && clientX - slectElm.offsetX === slectElm.x1 
          && clientY - slectElm.offsetY === slectElm.y1
        ) {
          setAction("writing");
          return
        }
      }

      
      //? Este if es para cambiar el valor del mouse
      if (types === "selection") {
        const element = getElementPosition(clientX, clientY, elements);
        event.target.style.cursor = element ? "move" : "default";
        setClass("bg-gray-600")
      } else  if(types === "rect" || types === "line"){
        event.target.style.cursor = "crosshair";
        setClass("bg-gray-600")
      } else if (types == "text"){
        event.target.style.cursor = "text"
        setClass("bg-gray-600")
      } else if (types == "pencil" && action !== "grab") {
        event.target.style.cursor = "default"
        setClass("bg-gray-600 cursor-pencil")
      } else if(action == "grab") {
        setGrab(false)
        event.target.style.cursor = "grab"
        setClass("bg-gray-600")
      }

      if(action === "writing") return;
      if (action === "grab") return;
      setAction('none');
      setSlect(null);
    }

    const handleBlur = event => {
      const { id, x1, y1, type } = slectElm;
      setAction('none');
      setSlect(null);
      const text = event.target.value;
      updateElement(id, x1, y1, null, null, type, {text: text})
    }

  //---------------------------------------------------------------------------------------------------------------
  // USE EFFECTS
  //---------------------------------------------------------------------------------------------------------------
  useLayoutEffect(() => {
    const board = document.getElementById("board");
      const ctx = board.getContext("2d");
      //* Declaracion del tablero por medio de la API de Rought
      const roughtBoard = rough.canvas(document.getElementById("board"));
      ctx.clearRect(0, 0, board.width, board.height);
      
      const widthScale = board.width * scale;
      const heightScale = board.height * scale;
      const offSetX = (widthScale - board.width) / 2;
      const offSetY = (heightScale - board.height) / 2;
      setScaleOffset({x:offSetX, y:offSetY})      
      
      ctx.save();
      ctx.scale(scale, scale)
      ctx.translate(-offSetX + pan.x / scale, -offSetY + pan.y / scale);




      elements.forEach(element => {
        if(action === "writing" && slectElm.id == element.id) return ;
        DrawElement(roughtBoard, element, ctx)
      });

      ctx.restore();

  }, [elements, action, slectElm, pan, scale])

  useEffect(() => {
    const undoRedoFunction = event => {
      if ((event.metaKey || event.ctrlKey) && event.key === "z") {
          if (event.shiftKey) {
              redo()
          } else {
              undo();
          }
      }
    };
  
    document.addEventListener("keydown", undoRedoFunction);
    return () => {
      document.removeEventListener("keydown", undoRedoFunction);
    };
  }, [undo, redo]);

  useEffect(() => {
    const textArea = textAreRef.current
    if (action === "writing" && textArea) {
      setTimeout(() => {
        textArea.value = slectElm.text;
        textArea.focus();
      }, 0)
    }
  }, [slectElm, action, elements]);

  useEffect(() => {
    const movePan = (event) => {
      if (grab && action === "grab") {
        setPan(prevState => ({
          x: prevState.x + event.movementX,
          y: prevState.y + event.movementY,
        }));
      }
    };
  
    document.addEventListener("mousemove", movePan);
    return () => {
      document.removeEventListener("mousemove", movePan);
    };
  }, [grab, action]) 


 return(
  
    <div> 
        
            <div className='fixed left-[40%] my-3 py-2 px-4 border border-1 border-slate-300 rounded-md sombra'>
                <ul className=" gap-2 flex">
                    <li>
                        <input type="radio" id="grab" name="Grab-pan" className="hidden peer" 
                        checked={action === "grab"} onChange={() => {
                          setAction("grab")
                          setClass("bg-gray-600")
                          setTypes("none")
                        }}/>
                        <Labels For={"grab"}>
                          { MenuItems.grab }
                        </Labels>
                    </li>
                    <li>
                        <input type="radio" id="selection" name="Selection" className="hidden peer" 
                        checked={types === "selection"} onChange={() => {
                            setTypes("selection")
                            setClass("bg-gray-600")
                            setAction("none")
                          }
                          }/>
                        <Labels For={"selection"}>
                          { MenuItems.selection }
                        </Labels>
                    </li>
                    <li>
                        <input type="radio" id="line" name="Line" className="hidden peer" 
                        checked={types === "line"} onChange={() => {
                          setTypes("line")
                          setAction("none")
                          setClass("bg-gray-600")
                        }}/>
                        <Labels For={"line"}>
                          { MenuItems.line }
                        </Labels>
                    </li>
                    <li>
                        <input type="radio" id="rectangle" name="Rectangle" className="hidden peer" 
                        checked={types === "rect"} onChange={() => {
                          setTypes("rect")
                          setAction("none")
                          setClass("bg-gray-600")
                        }}/>
                        <Labels For={"rectangle"}>
                          { MenuItems.square }
                        </Labels>
                    </li>
                    <li>
                        <input type="radio" id="pencil" name="Pencil" className="hidden peer" 
                        checked={types === "pencil"} onChange={() => {
                          setTypes("pencil")
                          setClass("bg-gray-600 cursor-pencil")
                          setAction("none")
                        }}/>
                        <Labels For={"pencil"}>
                          { MenuItems.pencil }
                        </Labels>
                    </li>
                    <li>
                        <input type="radio" id="text" name="Text" className="hidden peer" 
                        checked={types === "text"} onChange={() => {
                            setTypes("text")
                            setAction("none")
                            setClass("bg-gray-600")
                          }}/>
                        <Labels For={"text"}>
                          { MenuItems.text }
                        </Labels>
                    </li>
                    <li>
                        <input type="radio" id="erase" name="Text" className="hidden peer" 
                        checked={types === "erase"} onChange={() => {
                            setTypes("erase")
                            setAction("none")
                            setClass("bg-gray-600")
                          }}/>
                        <Labels For={"erase"}>
                          { MenuItems.erase }
                        </Labels>
                    </li>
                </ul>
            </div>

        
        <div className="fixed right-3 top-3 border border-1 border-slate-300 rounded-md sombra px-3 py-2">
                <ul className='flex gap-2'>
                    <li>
                        <button 
                        className='inline-flex items-center p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-slate-200 peer-checked:bg-gray-700 peer-checked:border-2 peer-checked:border-white peer-checked:text-white hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700'
                         onClick={undo}>
                            {MenuItems.undo}
                        </button>
                    </li>

                    <li>
                        <button className='inline-flex items-center p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-slate-200 peer-checked:bg-gray-700 peer-checked:border-2 peer-checked:border-white peer-checked:text-white hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700'
                         onClick={redo}>
                            {MenuItems.redo}
                        </button>
                    </li>
                </ul>
            </div>

        <div className='fixed bottom-3 left-3 border border-1 border-slate-200 rounded-md sombra px-3 py-2'>
            <div>
            <ul className='flex gap-2 '>
                    <li>
                        <button 
                        className='inline-flex items-center p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-slate-200 peer-checked:bg-gray-700 peer-checked:border-2 peer-checked:border-white peer-checked:text-white hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700'
                         onClick={() => {onZoom(-0.1)}}>
                          {MenuItems.recede}
                        </button>
                    </li>
                    <li className='font-bold my-auto mx-2'>
                      {(scale * 100).toFixed(0)}%
                    </li>
                    <li>
                        <button className='inline-flex items-center p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-slate-200 peer-checked:bg-gray-700 peer-checked:border-2 peer-checked:border-white peer-checked:text-white hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700'
                         onClick={() => {onZoom(0.1)}}>
                            {MenuItems.zoom}
                        </button>
                    </li>
                </ul>
            </div>
        </div>

      {
        action === "writing" ? (
          <textarea 
            id='text-area'
            ref={textAreRef}  
            onBlur={handleBlur}
            style={
              { 
                position: "fixed" , 
                top: (slectElm.y1 - scaleOffset.y) * scale + pan.y, 
                left: (slectElm.x1 - scaleOffset.x) * scale + pan.x, 
                font: `${22 * scale}px sans-serif`,
                color: "black",
                margin: 0,
                padding: 0,
                border: 0,
                outline: 0,
                resize: "auto",
                overflow: "hidden",
                whiteSpace: "pre",
                background: "transparent",
                resize: "none",
                zIndex: 2,
              }
            }>
          </textarea>
          ) : null
      }

      {/* <div className='fixed bg-slate-600 w-full h-full z-[1]'>
        {scale}
      </div> */}
      <canvas 
        id='board' 
        width={width} 
        height={height} 
        className={className}
        onMouseDown={handledMouseDown}
        onMouseMove={handledMouseMove}
        onMouseUp={handledMouseUp}
      ></canvas>
    </div>
  )
}

export default App


/*
  Que es eso que hace que el mouse cambie de posicion?
  element es la variable que almacena el resultado de getElementPosition(clientX, clientY, elements). Si element tiene un valor (es decir, si el mouse está sobre un elemento), entonces event.target.style.cursor se establece en "grabbing", lo que generalmente indica que el cursor está en una posición donde se puede agarrar y arrastrar algo. Si element es null (el mouse no está sobre ningún elemento), entonces el cursor se establece en "default", que es el cursor estándar del navegador.
*/

