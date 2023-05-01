const asyncHandler = require("express-async-handler");
const User = require("../models").User;
const Vehicule = require("../models").Vehicule;

const { cryptagePassword, matchPassword } = require("../utils/password");
const { generateToken } = require("../utils/generateToken");

exports.getAll = asyncHandler(async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Vehicule,
        },
      ],
    });
    res.send(users);
  } catch (error) {
    res.send(error);
  }
});

exports.getUserByRole = asyncHandler(async (req, res) => {
  if (!req.query.role) {
    return res.status(401).json({ detail: "Invalid Id" });
  }
  try {
    const users = await User.findAll({
      where: {
        role: req.query.role,
      },
      include: [
        {
          model: Vehicule,
        },
      ],
    });
    res.send(users);
  } catch (error) {
    res.send(error);
  }
});

exports.getOne = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    return res.status(401).json({ detail: "Invalid Id" });
  }
  try {
    const users = await User.findByPk(req.params.id);
    res.send(users);
  } catch (error) {
    res.send(error);
  }
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email: email } });

  if (user && (await matchPassword(password, user.password))) {
    res.json({
      id: user.id,
      name: user.fullName,
      email: user.email,
      role: user.role,
      isAdmin: user.isAdmin,
      token: generateToken(user.id),
    });
  } else {
    res.status(401).json({ detail: "Invalid email or password" });
  }
});

exports.create = asyncHandler(async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    const userExists = await User.findOne({ where: { email: email } });
    if (userExists) {
      res.status(400).json({ detail: "User already exists" });
    } else {
      const user = await User.create({
        fullName,
        email,
        password: (await cryptagePassword(password)).toString(),
        role,
      });

      if (user) {
        res.status(201).json({ status: true, message: "success", data: user });
      } else {
        res.status(400).json({ detail: "Invalid user data" });
      }
    }
  } catch (error) {
    res.send(error);
  }
});

exports.updateUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.update(req.body, { where: { id: req.params.id } })
      .then(() =>
        res.status(201).json({ status: true, message: "success", data: null })
      )
      .catch((error) =>
        res.status(400).json({ status: false, message: "error", error: error })
      );
  } catch (error) {
    res.send(error);
  }
});

exports.deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.destroy({ where: { id: req.params.id } })
      .then(() =>
        res.status(201).json({ status: true, message: "success", data: null })
      )
      .catch((error) =>
        res.status(400).json({ status: false, message: "error", error: error })
      );
  } catch (error) {
    res.send(error);
  }
});
