const express = require('express')
var bodeParser = require('body-parser')
const app = express()
require('./models/employees')
require('./models/users')
require('./models/user_contacts')
var userCtrl = require('./controllers/userController')
var employeesCtrl = require('./controllers/employeesController')
var associationCtrl = require('./controllers/associationController')
app.use(bodeParser.json())

app.get('/', function (req, res) {
  res.send('Hello World')
})
//employeecontroller's end points
app.get('/employees',employeesCtrl.getEmployees);
app.get('/employee',employeesCtrl.getPage);
app.get('/sort',employeesCtrl.getSort);
app.get('/search',employeesCtrl.getSearch);

//usercontroller's end points
// app.get('/paranoid',userCtrl.paranoidUser)
app.get('/polymorphic',userCtrl.polymorphic);
app.get('/polymorphic-many',userCtrl.polymorphicMany)
app.get('/scopes',userCtrl.scopes)


//associationcontroller's end points for one-to-one 
app.get('/one-to-one',associationCtrl.getOneToOne)
app.get('/oto',associationCtrl.oneToOne)

//associationcontroller's end points for one-to-many
app.get('/one-to-many',associationCtrl.getOneToMany)
app.get('/otm',associationCtrl.oneToMany)

//associationcontroller's end points for many-to-many
app.get('/many-to-many',associationCtrl.getManyToMany)



app.listen(8080,()=>{
  console.log('App will run on 8080 port');
})