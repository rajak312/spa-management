const fs = require("fs");
const path = require("path");

const loadAppointmentsFromFile = () => {
  try {
    const data = fs.readFileSync(
      path.join(__dirname, "../appointments.txt"),
      "utf8"
    );
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const saveAppointmentsToFile = (appointments) => {
  fs.writeFileSync(
    path.join(__dirname, "../appointments.txt"),
    JSON.stringify(appointments, null, 2)
  );
};

const bookOrModifyAppointment = (req, res) => {
  const { name, email, phone, service, time, date, notes } = req.body;
  const appointments = loadAppointmentsFromFile();

  const existingAppointmentIndex = appointments.findIndex(
    (app) => app.phone === phone
  );

  const appointment = {
    name,
    email,
    phone,
    service,
    time,
    date,
    notes,
  };

  if (existingAppointmentIndex !== -1) {
    appointments[existingAppointmentIndex] = appointment;
    res.send("Your appointment has been modified successfully.");
  } else {
    appointments.push(appointment);
    res.send("Your appointment has been booked successfully.");
  }

  saveAppointmentsToFile(appointments);
};

const cancelAppointment = (req, res) => {
  const { phone } = req.body;
  const appointments = loadAppointmentsFromFile();

  const appointmentIndex = appointments.findIndex((app) => app.phone === phone);
  if (appointmentIndex === -1) {
    return res
      .status(404)
      .send("Appointment not found for the provided phone number.");
  }

  appointments.splice(appointmentIndex, 1);
  saveAppointmentsToFile(appointments);
  res.send("Your appointment has been canceled.");
};

module.exports = {
  bookOrModifyAppointment,
  cancelAppointment,
};
