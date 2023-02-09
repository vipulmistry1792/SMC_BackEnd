const sql = require('../config/db');
async function create(batch){
    //validateCreate(tag);
    console.log(batch.body);
    const {username,password,email} =batch.body;  
    const result1 = await sql(
      'insert into  users (username,password,email) values (@user,@pass,@email)', 
      {user: username, pass: password,email:email});
    let message = 'Error in creating User';
   console.log(result1);
    // if (result.affectedRows) {
    //   message = 'User Created successfully';
    // }
    return {message};
  }

exports.register=async(req,res,next)=>{
    const {username,password,email} =req.body;  
    const result1 =await sql('insert into  users (username,password,email) values (@user,@pass,@email)', 
    {user: username, pass: password,email:email}).then((err, result)=>{
        console.log(err)
        return result
    }); 
    console.log(result1)
    res.json(result1);
}

exports.login=async (req,res,next)=>{
    const {username,password} =req.body;  
    const result1 =await sql("select * from  users where username=@user and password=@pass", {user: username, pass: password}).then(result=>{
        return result
    });       

    res.send(result1);
}

exports.forgotpassword=(req,res,next)=>{
    res.send("This Is ForgotPassword Route");
}
exports.resetpassword=(req,res,next)=>{
    res.send("This Is Reset Route");
}