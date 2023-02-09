const https = require('https');
require('dotenv').config({path:"./config.env"});
let username = process.env.bulk_username || 'vipulmistry1792';
let password = process.env.bulk_password || 'Vipul@1792';
const accountSid = process.env.Twilo_SID;
const authToken = process.env.Twilo_Token;
const client = require('twilio')(accountSid, authToken);
const { AttributeIds, OPCUAClient, TimestampsToReturn } = require("node-opcua");
const hostname = require("os").hostname().toLowerCase();
const esr_tags =  require('./flow_sms.json');
//const meterService = require('./services/meter_data.service');
// const endpointUrl = "opc.tcp://" + hostname + ":26543/UA/SampleServer";
//const endpointUrl = "opc.tcp://192.168.40.5:4861";
const endpointUrl = "opc.tcp://27.54.167.56:4861";
let client_new, session, subscription;
let ESR_DATA=[];
let WDS_DATA=[];
let arr_string=""
let arr_string1=""
  async function send_message(smsdata)
{
  console.log()
  // client.messages.create({
  //   body: `${smsdata.body}`,
  //   from: '+17622542823',
  //   to: '+919824477086'
  //  })
  let numbers=['+919714328098','+919824477086','+919879557221','+919909903350']
  let location=['WDS ABHAVA Previous Day Flow ','WDS ALTHAN Previous Day Flow ','WDS ASHWANIKUMAR Previous Day Flow','WDS ATHAWA Previous Day Flow ','WDS BHIMRAD Previous Day Flow ','WDS DABHOLI Previous Day Flow Previous Day Flow ','WDS DINDOLI Previous Day Flow ','WDS DUMAS Previous Day Flow ','WDS GODADRA Previous Day Flow ','WDS JOGANINAGAR Previous Day Flow ','WDS KINNARY Previous Day Flow ','WDS_PUNA_E2_INLET_PD_MLD ','WDS SIMADA Previous Day Flow ','WDS CHIKUWADI Previous Day Flow ','WDS UDHNASANGH Previous Day Flow ','WDS UMARWADA Previous Day Flow ','WDS VADOD Previous Day Flow ','WDS VARIAV Previous Day Flow ','WDS VESU1 Previous Day Flow ','WDS VESU2 Previous Day Flow ','WDS KOSAD RAJWADI Previous Day Flow ','WDS PAL Previous Day Flow ','WDS-1 MAGOB Previous Day Flow ','WDS-2 MAGOB Previous Day Flow ','WDS-3 MAGOB Previous Day Flow ']
  // .then(message => console.log(message.sid));
  let tag_prefix="WDS_FLOW"
  let Mess=smsdata.body
  let check_flow=Mess.search("Previous")
  console.log(check_flow)
  if(check_flow !=-1)
  {
    client_new = OPCUAClient.create({
      endpointMustExist: false,
    });
    client_new.on("backoff", (retry, delay) => {
    //  console.log("Retrying to connect to ", endpointUrl, " attempt ", retry);
    });
    //console.log(" connecting to ");
    await client_new.connect(endpointUrl);
  //  console.log(" connected to ");
  
    session = await client_new.createSession();
 //   console.log(" session created");
  
    // step 4' : read a variable with read
    const maxAge = 0;
    let i=0;
    let msg=""
   Object.entries(esr_tags[tag_prefix]).forEach(async (entry) => {
    msg=""
    const [key, tag] = entry;
    var tagname = key;
    var Val=0
    const Pump1StatusToRead = {
      nodeId: `ns=1;s=t|${tag}`,
      attributeId: AttributeIds.Value
    };
    const dataValue =  await session.read(Pump1StatusToRead, maxAge); 
    Val=dataValue.value.value
    if(Val == null)
    {
      Val=0.0
    }
    else{
      Val=Val.toFixed(2)
    }
    if ( typeof location[i] !== 'undefined' )
      {
        //do stuff if query is defined and not null
        msg = `${location[i]} = ${Val} MLD  `
        console.log(msg)
        client.messages.create({
        to: numbers,
        from: 'MG21c34b848628d14c62f111a5bc59e38a',
        body: `${msg}`,    
      
      })
      .then(message => console.log(message.sid));
      }
      else
      {

      }
    
    
    i =i+1;
  }); 
    await session.close();
    // disconnecting
    await client_new.disconnect();
  }
  else{
   client.messages.create({
    to: numbers,
    from: 'MG21c34b848628d14c62f111a5bc59e38a',
    body: `${smsdata.body}`,   
   
  })
  .then(message => console.log(message.sid));   
  }




  // client.messages.create({
  //   to: numbers,
  //   from: 'MG21c34b848628d14c62f111a5bc59e38a',
  //   body: `${smsdata.body}`,   
   
  // })
  // .then(message => console.log(message.sid));
}
function  Sendsms(smsdata) {
    // console.log(smsdata)
    // client.messages.create({
    //    body: `${smsdata.body}`,
    //    from: '+17622542823',
    //    to: '+919824477086'
    //  })
    //  .then(message => console.log(message.sid));
    // let postData = JSON.stringify({
    //     'to' : ['+919714328098', '+919879557221'],
    //     'body': `Hello World !!!`
    //   });
    // let options = {
    //     hostname: 'api.bulksms.com',
    //     port: 443,
    //     path: '/v1/messages',
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Content-Length': postData.length,
    //       'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64')
    //     }
    //   };
      
    //   let req = https.request(options, (resp) => {
    //     console.log('statusCode:', resp.statusCode);
    //     let data = '';
    //       resp.on('data', (chunk) => {
    //       data += chunk;
    //     });
    //     resp.on('end', () => {
    //       console.log("Response:", data);
    //     });
    //   });
      
    //   req.on('error', (e) => {
    //     console.error(e);
    //   });      
    //   req.write(postData);
    //   req.end();
  //     client_msg.messages
  // .create({
  //    body: `${smsdata.body}`,
  //    from: '+15204576457',
	//  //to:'+91'
  //   to: '+919824477086'
  //  })
  // .then(message => console.log(message.sid));
    }
    module.exports = {
        Sendsms,
        send_message
    };