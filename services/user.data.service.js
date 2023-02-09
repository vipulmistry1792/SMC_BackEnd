const db = require('../helpers/db');
const helper = require('../helpers/helpers');
const config1 = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    _delete
};

async function authenticate({ username, password }) {    
    const rows = await db(`select * from user_master where username='${username}'`);
      const data = helper.emptyOrRows(rows);
      const data1=data[0]
      console.log( bcrypt.hashSync(password, 10))
      console.log( data1.hash)
      console.log( bcrypt.compareSync(password, data1.hash))
    if (data1 && bcrypt.compareSync(password, data1.hash)) {
        const token = jwt.sign({ sub: data1.id }, config1.secret, { expiresIn: '7d' });
        console.log(token)
        return {
            ...data1,
            token
        };
    }
}
async function getAll() {
    const rows = await db(
        `select * from user_master`
      );
      const data = helper.emptyOrRows(rows);
      return data;
}
async function getById(id) {
    const rows = await db(
        `select * from user_master where id=${id}`
      );
      const data = helper.emptyOrRows(rows);
      return data;
}
async function create(userParam) {
  //  console.log(userParam);
    // validate
    const rows = await db(
        `select * from user_master where username like '${userParam.username}'`
      );
      const data = helper.emptyOrRows(rows);
    if (data.length>0) {
        throw 'Username "' + userParam.username + '" is already taken';
    }
    const user=userParam;
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }
    return  await db(`insert into user_master (username,hash,firstName,lastName,user_control,friendly_name) values (@user,@hash,@firstName,@lastName,@Type,@friendly_name)`,{user:user.username, hash:user.hash,firstName:user.firstName,lastName:user.lastName,Type:user.Type,friendly_name:user.friendly_name});
    
}
async function update(id, userParam) {
    const rows = await db(
        `select * from user_master where id =${id}`
      );
       const data = helper.emptyOrRows(rows);
       const user=userParam;
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }
    return  await db(`update user_master set hash=@hash,firstName=@firstName,lastName=@lastName,user_control=@Type,friendly_name=@friendly_name where id=${id}`,{hash:user.hash,firstName:user.firstName,lastName:user.lastName,Type:user.Type,friendly_name:user.friendly_name});
}

async function _delete(id) {
    return await db(`delete from user_master where id=${id}`);
    //await User.findByIdAndRemove(id);
}