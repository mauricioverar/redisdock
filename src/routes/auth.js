import { Router } from "express" // const router = Router(); // export default router;

const router = Router()

let msg = ""
let proy = { name: "proy", is_admin: false }

// index
router.get("/", async (req, res) => {
  //protected_route,
  try {
    res.render("index.html", { proy})
  } catch (error) {
    console.log(error)
  }
})


export default router
