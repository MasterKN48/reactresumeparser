require("dotenv").config();
const express = require("express");
const compression = require("compression");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const app = express();

//* middleware
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//* setup the logger
app.use(morgan("dev"));

app.use(cors());

const resumeRoute = require("./routes/resume");
app.use("/api", resumeRoute);

// Serve Static Assets in production
// set static folder
app.use(express.static("client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server started on ${process.env.PORT}`);
});
