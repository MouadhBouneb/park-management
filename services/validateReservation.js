const User = require("../models").User;
const Vehicule = require("../models").Vehicule;
const Reservation = require("../models").Reservation;
const Rapport = require("../models").Rapport;

exports.validateReservation = async (idReservation) => {
  const reservation = await Reservation.findOne({
    where: { id: idReservation },
    include: [
      {
        model: User,
      },
      {
        model: Vehicule,
      },
    ],
  });
  await Vehicule.update(
    { UserId: reservation.UserId, isDisponible:false },
    {
      where: { id: reservation.VehiculeId },
    }
  );
  await User.update(
    { VehiculeId: reservation.VehiculeId },
    {
      where: { id: reservation.UserId },
    }
  );
  await Rapport.create({
    dateEntrer: reservation.dateFin,
    dateSortie: reservation.dateDebut,
    UserId: reservation.UserId,
    VehiculeId: reservation.VehiculeId,
  });
};
