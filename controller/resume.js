const fs = require("fs");
const path = require("path");
const PDFParser = require("pdf2json");
const ResumeParser = require("simple-resume-parser");

exports.resumeParser = async (req, res) => {
  try {
    let filePath = path.join(__dirname, "../", req.files.resume.path);
    let fileName = req.files.resume.name;
    console.log(req.files.resume, " ==:== ", filePath);
    let pdfParser = new PDFParser(this, 1);
    pdfParser.on("pdfParser_dataError", (errData) => {
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (cb) => {});
      }
      console.error(errData.parserError);
      return res.status(404).json({ error: errData.parserError });
    });
    pdfParser.on("pdfParser_dataReady", async (pdfData) => {
      let rt = new ResumeParser(filePath);
      let dt = await rt.parseToJSON();
      if (dt.parts) {
        let fontSizes = [];
        let fonts = [];
        let pages = pdfData.formImage.Pages;
        fontSizes.push(pages[0].Texts[2].R[0].TS[1]);
        let n = pages[0].Texts[2].R[0].TS[0];
        if (n === 0) {
          fonts.push("QuickType,Arial,Helvetica,sans-serif");
        }
        if (n === 1) {
          fonts.push(
            "QuickType Condensed,Arial Narrow,Arial,Helvetica,sans-serif"
          );
        }
        if (n === 2) {
          fonts.push("QuickTypePi");
        }
        if (n === 3) {
          fonts.push("QuickType Mono,Courier New,Courier,monospace");
        }
        if (n === 4) {
          fonts.push("OCR-A,Courier New,Courier,monospace");
        }
        if (n === 5) {
          fonts.push("OCR B MT,Courier New,Courier,monospace");
        }

        let str = pdfParser.getRawTextContent();
        let result = {
          totalChars: str.split(" ").length,
          totalLines: str.split("\n").length,
          totalPages: pages.length,
          fileName,
          fontSizes,
          fonts,
          name: dt.parts.name || null,
          email: dt.parts.email || null,
          phone: dt.parts.phone || null,
          socialMedia: dt.parts.profiles || null,
          languages: dt.parts.languages || null,
          skills: dt.parts.skills || null,
          education: dt.parts.education || null,
          experience: dt.parts.experience || null,
          projects: dt.parts.projects || null,
        };
        if (fs.existsSync(filePath)) {
          fs.unlink(filePath, (cb) => {});
        }
        return res.json(result);
      } else {
        return res.status(400).json({ msg: "Something went wrong" });
      }
    });
    pdfParser.loadPDF(filePath);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Something went wrong." });
  }
};
