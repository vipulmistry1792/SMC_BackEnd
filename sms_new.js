const accountSid = process.env.Twilo_SID;
const authToken = process.env.Twilo_Token;
const client = require('twilio')(accountSid, authToken);
function send_message(smsdata)
{

    // let messageid=""
    // console.log(smsdata)
    // // for (let index = 0; index < numbers.length; index++) {
    // //     const mobileno = numbers[index];
    //     client.messages.create({
    //         to: `+919909903350`,           
    //         from: '+17622542823',
    //         body: `${smsdata.body}`,
    //        // to: '',
          
    //     })
    //     .then(message => console.log(message.sid));       
    // }
    let numbers=['+919714328098','+919824477086','+919879557221','+919909903350']
    // .then(message => console.log(message.sid));
    client.messages.create({
      to: numbers,
      from: 'MG21c34b848628d14c62f111a5bc59e38a',
      body: `${smsdata.body}`,
     
     
    })
    .then(message => console.log(message.sid));
    //return messageid;
}
module.exports = {
    send_message
};