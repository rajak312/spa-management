const express = require("express");
const bodyParser = require("body-parser");
const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(appointmentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
