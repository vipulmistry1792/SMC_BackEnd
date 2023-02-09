const sql = require('mssql');
const sql_config={
    user:'sa',
    password:'Velox@123',
    server:'192.168.1.97',
    database:'misc_report',
	port:1443,
	encrypt: false
}

sql.on('error',err=>{
    console.log('SQL Error');
    console.log(err);
})

var conx;

sql.connect(sql_config).then(pool=>{
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