const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const db = require('./models')
const config = require('./config.json')
const settingRouter = require('./controllers/SettingController')
let app = express()
app.server = http.createServer(app)

app.use(bodyParser.json())
app.use('/api/v1/settings',settingRouter)
db.sequelize.sync(
  // {force: true}
).then(function () {
}).catch(err=>{
  console.log(`Sequelize issue:\nerr name :${err.name}\nerr message :  ${err.message}`)
});

app.server.listen(config.port, () => {
  console.log(`filmtor Started on port ${app.server.address().port}`);
});


module.exports.app = app 