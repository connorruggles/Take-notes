const router = require('express').Router();
const uuidv = require('../helpers/uuid');
const fs = require ("fs");

router.get('/api/notes', async (req, res) => {
  const dbJson = await JSON.parse(fs.readFileSync("db/db.json","utf8"));
  res.json(dbJson);
});
router.post('/api/notes', (req, res) => {
    const dbJson = JSON.parse(fs.readFileSync("db/db.json","utf8"));
    const newTextContent = {
      title: req.body.title,
      text: req.body.text,
      id: uuidv(),
    };
    dbJson.push(newTextContent);
    fs.writeFileSync("db/db.json",JSON.stringify(dbJson));
    res.json(dbJson);
  });

  module.exports = router; 