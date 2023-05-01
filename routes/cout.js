const express = require("express");
const router = express.Router();

const {
  getAll,
  getOne,
  create,
  update,
  deleteCout,
} = require("../controllers/cout");
const { authenticateToken } = require("../utils/generateToken");

router
  .get("/couts", authenticateToken, getAll)
  .get("/couts/:id", authenticateToken, getOne)
  .post("/couts/create", authenticateToken, create)
  .put("/couts/update/:id", authenticateToken, update)
  .delete("/couts/delete/:id", authenticateToken, deleteCout);

module.exports = router;
