import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Sup! Universe");
});

export default router;
