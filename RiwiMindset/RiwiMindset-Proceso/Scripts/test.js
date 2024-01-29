


/* inyeccion foto y nombre */

import { inyect } from "./Users-registrer.js"

document.addEventListener('DOMContentLoaded',inyect(datos))

const datos = JSON.parse(localStorage.getItem("gente"))

console.log(datos);

