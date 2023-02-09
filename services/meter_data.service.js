const db = require('../helpers/db');
const helper = require('../helpers/helpers');
const config1 = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var dateTime = require('node-datetime');
module.exports = {
    meterhistory,
    MonthlyData,
    MeterDataDaywise,
    FaultHistory,
    FaultSummary,
    FaultbyequipmentSummary,
    ConsumptionEnergy,
    ThisMonthData,
    dghistory,
    Dgconsumption,
    DgStatus

};
async function meterhistory(emname){
    
    let emn=emname.machineno;
    let startdate=emname.start_date;
    let enddate=emname.end_date;
    console.log(`${startdate} === ${enddate} `)
   // console.log(`select datetime,volt,volt1,volt2,volt3 ,curr,curr1,curr2,curr3,pf,kwh,kw,kva from ${emn} where datetime between '${startdate}' and '${enddate}'`)
    const rows = await db(
        `select datetime,volt,volt1,volt2,volt3 ,curr,curr1,curr2,curr3,pf,kwh,kw,kva from ${emn} where datetime between '${startdate}' and '${enddate}'`
      );
      const data = helper.emptyOrRows(rows);
   //console.log(rows)
    //const meta = {page};
    return data;
  }
  async function dghistory(emname){
    
    let emn=emname.machineno;
    let startdate=emname.start_date;
    let enddate=emname.end_date;
console.log(`${startdate} == ${enddate}`)
    const rows = await db(
        `select *  from ${emn} where datetime between '${startdate}' and '${enddate}'`
      );
      const data = helper.emptyOrRows(rows);
   //console.log(rows)
    //const meta = {page};
    return data;
  }
  async function MonthlyData(emname){
    let table_name= emname.machineno;
    table_name=table_name+'_energy';
    //console.log(`SELECT * FROM (SELECT YEAR([em_date]) [Year],DATENAME(MONTH, [em_date]) [Month],ISNULL(sum(${table_name}),0) [Sales Count]FROM tbl_daily_energy GROUP BY YEAR(em_date),DATENAME(MONTH, em_date)) AS MontlySalesData PIVOT( SUM([Sales Count]) FOR Month IN ([January],[February],[March],[April],[May],[June],[July],[August],[September],[October],[November],[December])) AS MNamePivot`)
    const result1 =await db(`SELECT * FROM (SELECT YEAR([em_date]) [Year],DATENAME(MONTH, [em_date]) [Month],ISNULL(sum(${table_name}),0) [Sales Count]FROM tbl_daily_energy GROUP BY YEAR(em_date),DATENAME(MONTH, em_date)) AS MontlySalesData PIVOT( SUM([Sales Count]) FOR Month IN ([January],[February],[March],[April],[May],[June],[July],[August],[September],[October],[November],[December])) AS MNamePivot`)
    //console.log(result1)
    const data = helper.emptyOrRows(result1);
   // console.log(data)
    return data;
  }
  async function MeterDataDaywise(emname){
    
    let emn=emname.machineno;
    let startdate=emname.start_date;
    let enddate=emname.end_date;
    let table_name=emname.machineno+'_energy';
   //console.log(`SELECT * FROM (SELECT YEAR([em_date]) [Year],DATENAME(MONTH, [em_date]) [Month],DATENAME(DAY, [em_date]) [DATE_U],ISNULL(sum(${table_name}),0) UsedEnergy FROM tbl_daily_energy where [em_date] between '${startdate}' and '${enddate}' GROUP BY YEAR(em_date),DATENAME(MONTH, em_date),DATENAME(DAY, em_date)) AS MontlyEnergyData PIVOT( SUM([UsedEnergy]) FOR DATE_U IN ([1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17],[18],[19],[20],[21],[22],[23],[24],[25],[26],[27],[28],[29],[30],[31])) AS MNamePivot`)
    const rows = await db(`SELECT * FROM (SELECT YEAR([em_date]) [Year],DATENAME(MONTH, [em_date]) [Month],DATENAME(DAY, [em_date]) [DATE_U],ISNULL(sum(${table_name}),0) UsedEnergy FROM tbl_daily_energy where [em_date] between '${startdate}' and '${enddate}' GROUP BY YEAR(em_date),DATENAME(MONTH, em_date),DATENAME(DAY, em_date)) AS MontlyEnergyData PIVOT( SUM([UsedEnergy]) FOR DATE_U IN ([1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17],[18],[19],[20],[21],[22],[23],[24],[25],[26],[27],[28],[29],[30],[31])) AS MNamePivot`);
    const data = helper.emptyOrRows(rows);
    
    return data;
    }
    async function FaultHistory(emname){
    
      let emn=emname.machineno;
      let startdate=emname.start_date;
      let enddate=emname.end_date;
      let table_name=emname.machineno+'_energy';
     //console.log(`SELECT * FROM (SELECT YEAR([em_date]) [Year],DATENAME(MONTH, [em_date]) [Month],DATENAME(DAY, [em_date]) [DATE_U],ISNULL(sum(${table_name}),0) UsedEnergy FROM tbl_daily_energy where [em_date] between '${startdate}' and '${enddate}' GROUP BY YEAR(em_date),DATENAME(MONTH, em_date),DATENAME(DAY, em_date)) AS MontlyEnergyData PIVOT( SUM([UsedEnergy]) FOR DATE_U IN ([1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17],[18],[19],[20],[21],[22],[23],[24],[25],[26],[27],[28],[29],[30],[31])) AS MNamePivot`)
      const rows = await db(`select * from fault where datetime between '${startdate}' and '${enddate}'`);
      const data = helper.emptyOrRows(rows);      
      return data;
      }
      async function FaultSummary(emname){
    
        let emn=emname.machineno;
        let startdate=emname.start_date;
        let enddate=emname.end_date;
        let table_name=emname.machineno+'_energy';
       //console.log(`SELECT * FROM (SELECT YEAR([em_date]) [Year],DATENAME(MONTH, [em_date]) [Month],DATENAME(DAY, [em_date]) [DATE_U],ISNULL(sum(${table_name}),0) UsedEnergy FROM tbl_daily_energy where [em_date] between '${startdate}' and '${enddate}' GROUP BY YEAR(em_date),DATENAME(MONTH, em_date),DATENAME(DAY, em_date)) AS MontlyEnergyData PIVOT( SUM([UsedEnergy]) FOR DATE_U IN ([1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17],[18],[19],[20],[21],[22],[23],[24],[25],[26],[27],[28],[29],[30],[31])) AS MNamePivot`)
        const rows = await db(`select faultname,count(faultname) as count from fault where datetime between '${startdate}' and '${enddate}' group  by faultname`);
        const data = helper.emptyOrRows(rows);      
        return data;
        }
        async function FaultbyequipmentSummary(emname){
    
          let emn=emname.machineno;
          let startdate=emname.start_date;
          let enddate=emname.end_date;
          let table_name=emname.machineno+'_energy';
         //console.log(`SELECT * FROM (SELECT YEAR([em_date]) [Year],DATENAME(MONTH, [em_date]) [Month],DATENAME(DAY, [em_date]) [DATE_U],ISNULL(sum(${table_name}),0) UsedEnergy FROM tbl_daily_energy where [em_date] between '${startdate}' and '${enddate}' GROUP BY YEAR(em_date),DATENAME(MONTH, em_date),DATENAME(DAY, em_date)) AS MontlyEnergyData PIVOT( SUM([UsedEnergy]) FOR DATE_U IN ([1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17],[18],[19],[20],[21],[22],[23],[24],[25],[26],[27],[28],[29],[30],[31])) AS MNamePivot`)
          const rows = await db(`select faultname,equipment_group,count(faultname) as count from fault where datetime between '${startdate}' and '${enddate}' group  by equipment_group,faultname`);
          const data = helper.emptyOrRows(rows);      
          return data;
          }
          async function ConsumptionEnergy(emname){
    
            let emn=emname.machineno;
            let startdate=emname.start_date;
            let enddate=emname.end_date;
            let table_name=emname.machineno+'_energy';
           //console.log(`SELECT * FROM (SELECT YEAR([em_date]) [Year],DATENAME(MONTH, [em_date]) [Month],DATENAME(DAY, [em_date]) [DATE_U],ISNULL(sum(${table_name}),0) UsedEnergy FROM tbl_daily_energy where [em_date] between '${startdate}' and '${enddate}' GROUP BY YEAR(em_date),DATENAME(MONTH, em_date),DATENAME(DAY, em_date)) AS MontlyEnergyData PIVOT( SUM([UsedEnergy]) FOR DATE_U IN ([1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14],[15],[16],[17],[18],[19],[20],[21],[22],[23],[24],[25],[26],[27],[28],[29],[30],[31])) AS MNamePivot`)
            const rows = await db(`select *  from tbl_daily_energy where em_date between '${startdate}' and '${enddate}'`);
            const data = helper.emptyOrRows(rows);      
            return data;
            }
            async function ThisMonthData(emname){
    
              let emn=emname.machineno;
              let startdate=emname.start_date;
              let enddate=emname.end_date;
              let table_name=emname.machineno+'_energy';
          //   console.log(`select *  from tbl_daily_energy where em_date >=datefromparts(year(getdate()),month(getdate()),1) and em_date< dateadd(month,1,datefromparts(year(getdate()),month(getdate()),1))`)
              const rows = await db(`select *  from tbl_daily_energy where em_date >=datefromparts(year(getdate()),month(getdate()),1) and em_date< dateadd(month,1,datefromparts(year(getdate()),month(getdate()),1))`);
              const data = helper.emptyOrRows(rows);      
              return data;
              }
              async function Dgconsumption(emname){
    
                let emn=emname.machineno;
                let startdate=emname.start_date;
                let enddate=emname.end_date;
                let table_name=emname.machineno+'_energy';
                const rows = await db(`GetDGPowerConsumption`,[startdate,enddate]);
                const data = helper.emptyOrRows(rows);      
                return data;
                }
                async function DgStatus(emname){
    
                  let emn=emname.machineno;
                  //console.log(emn)
                  let startdate=emname.start_date;
                  let enddate=emname.end_date;
                  let table_name=emname.machineno+'_energy';

                  const rows = await db(`select a.dg_name as DGName,CASE WHEN a.dg_status = 1 THEN 'ON' ELSE 'OFF' END as Status,a.dateTime as TimeStamp,LEAD(a.dateTime,1) OVER (ORDER BY a.dateTime asc)  as EndTime,datediff(minute,a.dateTime,LEAD(a.dateTime,1) OVER (ORDER BY a.dateTime asc)) as Duration from dg_status as a where  (a.dateTime BETWEEN '${startdate}' AND '${enddate}') and a.dg_name='${emn}'`);
                  const data = helper.emptyOrRows(rows); 
                  console.log(data)     
                  return data;
                  }
