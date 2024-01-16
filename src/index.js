import express from "express"
import axios from "axios"
import responseTime from "response-time"
import { createClient } from "redis"

const app = express()

// middlewares
app.use(responseTime())

// Connecting to dock-redis or to redis
const client = await createClient()
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect()

app.get("/", async (req, res) => {
  res.send("/users on redis")
})

app.get("/users", async (req, res) => {
  // const value = await client.get("key")
  const value = await client.get("usuarios")
  if (value) {
    return res.json(JSON.parse(value))
  }

  const response = await axios.get("https://jsonplaceholder.typicode.com/users")

  // await client.set("key", "value") // guardar variable

  await client.set(
    "usuarios",
    JSON.stringify(response.data) // transf json a str
  )
  res.json(response.data)
})

app.get("/users/:id", async (req, res) => {
  try {
    // buscar en redis
    const value = await client.get(req.originalUrl)
    if (value) {
      return res.json(JSON.parse(value))
    }

    // buscar en api
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users/" + req.params.id
    )

    await client.set(req.originalUrl, JSON.stringify(response.data))

    return res.json(response.data)
  } catch (error) {
    return res.status(error.response.status).json({ msj: error.message })
  }
})

//error 404
app.use("*", function (req, res, next) {
  res.status(404).json({ msj: "route not found" })
  next()
})

app.listen(3000)
console.log("server on port", 3000)
