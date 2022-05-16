const express = require("express");
const app = express();
const helmet = require("helmet");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUploader = require("express-fileupload");
const serveIndex = require("serve-index");

const mongoose = require("mongoose");

//* mongoose conect *//
const DB = process.env.DB;
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const adminRoutes = require("./routes/admin");
// const helpRoutes = require("./routes/help");
const needTransport = require("./routes/needTransport");
const haveTransport = require("./routes/haveTransport");
const usersRoutes = require("./routes/user");

app.use(cors());
app.use(bodyParser.json());
app.use(fileUploader());

app.use("/admin", adminRoutes);
// app.use("/help", helpRoutes);
app.use("/need-transport", needTransport);
app.use("/have-transport", haveTransport);
app.use("/users", usersRoutes);

app.use(
  "/ftp",
  express.static("controllers/uploads"),
  serveIndex("controllers/uploads", { icons: true })
);
app.use(helmet());

app.listen(8000, () => console.log("Server has started on port: 8000"));

module.exports = app;
