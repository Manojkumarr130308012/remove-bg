const express = require("express");
const server = express();
const bodyParser=require('body-parser');
const multer = require('multer');
server.use(bodyParser.json());
const cors = require('cors');
const { removeBackground } = require('@masuhajime/background-removal-node');


server.use(cors());

const upload = multer({ dest: 'images/' });

async function removeImageBackground(imgSource) {
  try {
    console.log("testing",imgSource);
      const blob = await removeBackground(imgSource);
      console.log("testing","testing1");
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
  const resultDataURL = await removeImageBackground(req.file.path);
  res.contentType('image/png');
  res.send(resultDataURL);
});

server.get('/', async (req, res) => {
  res.send("testing");
});

module.exports= server;