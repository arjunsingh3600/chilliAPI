var express = require("express");

var cors = require("cors");
var app = express();
app.use(cors());
app.use(express.json());

var chillies = [];

app.get("/chillies", (req, res) => {
  res.send(chillies);
  console.log("get all chillies");
});

app.get("/chillies/:id", (req, res) => {
  console.log(`getting a chilli with id ${req.params.id}`);

  // check if a chilli with matching id was found
  var chilliMatch = chillies.find((c) => c.id == req.params.id);

  // if no id was found send chilliMatch will be undefined which is falsy

  if (chilliMatch) {
    res.send(chilliMatch);
  } else {
    res
      .sendStatus(400);
  }
});

app.post("/chillies", (req, res) => {
  console.log("adding a chilli");

  // check if new chilli object is not empty

  const newChilli = { ...req.body, id: chillies.length };

  chillies.push(newChilli);
  res.send(newChilli);
});

app.put("/chillies/:id", (req, res) => {
  var chilliIndex = chillies.findIndex((c) => c.id == req.params.id);

  // if no id was found send chilliMatch will be undefined which is falsy

  if (chilliIndex != -1) {
    chillies[chilliIndex] = req.body;
  } else {
    res
      .sendStatus(400);
  }
});

app.delete("/chillies/:id", (req, res) => {
  console.log(`delete a chilli with id ${req.params.id}`);

  let deletedChilli = chillies.find((c) => c.id == req.params.id);

  if (!deletedChilli) {
    res
      .sendStatus(400)
  } else {
    chillies = chillies.filter((c) => c.id != req.params.id);
    res.send(deletedChilli);
  }
});

app.use("/*", (req, res) => { 
  res.sendStatus("404");
});

app.listen(3001, () => {
  console.log("listening on port 3001");
});
