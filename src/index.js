import app from "./app.js"
import { cfg } from "./config.js"

/* app.listen(cfg.NODE_LOCAL_PORT) // 4000 ó 3000
console.log("server on port", cfg.NODE_LOCAL_PORT) */

app.listen(cfg.NODE_DOCKER_PORT)
console.log("localhost:" + cfg.NODE_DOCKER_PORT)

// abrir docker desktop
// ejecutar
// docker - compose up -d
// ** para tener ambos servicios se cae al pedir datos a mysql **
// ejecutar bd
//en otro terminal ejecutar:
// redis - commander
// npm start