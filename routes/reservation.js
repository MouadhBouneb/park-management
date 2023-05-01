const express = require("express");
const router = express.Router();

const {
  getAll,
  getOne,
  create,
  update,
  deleteReservation,
  validate
} = require("../controllers/reservation");
const { authenticateToken } = require("../utils/generateToken");

router
  .get("/reservations", authenticateToken, getAll)
  .get("/reservations/:id", authenticateToken, getOne)
  .post("/reservations/create", authenticateToken, create)
  .get("/reservations/validate/:id", authenticateToken, validate)
  .put("/reservations/update/:id", authenticateToken, update)
  .delete("/reservations/delete/:id", authenticateToken, deleteReservation);

module.exports = router;
