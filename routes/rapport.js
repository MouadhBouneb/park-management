const express = require("express");
const router = express.Router();

const {
  getAll,
  getOne,
  create,
  update,
  deleteRapport,
  etat
} = require("../controllers/rapport");
const { authenticateToken } = require("../utils/generateToken");

router
  .get("/rapports", authenticateToken, getAll)
  .get("/rapports/etat", authenticateToken, etat)
  .get("/rapports/:id", authenticateToken, getOne)
  .post("/rapports/create", authenticateToken, create)
  .put("/rapports/update/:id", authenticateToken, update)
  .delete("/rapports/delete/:id", authenticateToken, deleteRapport);

module.exports = router;
