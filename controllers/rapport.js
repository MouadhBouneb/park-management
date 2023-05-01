const asyncHandler = require("express-async-handler");
const moment = require("moment");
const User = require("../models").User;
const Vehicule = require("../models").Vehicule;
const Rapport = require("../models").Rapport;
const { Op } = require("sequelize");

exports.getAll = asyncHandler(async (req, res) => {
  try {
    const rapports = await Rapport.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Vehicule,
        },
      ],
    });
    if (rapports)
      res
        .status(201)
        .json({ status: true, message: "success", data: rapports });
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
    const rapport = await Rapport.findByPk(req.params.id);
    if (rapport)
      res.status(201).json({ status: true, message: "success", data: rapport });
    else res.status(201).json({ status: false, message: "empty", data: null });
  } catch (error) {
    res.send(error);
  }
});

exports.create = asyncHandler(async (req, res) => {
  // UserId VehiculeId
  try {
    const rapport = await Rapport.create(req.body);
    if (rapport) {
      res.status(201).json({ status: true, message: "success", data: rapport });
    } else {
      res.status(400).json({ detail: "Invalid Rapport data" });
    }
  } catch (error) {
    res.send(error);
  }
});

exports.update = asyncHandler(async (req, res) => {
  try {
    await Rapport.update(req.body, {
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

exports.deleteRapport = asyncHandler(async (req, res) => {
  try {
    await Rapport.destroy({ where: { id: req.params.id } })
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

// a verifier
exports.etat = asyncHandler(async (req, res) => {
  try {
    const rapports = await Rapport.findAll({
      where: {
        dateEntrer: {
          [Op.lt]: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        },
        dateSortie: {
          [Op.gt]: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        },
      },
      include: [
        {
          model: User,
        },
        {
          model: Vehicule,
        },
      ],
    });
    if (rapports)
      res
        .status(201)
        .json({ status: true, message: "success", data: rapports });
    else res.status(201).json({ status: false, message: "empty", data: null });
  } catch (error) {
    res.send(error);
  }
});
