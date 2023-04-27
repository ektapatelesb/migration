const express = require('express')
var bodeParser = require('body-parser')
const app = express()
require('./models/employees')
var employeesCtrl = require('./controllers/employeesController')
app.use(bodeParser.json())

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/employees',employeesCtrl.getEmployees);
app.get('/employee',employeesCtrl.getPage)
app.get('/sort',employeesCtrl.getSort)


app.listen(8080,()=>{
  console.log('App will run on 8080 port');
})