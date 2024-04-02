const Value = {
  xVal: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 text-slade-50">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" strokeWidth="2"/>
  </svg>,
  oVal: <svg className="w-10 text-yellow-200" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><circle cx="10.5" cy="10.5" fill="none" r="8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></svg>
}
export const TURNS = {
    x: Value.xVal
    ,
    o: Value.oVal
    
  }
  
  
  //VARIABLES DE ENTORNO
export const combos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
    [0, 4, 8], [2, 4, 6]             // Diagonales
]

