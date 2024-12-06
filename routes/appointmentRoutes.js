const express = require("express");
const path = require("path");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "index.html"));
});

router.post("/submit-booking", appointmentController.bookOrModifyAppointment);

router.post(
  "/modify-appointment",
  appointmentController.bookOrModifyAppointment
);

router.post("/cancel-appointment", appointmentController.cancelAppointment);

module.exports = router;
