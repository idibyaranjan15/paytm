import { Router } from "express";
import {
  bulk,
  signin,
  signup,
  update,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Sup! Universe");
});

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/bulk", bulk);
router.put("/edit", update);
export default router;
