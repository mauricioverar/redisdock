import app from "./app.js"
import { cfg } from "./config.js"

/* app.listen(cfg.NODE_LOCAL_PORT) // 4000 ó 3000
console.log("server on port", cfg.NODE_LOCAL_PORT) */

app.listen(cfg.NODE_DOCKER_PORT)
console.log("server on port", cfg.NODE_DOCKER_PORT)
