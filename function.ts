// createReactiveChart(){
//     let terceros any[] = [];

//     this.terceros.forEach(item = {
//       let cliente = item.cliente;
//       let suscriptor = item.suscriptor;
//       let empleado = item.empleado;
//       let proveedor = item.proveedor;
//       let distribuidor = item.distribuidor
//       terceros.push({cliente, suscriptor, empleado, proveedor, distribuidor});
//     });

//     let agrupados { [key string] any[] } = {};

//      Itera sobre los objetos y agrupa dinámicamente
//     terceros.forEach(item = {
//        Genera una clave basada en los valores booleanos
//       const clave = Object.entries(item)
//         .filter(([key, value]) = typeof value === 'boolean' && value === true)
//         .map(([key]) = key)
//         .join('  ').toUpperCase();

//        Si todos los valores son falsos, asigna la clave Sin registro
//       const todosFalsos = Object.values(item).every(value = value != true);
//       if (todosFalsos) {
//         agrupados['SIN REGISTRO'] = agrupados['SIN REGISTRO']  [];
//         agrupados['SIN REGISTRO'].push(item);
//       } else {
//          Si no existe un array para esta clave, créalo
//         if (!agrupados[clave]) {
//           agrupados[clave] = [];
//         }

//          Agrega el objeto al array correspondiente en agrupados
//         agrupados[clave].push(item);
//       }
//     });

//     const entradas = Object.entries(agrupados);

//      Mapea las claves
//     const tipoTerceros = entradas.map(([clave, value]) = clave);
//      Mapea las longitudes de los arrays de valores
//     const values = entradas.map(([clave, value]) = value.length);

//     let pieChart =  {
//       series values,
//       chart {
//         width 100%,
//         height 100%,
//         type donut
//       },
//       legend {
//         position right,
//         fontSize '12px',
//         fontFamily 'Inter, sans-serif',
//         fontWeight 600,
//         horizontalAlign left,
//         width 50%, 
//         offsetY -16
//       },
//       tooltip {
//         style {
//           fontSize '12px',
//           fontFamily 'Inter, sans-serif'
//         },
//       },
//       plotOptions {
//         donut {
//           expandOnClick false,
//           offsetY -5,
//         }
//       },
//       labels tipoTerceros,
//       theme {
//         monochrome {
//           enabled true
//         }
//       },
//       title {
//         text 'Tipos de terceros',
//         align 'left',
//         style {
//           fontSize '14px',
//           fontWeight 'bold',
//           fontFamily 'Inter, sans-serif',
//           color '#888'
//         },
//       },
//       responsive [
//         {
//           breakpoint 1023,
//           options {
//             legend {
//               position 'right',
//               horizontalAlign 'center',
//               fontSize '12px',
//               fontFamily 'Inter, sans-serif',
//               fontWeight 600,
//             },
//             plotOptions {
//               pie {
//                 expandOnClick false,
//                 offsetY 10,
//               }
//             },
//           }
//         },
//         {
//           breakpoint 350,
//           options {
//             legend {
//               position 'bottom',
//               fontSize '12px',
//               fontFamily 'Inter, sans-serif',
//               fontWeight 600,
//             },
//           }
//         },
//       ],
//     };

//     var chart = new ApexCharts(document.querySelector(#hardChart), pieChart);
//     chart.render();
//   }