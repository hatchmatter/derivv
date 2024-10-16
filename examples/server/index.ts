import express from "express";
import multer from "multer";
import cors from "cors";
import crypto from "crypto";

const app = express();

app.use(cors());

var storage = multer.diskStorage({
  destination: './tmp/',
  filename: function (_req, file, cb) {
    crypto.pseudoRandomBytes(4, function (err, raw) {
      if (err) return cb(err, '')

      cb(null, raw.toString('hex') + '-' + file.originalname)
    })
  }
})

const upload = multer({ storage });

app.post("/upload", upload.array("files"), (_req, res) => {
  res.send("ok");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});