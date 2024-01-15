import express from "express"
import axios from "axios"
import responseTime from "response-time"
import { createClient } from "redis"

const app = express()

// middlewares
app.use(responseTime())

const client = await createClient()
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect()

app.get("/", async (req, res) => {
  // const value = await client.get("key")
  const value = await client.get("usuarios")
  if (value) {
    console.log("value")
    console.log(JSON.parse(value)) // transf str a json
    return res.json(JSON.parse(value))
  }

  const response = await axios.get("https://jsonplaceholder.typicode.com/users")
  console.log('api')

  // await client.set("key", "value") // guardar variable

  await client.set(
    "usuarios",
    JSON.stringify(response.data) // transf json a str
  )
  res.json(response.data)
})

app.listen(3000)
console.log("server on port", 3000)
