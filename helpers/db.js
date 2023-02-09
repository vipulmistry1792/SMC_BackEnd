const config = require('./config.js');
const sql = require('mssql');
// const config1 = require('./config');
// const pool = sql.createPool(config.db);
sql.on('error',err=>{
  console.log('SQL Error');
  console.log(err);
})
var conx;
sql.connect(config.db).then(pool=>{
  conx=pool;
})
const sql1 = require('mssql');
sql1.on('error',err=>{
	console.log('SQL Error');
	console.log(err);
  })
  var conx;
  sql1.connect(config.db1).then(pool=>{
	conx=pool;
  })
module.exports= async  function(query,params){
	params = params || {}; // default to empty JSON if undefined
	
	var req = conx.request();

	// loop through params JSON and add them as input
	Object.keys(params).forEach(key => {
		req.input(key, params[key]);
	})
		
	return req.query(query).then(result => {
		return  result.recordset;
	}).catch(err => {
		console.log(err);
		return null;
	});  
}