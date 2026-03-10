import { createContext } from "react";
export const ApartmentServiceContext = createContext(null);


//PROBLEMA CON ESTA ANTIGUA LINEA:
//export const ApartmentServiceContext = createContext(ApartmentsAPIService);

//Si NO existe un Provider, el Context devolverá ApartmentsAPIService.
//Es decir, el valor por defecto del contexto es tu service.
//Conclusión: el Provider realmente está repitiendo el mismo valor.

//PARA SOLUCIONARLO: 
// Creamos el Context a NULL i asi nos obligamos a que el Provider exista. 
// Si alguien usa el hook sin Provider, el valor será null y el error será evidente.
//export const ApartmentServiceContext = createContext(null);
//


