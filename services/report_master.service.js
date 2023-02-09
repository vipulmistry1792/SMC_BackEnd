const db = require('../helpers/db');
const helper = require('../helpers/helpers');
const config1 = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var dateTime = require('node-datetime');
async function getAll_Report() {
    const rows = await db(
        `select * from Report_Master`
      );
      const data = helper.emptyOrRows(rows);
      return data;
}
async function getreportsBywdsid(userParam) {
    const rows = await db(
        `select * from Report_Master where wds_id=${userParam.id}`
      );
      const data = helper.emptyOrRows(rows);
      return data;
}
async function getreportsById(userParam) {
    const rows = await db(
        `select * from Report_Master where id=${userParam.id}`
      );
      const data = helper.emptyOrRows(rows);
      return data;
}
async function getreportsData(userParam) {
    console.log(userParam)
   const query =`${userParam.ReportQuery} Between '${userParam.FromDate}' and '${userParam.ToDate}'`
   console.log(query)
    const rows = await db(query);
      const data = rows;
      return rows;
}
async function create_reports(userParam) {
    //  console.log(userParam);
      // validate
      console.log(userParam)
      const rows = await db(
          `select * from Report_Master where ReportName like '${userParam.ReportName}' and wds_id=${userParam.wds_id}`
        );
        const data = helper.emptyOrRows(rows);
      if (data.length>0) {
          throw 'ReportName "' + userParam.ReportName + '" is already taken';
      }
      const user=userParam;
      return  await db(`insert into Report_Master (wds_id,ReportName,ReportTable,ReportHeader,ReportQuery,is_active) values (@wds_id,@ReportName,@ReportTable,@ReportHeader,@ReportQuery,0)`,{wds_id:user.wds_id, ReportName:user.ReportName,ReportTable:user.ReportTable,ReportHeader:user.ReportHeader,ReportQuery:user.ReportQuery});
      
  }
  async function update_reports(id, userParam) {
         const user=userParam;
         console.log(user)
      return  await db(`update Report_Master set ReportName=@ReportName,ReportTable=@ReportTable,ReportHeader=@ReportHeader,ReportQuery=@ReportQuery where id=${id}`,{ReportName:user.ReportName,ReportTable:user.ReportTable,ReportHeader:user.ReportHeader,ReportQuery:user.ReportQuery});
  }
  
  async function _delete(id) {
      return await db(`update Report_Master set is_active=1 where id=${id}`);
      //await User.findByIdAndRemove(id);
  }

  module.exports = {
    getAll_Report,
    getreportsBywdsid,
    getreportsById,
    create_reports,
    update_reports,
    getreportsData,
    _delete
};