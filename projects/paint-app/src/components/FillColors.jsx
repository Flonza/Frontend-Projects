import React, { useEffect, useRef, useState } from "react";
import { MenuItems as SVGS } from "../constants/menus-items";
import {SketchPicker} from "react-color"

const MenuItems = [
  {
    id: "Fill-white",
    border: "border-black",
    textColor: "text-white",
    color: "#FFFFFF",
  },
  {
    id: "Fill-blue",
    border: "border-blue-500",
    textColor: "text-blue-500",
    color: "#3b82f6",
  },
  {
    id: "Fill-green",
    border: "border-green-500",
    textColor: "text-green-500",
    color: "#22c55e",
  },
  {
    id: "Fill-red",
    border: "border-red-500",
    textColor: "text-red-500",
    color: "#ef4444",
  },
  {
    id: "Fill-yellow",
    border: "border-yellow-500",
    textColor: "text-yellow-500",
    color: "#eab308",
  }, // Agregué un textColor para el elemento amarillo
];

export const FillColors = ({ ColorFill, FillActive }) => {
  const [check, setCheck] = useState("Color-white");
  const [color, setColor] = useState("#FFFFFF");
  const [showModal, setModal] = useState(true);
  const menuRef = useRef(null)


  const handledChangeInput = (val, color) => {
    setCheck(val);
    if(color) setColor(color)
  };

  const handledChangeColor = (color) => {
    const newColor = color.hex
    setColor(newColor);
    ColorFill(newColor)
  };

 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setModal(false);
      } else {
        setModal(true);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);


  useEffect(() => {
    if(FillActive){
      const color = MenuItems.find(color => color.color === FillActive) 
      if(color) {
        setCheck(color.id)
      } else { 
        setCheck('perso-color')
        setColor(FillActive)
        setModal(false);
      }
    }
  }, [])

  const sendData = (item) => {
    ColorFill(item) 
  }

  return (
    <ul ref={menuRef}  className="flex gap-1 min-h-7">
      {MenuItems.map((item) => (
        <li key={item.id}>
          <input
            type="radio"
            id={item.id}
            className="w-4 h-4 hidden peer"
            onChange={() => handledChangeInput(item.id, color)}
            checked={check === item.id}
            onClick={ () => sendData(item.color)}
          />
          <label
            htmlFor={item.id}
            className={`${item.textColor} inline-flex items-center cursor-pointer  
            peer-checked:border-2 ${item.border} peer-checked:rounded-md
            hover:scale-[110%] duration-75
          `}
          >
            {SVGS.squareRadioColors}
          </label>
        </li>
      ))}
      <li>
        <input type="radio" id="perzo-color" className="w-4 h-4 hidden peer"
        onChange={() => handledChangeInput("perso-color")}
        checked={check === "perso-color"}
        />
        <label htmlFor="perzo-color" style={{color: color, borderColor: color}} className={`inline-flex items-center cursor-pointer  
            peer-checked:border-2 peer-checked:rounded-md
            hover:scale-[110%] duration-75`}>
          { SVGS.squareRadioColors }
        </label>
        {
          check === "perso-color" && showModal  ? (
            <div className="absolute">
              <SketchPicker className="absolute" 
                color={color}
                onChangeComplete={handledChangeColor}
                onChange={handledChangeColor}
                disableAlpha={true}
          
              />
            </div>
        ) : null
        }
      </li>
    </ul>
  );
};
