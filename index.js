const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const app = express();

const PORT = 5211;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));

app.get("/", function (req, res) {
  res.send("Welcome to the server");
});

app.post("/makePDF", function (req, res) {
  const imagePath = req.body.imagePath; // Assuming the request body includes the "imagePath" field with the image path string

  const doc = new PDFDocument();
  const imagePaths = imagePath.split(","); // Split the image path string by commas to get individual image paths

  imagePaths.forEach((imagePath) => {
    const imageFullPath = path.join(__dirname, imagePath); // Get the full path of the image file
    if (fs.existsSync(imageFullPath)) {
      // Check if the image file exists
      doc.image(imageFullPath, 0, 0, { width: 625, height: 900 });
      doc.addPage();
    } else {
      console.log(`Image file not found: ${imageFullPath}`);
    }
  });

  const outputFilePath = path.join(__dirname, "output.pdf");
  doc.pipe(fs.createWriteStream(outputFilePath));
  doc.end();

  res.send("PDF generation complete!");
});

app.listen(PORT, function () {
  console.log(`Server started on port http://localhost:${PORT}`);
});
