const express = require("express");
const router = express.Router();
const formidable = require("express-formidable");

const { resumeParser } = require("../controller/resume");

router.get("/", (req, res) => {
  return res.send("Ping Pong");
});

router.post(
  "/parse",
  formidable({
    encoding: "utf-8",
    uploadDir: "./upload",
    multiples: false,
    keepExtensions: true,
    maxFileSize: 4 * 1024 * 1024,
  }),
  resumeParser
);

module.exports = router;
