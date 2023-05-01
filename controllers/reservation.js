const asyncHandler = require("express-async-handler");
const moment = require("moment");
const User = require("../models").User;
const Vehicule = require("../models").Vehicule;
const Reservation = require("../models").Reservation;
const {validateReservation} = require('../services/validateReservation')

exports.getAll = asyncHandler(async (req, res) => {
  try {
    const reservation = await Reservation.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Vehicule,
        },
      ],
    });
    if (reservation)
      res
        .status(201)
        .json({ status: true, message: "success", data: reservation });
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
    const reservation = await Reservation.findByPk(req.params.id);
    if (reservation)
      res
        .status(201)
        .json({ status: true, message: "success", data: reservation });
    else res.status(201).json({ status: false, message: "empty", data: null });
  } catch (error) {
    res.send(error);
  }
});

exports.create = asyncHandler(async (req, res) => {
  // UserId VehiculeId
  try {
    const reservation = await Reservation.create(req.body);
    if (reservation) {
      res
        .status(201)
        .json({ status: true, message: "success", data: reservation });
    } else {
      res.status(400).json({ detail: "Invalid Reservation data" });
    }
  } catch (error) {
    res.send(error);
  }
});

exports.update = asyncHandler(async (req, res) => {
  try {
    await Reservation.update(req.body, {
      where: { id: req.params.id },
    })
      .then(() => {
        res.status(201).json({ status: true, message: "success", data: null });
      })
      .catch((error) =>
        res.status(400).json({ status: false, message: "error", error: error })
      );
  } catch (error) {
    res.send(error);
  }
});

exports.deleteReservation = asyncHandler(async (req, res) => {
  try {
    await Reservation.destroy({ where: { id: req.params.id } })
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

exports.validate = asyncHandler(async (req, res) => {
  try {
    await Reservation.update(
      { status: 2 },
      {
        where: { id: req.params.id },
      }
    )
      .then(async () => {
        await validateReservation(req.params.id)
        res.status(201).json({ status: true, message: "success", data: null });
      })
      .catch((error) =>
        res.status(400).json({ status: false, message: "error", error: JSON.stringify(error) })
      );
  } catch (error) {
    res.send(error);
  }
});
