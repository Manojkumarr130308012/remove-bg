const express = require("express");
const server = express();
const bodyParser=require('body-parser');
const multer = require('multer');
server.use(bodyParser.json());
const cors = require('cors');
const { removeBackground } = require('@imgly/background-removal-node');


server.use(cors());

const upload = multer();

async function removeImageBackground(imgSource) {
  try {
      const blob = await removeBackground(imgSource);
      const buffer = Buffer.from(await blob.arrayBuffer());      
      return buffer;
  } catch (error) {
      throw new Error('Error removing background: ' + error);
  }
}

server.post('/remove_background', upload.single('image'), async (req, res) => {
  if (!req.file) {
      res.status(400).send('No file uploaded.');
      return;
  }
  const resultDataURL = await removeImageBackground("https://i.sstatic.net/GsDIl.jpg");
  res.contentType('image/png');
  res.send(resultDataURL);
});

module.exports= server;