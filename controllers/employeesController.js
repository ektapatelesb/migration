const {Sequelize,Op}=require('sequelize');
var db = require('../models/index')
var Employees = db.employees;
var getEmployees= async(req,res)=>{
  const data = await Employees.findAll({});//select * from....

  res.status(200).json({data:data});
}
var getPage =async(req,res)=>{
  let page= req.query.page; 
  let limit=10;
  let offset= (page-1)*limit;
  const data = await Employees.findAll({
     offset:offset,
     limit:limit
  })
  res.status(200).json({data:data,page:page,limit:limit,offset:offset});

}
var getSort = async(req,res)=>{
  let page= req.query.page; 
  let limit=10;
  let offset= (page-1)*limit;
  let sort= req.query.sort;
  let id = req.params.id;
 
      const data = await db.Employees.findAll({
        offset:offset,
        limit:limit,
        order:[["firstName","DESC"]]
        
     })
     res.status(200).json({data:data,sort:sort,page:page,limit:limit,offset:offset});
}


module.exports={getEmployees,getPage,getSort}
