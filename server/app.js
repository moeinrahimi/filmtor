const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const db = require('./models')
const config = require('./config.json')
const settingRouter = require('./controllers/SettingController')
const movieRouter = require('./controllers/MovieController')
const streamRouter = require('./controllers/StreamController')
let app = express()
app.server = http.createServer(app)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json())
app.use('/api/v1/settings', settingRouter)
app.use('/api/v1/movies', movieRouter)
app.use('/api/v1/stream', streamRouter)
db.sequelize.sync(
  // { force: true }
).then(function () {
}).catch(err => {
  console.log(`Sequelize issue:\nerr name :${err.name}\nerr message :  ${err.message}`)
});

app.server.listen(config.port, () => {
  console.log(`filmtor Started on port ${app.server.address().port}`);
});


module.exports.app = app 