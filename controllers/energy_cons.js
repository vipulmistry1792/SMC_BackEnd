const sql = require('../config/db');

exports.energydata=async (req,res,next)=>{
    const {from_date,to_date} =req.body;  
    const result1 =await sql("select * from  tbl_daily_energy where em_date between @from and @to", {from: from_date, to: to_date}).then(result=>{
        return result
    });       

    res.send(result1);
}
exports.energydata_history=async (req,res,next)=>{
    const {from_date,to_date,tablename} =req.body;
    let table_name= req.body.tablename; 
    const result1 =await sql(`select * from  ${table_name} where datetime between @from and @to`, {table: tablename,from: from_date, to: to_date}).then(result=>{
        return result
    });       

    res.send(result1);
}
exports.energydata_meter_montly=async (req,res,next)=>{
    const {from_date,to_date,tablename} =req.body;
    let table_name= req.body.tablename; 
    table_name=table_name+'_energy';
    //console.log(table_name);
    // const result1 =await sql(`SELECT * FROM (SELECT YEAR([em_date]) [Year],DATENAME(MONTH, [em_date]) [Month],ISNULL(sum(@table),0) [Sales Count]FROM tbl_daily_energy GROUP BY YEAR(em_date),DATENAME(MONTH, em_date)) AS MontlySalesData PIVOT( SUM([Sales Count]) FOR Month IN ([January],[February],[March],[April],[May],[June],[July],[August],[September],[October],[November],[December])) AS MNamePivot`, {table: tablename,from: from_date, to: to_date}).then(result=>{
    //     return result
    // });
    const result1 =await sql(`SELECT * FROM (SELECT YEAR([em_date]) [Year],DATENAME(MONTH, [em_date]) [Month],ISNULL(sum(${table_name}),0) [Sales Count]FROM tbl_daily_energy GROUP BY YEAR(em_date),DATENAME(MONTH, em_date)) AS MontlySalesData PIVOT( SUM([Sales Count]) FOR Month IN ([January],[February],[March],[April],[May],[June],[July],[August],[September],[October],[November],[December])) AS MNamePivot`).then(result=>{
        return result
    });
    res.send(result1);
}
exports.energydata_meter_day=async (req,res,next)=>{
    const {from_date,to_date,tablename} =req.body;
    let table_name= req.body.tablename; 
    table_name=table_name+'_energy';
    const result1 =await sql(`SELECT * FROM (SELECT YEAR([em_date]) [Year],DATENAME(MONTH, [em_date]) [Month],DATENAME(DAY, [em_date]) [DATE_U],ISNULL(sum(${table_name}),0) [Sales Count] FROM tbl_daily_energy where [em_date] between @from and @to GROUP BY YEAR(em_date),DATENAME(MONTH, em_date),DATENAME(DAY, em_date)) AS MontlySalesData PIVOT( SUM([Sales Count]) FOR DATE_U IN ([1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17],[18],[19],[20],[21],[22],[23],[24],[25],[26],[27],[28],[29],[30],[31])) AS MNamePivot`,{table: tablename,from: from_date, to: to_date}).then(result=>{
        return result
    });
    res.send(result1);
}
exports.energydata_meter_day1=async (req,res,next)=>{
    const {from_date,to_date,tablename} =req.body;
    let table_name=''; 
    let table_name1='';
    
    for (let index = 1; index <= 20; index++) {
        
        if(index==20){
            table_name=table_name+`sum(em${index}_energy) [Meter${index}]`
            table_name1=table_name1+`[Meter${index}]`
        }
        else{
            table_name=table_name+`sum(em${index}_energy) [Meter${index}],`
            table_name1=table_name1+`[Meter${index}],`
        }
        
    }   
    console.log(table_name1);
    const result1 =await sql(`SELECT * FROM (SELECT YEAR([em_date]) [Year],DATENAME(MONTH, [em_date]) [Month],[em_date] [DATE_TIME], ${table_name} FROM tbl_daily_energy where [em_date] between @from and @to GROUP BY YEAR(em_date),DATENAME(MONTH, em_date), em_date) AS MontlySalesData `,{table: tablename,from: from_date, to: to_date}).then(result=>{
        return result
    });
    res.send(result1);
}