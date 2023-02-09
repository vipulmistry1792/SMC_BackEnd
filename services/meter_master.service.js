const db = require('../helpers/db');
const helper = require('../helpers/helpers');
const config1 = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
module.exports = {
    getAll_type,
    getAll_wds,
    getwdsdataById,
    supplytimeupdate,
    getAlldata
};

async function getAll_type() {
    const rows = await db(
        `select * from Type_Master`
      );
      const data = helper.emptyOrRows(rows);
      return data;
}
async function getAll_wds(type) {
    const rows = await db(
        `select * from wds_master where type_id=${type.type_id}`
      );
      const data = helper.emptyOrRows(rows);
      return data;
}
async function getAlldata() {
    const rows = await db(
        `select * from wds_master where type_id in (1,3,4,5)`
      );
      const data = helper.emptyOrRows(rows);
      return data;
}
async function getwdsdataById(wds) {
    const rows = await db(
        `select * from wds_master where id=${wds.id}`
      );
      console.log(rows)
      const data = helper.emptyOrRows(rows);
      return data;
}
async function supplytimeupdate( userParam) {
    const user=userParam;
    //return user;
    return  await db(`update wds_master set SupplyTime1=@SupplyTime1,SupplyTime2=@SupplyTime2,SupplyTime3=@SupplyTime3 where id=${userParam.id}`,{SupplyTime1:user.SupplyTime1,SupplyTime2:user.SupplyTime2,SupplyTime3:user.SupplyTime3});
}
