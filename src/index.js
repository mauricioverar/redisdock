import express from "express"
// import axios from "axios"
import responseTime from "response-time"
// import { createClient } from "redis"
import { cfg } from "./config.js"
import { createPool } from "mysql2/promise"

const app = express()

export const pool = createPool({
  // port: cfg.MYSQLDB_LOCAL_PORT,
  port: cfg.MYSQLDB_DOCKER_PORT,
  host: cfg.MYSQLDB_HOST,
  user: cfg.MYSQLDB_USER,
  password: cfg.MYSQLDB_ROOT_PASSWORD,
  database: cfg.MYSQLDB_DATABASE,
})

// middlewares
app.use(responseTime())

// Connecting to dock-redis or to redis
/* const client = await createClient()
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect() */

app.get("/", async (req, res) => {
  res.send("/users on redis")
})

app.get("/ping", async (req, res) => {
  const fecha = await pool.query("select now()")
  res.json({ fecha: fecha[0] })
})

/* app.get("/users", async (req, res) => {
  // const value = await client.get("key")
  const value = await client.get("usuarios")
  if (value) {
    return res.json(JSON.parse(value))
  }

  const response = await axios.get(`${cfg.API_BASE_URL}/users`)
  console.log("api")

  // await client.set("key", "value") // guardar variable

  await client.set(
    "usuarios",
    JSON.stringify(response.data) // transf json a str
  )
  res.json(response.data)
}) */

/* app.get("/users/:id", async (req, res) => {
  try {
    // buscar en redis
    const value = await client.get(req.originalUrl)
    if (value) {
      return res.json(JSON.parse(value))
    }

    // buscar en api
    const response = await axios.get(
      `${cfg.API_BASE_URL}/users/${req.params.id}`
    )
    console.log("api")

    await client.set(req.originalUrl, JSON.stringify(response.data))

    await client.expire(req.originalUrl, 43200) // 12hrs

    return res.json(response.data)
  } catch (error) {
    console.log(error.message)
    return res.status(error.response.status).json({ msj: error.message })
  }
}) */

//error 404
app.use("*", function (req, res, next) {
  res.status(404).json({ msj: "route not found" })
  next()
})

/* app.listen(cfg.NODE_LOCAL_PORT) // 4000 ó 3000
console.log("server on port", cfg.NODE_LOCAL_PORT) */

app.listen(cfg.NODE_DOCKER_PORT)
console.log("server on port", cfg.NODE_DOCKER_PORT)