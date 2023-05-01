const asyncHandler = require("express-async-handler");
const moment = require("moment");
const vehicule = require("../models/vehicule");
const User = require("../models").User;
const Vehicule = require("../models").Vehicule;

exports.getAll = asyncHandler(async (req, res) => {
  try {
    const vehicules = await Vehicule.findAll({
      include: [
        {
          model: User,
        },
      ],
    });
    if (vehicules)
      res
        .status(201)
        .json({ status: true, message: "success", data: vehicules });
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
    const vehicule = await Vehicule.findByPk(req.params.id);
    if (vehicule)
      res
        .status(201)
        .json({ status: true, message: "success", data: vehicule });
    else res.status(201).json({ status: false, message: "empty", data: null });
  } catch (error) {
    res.send(error);
  }
});

exports.create = asyncHandler(async (req, res) => {
  try {
    if (req.body.dateExpirationAssurance) {
      req.body.dateExpirationAssurance = moment(
        req.body.dateExpirationAssurance
      ).format("YYYY-MM-DD HH:mm:ss");
    }
    const vehicule = await Vehicule.create(req.body);
    if (vehicule) {
      res
        .status(201)
        .json({ status: true, message: "success", data: vehicule });
    } else {
      res.status(400).json({ detail: "Invalid Vehicule data" });
    }
  } catch (error) {
    res.send(error);
  }
});

exports.update = asyncHandler(async (req, res) => {
  try {
    await Vehicule.update(req.body, {
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

exports.deleteVehicule = asyncHandler(async (req, res) => {
  try {
    await Vehicule.destroy({ where: { id: req.params.id } })
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

exports.VehiculeReturned = asyncHandler(async (req, res) => {
  try {
    await Vehicule.update(
      { isDisponible: true },
      {
        where: { id: req.params.id },
      }
    )
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
