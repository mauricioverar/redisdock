import express from "express"
import axios from "axios"
import responseTime from "response-time"
import { createClient } from "redis"
import { cfg } from "./config.js"
import { createPool } from "mysql2/promise"

import nunjucks from "nunjucks"
import path from "path"
import { fileURLToPath } from 'url'
import auth from "./routes/auth.js"

const app = express()

export const pool = createPool({
  // port: cfg.MYSQLDB_LOCAL_PORT,
  port: cfg.MYSQLDB_DOCKER_PORT,
  host: cfg.MYSQLDB_HOST,
  user: cfg.MYSQLDB_USER,
  password: cfg.MYSQLDB_ROOT_PASSWORD,
  database: cfg.MYSQLDB_DATABASE,
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Middlewares
app.use(responseTime())

// Connecting to dock-redis or to redis
const client = await createClient()
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// se configuran archivos estáticos
app.use(express.static('./node_modules/bootstrap/dist'))
app.use(express.static('./public'))

// se configura nunjucks //directorio views q contiene templates
const nunj_env = nunjucks.configure(path.resolve(__dirname, "views"), {
  express: app,
  autoscape: true,
  noCache: true,
  watch: true,
});
nunj_env.addGlobal('app_name', 'APP_NAME')

// Routes
app.use("/", auth)
/* app.get("/", async (req, res) => {
  res.send("/users on redis")
}) */

app.get("/ping", async (req, res) => {
  const fecha = await pool.query("select now()")
  res.json({ fecha: fecha[0] })
})

app.get("/users", async (req, res) => {
  // const value = await client.get("key")
  const value = await client.get("usuarios")
  if (value) {
    console.log("value")
    console.log(JSON.parse(value)) // transf str a json
    return res.json(JSON.parse(value))
  }

  const response = await axios.get("https://jsonplaceholder.typicode.com/users")
  console.log("api")

  // await client.set("key", "value") // guardar variable

  await client.set(
    "usuarios",
    JSON.stringify(response.data) // transf json a str
  )
  res.json(response.data)
})

// ruta no existe
app.use((req, res, next) => {
  // res.status(404).json({ message: "Not found" });
  res.render("404.html")
});
//error 404
/* app.use("*", function (req, res, next) {
  res.status(404).json({ msj: "route not found" })
  next()
}) */

export default app;