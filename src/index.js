const express = require("express");
const morgan = require("morgan");
const path = require("path");
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://localhost/mevn-database')
  .then(db => console.log("DB is conected"))
  .catch(err => console.error(err))

// settigns
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use('/api/tasks', require('./routes/tasks'))
// console.log()

// Static Files
// console.log(path.join(__dirname, 'public'))
app.use(express.static(path.join(__dirname, "public")));

// servidor escuchando
app.listen(app.get("port"), () => {
  console.log("Servidor en puerto:", app.get("port"));
});
