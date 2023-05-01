const asyncHandler = require("express-async-handler");
const moment = require("moment");
const User = require("../models").User;
const Vehicule = require("../models").Vehicule;
const Cout = require("../models").Cout;

exports.getAll = asyncHandler(async (req, res) => {
  try {
    const couts = await Cout.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Vehicule,
        },
      ],
    });
    if (couts)
      res.status(201).json({ status: true, message: "success", data: couts });
    else res.status(201).json({ status: false, message: "empty", data: null });
  } catch (error) {
    res.send(error);
  }
});

exports.getOne = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    return res.status(401).json({ detail: "Invalid Id" });
  }
  try {
    const cout = await Cout.findByPk(req.params.id);
    if (cout)
      res.status(201).json({ status: true, message: "success", data: cout });
    else res.status(201).json({ status: false, message: "empty", data: null });
  } catch (error) {
    res.send(error);
  }
});

exports.create = asyncHandler(async (req, res) => {
  // UserId VehiculeId
  try {
    const cout = await Cout.create(req.body);
    if (cout) {
      res.status(201).json({ status: true, message: "success", data: cout });
    } else {
      res.status(400).json({ detail: "Invalid Cout data" });
    }
  } catch (error) {
    res.send(error);
  }
});

exports.update = asyncHandler(async (req, res) => {
  try {
    await Cout.update(req.body, {
      where: { id: req.params.id },
    })
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

exports.deleteCout = asyncHandler(async (req, res) => {
  try {
    await Cout.destroy({ where: { id: req.params.id } })
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
