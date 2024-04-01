[!NOTE]
Este proyecto esta incompleto

# Paint app with Rough.JS

<h2>
    Introducción
</h2>
    <p> Hola, me llamo Flonza. Este es uno de los tantos proyectos para mi practica y prueba de mis habilidades en los distintos lenguajes de programacion y frameworks de esta gran area de trabajo. <br>El lenguaje seleccionado para realizar este projecto es ReactJS ademas de el optimizador de clases TailwindCSS y RoughJS como API para la creacion de los dibujos. En el projecto hago una replica del famoso software de dibujo excalidraw. </p>

<hr>

<h2>Funcionamiendo de las diversas funciones encontradas dentro del App.jsx</h2>

``Constante DISTANCE.``
    Esta constante es extraña, lo que hace es que dentro del POW se elevan los valores a la 2 luego se suman y por ultimo con el SQRT se les saca la raiz cuadrada
    Si suena como el funcionamiento del teorema de pitagoras, si, es bastante parecido, pero no, es la formula de distancia euclidiana.

    Recibe 2 valores como parametros. Obviamente numeros, pero como estamos en JS queda implicito.

-- Ejemplo del funcionamiento:
     ``const offSet = distance(a, b)``

``Constante IsWithin.``
    Esta constante recibe 3 valores como parametros, x, y, element, el ultimo es un objeto. Del objeto se desarma para asi poder tener sus difetentes atributos.
    Uno de los atributos que tiene este objeto seria el atributo TYPE el cual tiene como tipo de dato un string en el cual se describe el tipo de elemento que este 
    posee, para que permita modificar o ejecutar las funciones de manera optima y deacuerdo al tipo de objeto.

    Esta funcion dependiendo del tipo de objeto realizara distintas operaciones matematicas deacuerdo a la geometria de estos (Por ejemplos los rectangulos o los vectores). Apartir de estas operaciones devolvera un valor verdadero o falso dependiendo del resultado de estas.

 ``Funcion createElement()``
    Esta funcion es mas sensilla de explicar. Recibe 6 parametros, dependiendo del parametro TYPE esta renderizara un elemento. 
    Con los parametros obtenidos esta retornara un objeto que aparte de los parametros obtenidos, tambien enviara la renderizacion del elemento
    <>
        function createElement(id, x1, y1, x2, y2, type) {
        let roughtElement;
            if(type === "line") {
            roughtElement = generator.line(x1, y1, x2, y2)
            } else if (type === "rect") {
            roughtElement = generator.rectangle(x1, y1, x2 - x1, y2 -y1)
            }
            return {id, x1, y1, x2, y2, type,  roughtElement}
        }
    </>