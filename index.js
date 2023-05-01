const express = require("express");
const dotenv = require('dotenv')
const cors = require('cors')
const { readdirSync } = require('fs')
const db = require('./models');


const app = express();


const PORT = 3000;

dotenv.config()
app.use(cors())
app.use(express.json())
db.sequelize.sync({ alter: true });

readdirSync('./routes').map((r) => {
    app.use('/api', require(`./routes/${r}`))
})
app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
