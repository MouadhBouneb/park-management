const express = require("express");
const router = express.Router();

const {
  getAll,
  getOne,
  create,
  update,
  deleteVehicule,
  VehiculeReturned
} = require("../controllers/vehicules");
const { authenticateToken } = require("../utils/generateToken");

router
  .get("/vehicules", authenticateToken, getAll)
  .get("/vehicules/:id", authenticateToken, getOne)
  .get("/vehicules/returned/:id", authenticateToken, VehiculeReturned)
  .post("/vehicules/create", authenticateToken, create)
  .put("/vehicules/update/:id", authenticateToken, update)
  .delete("/vehicules/delete/:id", authenticateToken, deleteVehicule);

module.exports = router;
