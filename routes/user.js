const express = require("express");
const router = express.Router();

const {
  getAll,
  login,
  create,
  updateUser,
  getOne,
  deleteUser,
  getUserByRole
} = require("../controllers/users");
const { authenticateToken } = require("../utils/generateToken");

router
  .get("/users", authenticateToken, getAll)
  .get("/users/:id", authenticateToken, getOne)
  .get("/usersbyrole", authenticateToken, getUserByRole)
  .post("/login", login)
  .post("/users/create", authenticateToken, create)
  .put("/users/update/:id", authenticateToken, updateUser)
  .delete("/users/delete/:id", authenticateToken, deleteUser);

module.exports = router;
