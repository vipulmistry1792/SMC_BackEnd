
const { AttributeIds, OPCUAClient, TimestampsToReturn } = require("node-opcua");
const hostname = require("os").hostname().toLowerCase();
const wds_tags =  require('./wds_data.json');
const esr_tags =  require('./esr_data.json');
const sensor_tags =  require('./sensor_data.json');
//const meterService = require('./services/meter_data.service');
// const endpointUrl = "opc.tcp://" + hostname + ":26543/UA/SampleServer";
//const endpointUrl = "opc.tcp://192.168.40.5:4861";
const endpointUrl = "opc.tcp://27.54.167.56:4861";
let client, session, subscription;
let ESR_DATA=[];
let WDS_DATA=[];
let arr_string=""
let arr_string1=""
async function createOPCUAClient(esr) {
  console.log(esr)
  ESR_DATA=[];
  var ESRData = {};
  let tag_prefix=esr.tag_prefix
    client = OPCUAClient.create({
      endpointMustExist: false,
    });
    client.on("backoff", (retry, delay) => {
    //  console.log("Retrying to connect to ", endpointUrl, " attempt ", retry);
    });
    //console.log(" connecting to ");
    await client.connect(endpointUrl);
  //  console.log(" connected to ");
  
    session = await client.createSession();
 //   console.log(" session created");
  
    // step 4' : read a variable with read
    const maxAge = 0;
    // const FlowToRead = {
    //   nodeId: `ns=1;s=t|${tag_prefix}INLET_FLOW.PV`,
    //   attributeId: AttributeIds.Value
    // };
    // const dataValue =  await session.read(FlowToRead, maxAge);
   // console.log(" value " , dataValue.toString());
   Object.entries(esr_tags[tag_prefix]).forEach(async (entry) => {
    const [key, tag] = entry;
    var tagname = key;
    //console.log(`ns=1;s=t|${tag}`)
    const Pump1StatusToRead = {
      nodeId: `ns=1;s=t|${tag}`,
      attributeId: AttributeIds.Value
    };
    const dataValue =  await session.read(Pump1StatusToRead, maxAge);     
    ESRData[key]=dataValue.value.value;
    console.log(ESRData)  
  });
    // const FlowTotalToRead = {
    //     nodeId: `ns=1;s=t|${tag_prefix}INLET_FLOW_TOTAL.Total`,
    //     attributeId: AttributeIds.Value
    //   };
    //   const dataValue1 =  await session.read(FlowTotalToRead, maxAge);
    // //  console.log(" value " , dataValue1.toString());
    //   const MOVPOSToRead = {
    //     nodeId: `ns=1;s=t|${tag_prefix}INLET_MOV_POS`,
    //     attributeId: AttributeIds.Value
    //   };
    //   const dataValue2 =  await session.read(MOVPOSToRead, maxAge);
    //  // console.log(" value " , dataValue2.toString());
    //   const LevelToRead = {
    //     nodeId: `ns=1;s=t|${tag_prefix}LEVEL.PV`,
    //     attributeId: AttributeIds.Value
    //   };
    //   const dataValue3 =  await session.read(LevelToRead, maxAge);
    //  // console.log(" value " , dataValue3.toString());
    //   const MOVSTATUSToRead = {
    //     nodeId: `ns=1;s=t|${tag_prefix}INLET_MOV.Cmd_Status`,
    //     attributeId: AttributeIds.Value
    //   };
    //   const dataValue4 =  await session.read(MOVSTATUSToRead, maxAge);
    // //  console.log(" value " , dataValue4.toString());
    //   const MOVVSTATUSToRead = {
    //     nodeId: `ns=1;s=t|${tag_prefix}INLET_MOV.V_Status`,
    //     attributeId: AttributeIds.Value
    //   };
    //   const dataValue5 =  await session.read(MOVVSTATUSToRead, maxAge);
    //   const PreviousdayToRead = {
    //     nodeId: `ns=1;s=t|${tag_prefix}INLET_FLOW_PD_MLD`,
    //     attributeId: AttributeIds.Value
    //   };
    //   const dataValue6 =  await session.read(PreviousdayToRead, maxAge);
    //  // console.log(" value " , dataValue6.toString());
    //   const CurrentdayToRead = {
    //     nodeId: `ns=1;s=t|${tag_prefix}INLET_FLOW_CD_MLD`,
    //     attributeId: AttributeIds.Value
    //   };
    //   const dataValue7 =  await session.read(CurrentdayToRead, maxAge);
    //  // console.log(" value " , dataValue7.toString());    
    await session.close();
    // disconnecting
    await client.disconnect();
    ESR_DATA.push({...ESRData})
    // //ESR_DATA.push({"Level":dataValue3.value.value,"InletFlow":dataValue.value.value,"InletFlow_Prev":dataValue6.value.value,"InletFlow_Curr":dataValue7.value.value,"InletFlowTotal":dataValue1.value.value,"MovPOS":dataValue2.value.value,"MOVCmdStatus":dataValue4.value.value,"MOVVStatus":dataValue5.value.value})
    // ESR_DATA.push({"MOV Status":dataValue5.value.value,"Level":dataValue3.value.value,"InletFlow":dataValue.value.value,"InletFlow Yesterday":dataValue6.value.value,"InletFlow Today":dataValue7.value.value,"InletFlowTotal":dataValue1.value.value,"MovPOS":dataValue2.value.value})
    return ESR_DATA
  }
  // function getSupplyTime(wds)
  // {
  //   return meterService.getwdsdataById(wds)

  // }
  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
  async function WDScreateOPCUAClient(wds) {
 // console.log(wds_tags)
 console.log(wds)
  let tag_prefix=wds.tag_prefix
  let total_pump=wds.pump
  let total_ft=1
 // let WDS_SupplyTime=getSupplyTime(wds)
  // Check if key exists
let hasKey = wds_tags.hasOwnProperty(`${tag_prefix}`); 
  
if (hasKey) {
   // console.log('This key exists.');
   // console.log(wds_tags[tag_prefix]);
} else {
    console.log(wds_tags[tag_prefix]);
}

var WDSData = {};
 // console.log(wds_tags.tag_prefix);
  WDS_DATA=[];
    client = OPCUAClient.create({
      endpointMustExist: false,
    });
    client.on("backoff", (retry, delay) => {
      console.log("Retrying to connect to ", endpointUrl, " attempt ", retry);
    });
    //console.log(" connecting to ");
    await client.connect(endpointUrl);
    //console.log(" connected to ");
  
    session = await client.createSession();
   // console.log(" session created");
  
    // step 4' : read a variable with read
    const maxAge = 0;
    Object.entries(wds_tags[tag_prefix]).forEach(async (entry) => {
      const [key, tag] = entry;
      var tagname = key;
      //console.log(`ns=1;s=t|${tag}`)
      const Pump1StatusToRead = {
        nodeId: `ns=1;s=t|${tag}`,
        attributeId: AttributeIds.Value
      };
      const dataValue =  await session.read(Pump1StatusToRead, maxAge);     
      WDSData[key]=dataValue.value.value;
      //console.log(WDSData)  
    });
      var pumpData = {};
    if(wds.type_id==1)
    {
      var movData = {};
      for (let index = 0; index < total_pump; index++) {
        var pump_no=index+1;
        var tagname = "MOV"+pump_no;
        const Pump1StatusToRead = {
          nodeId: `ns=1;s=t|${tag_prefix}${tagname}.v_Status`,
          attributeId: AttributeIds.Value
        };
        const dataValue =  await session.read(Pump1StatusToRead, maxAge);
        movData[tagname]=dataValue.value.value;
    }
    }
   // console.log(pumpData)       
    await session.close();
    // disconnecting
    await client.disconnect();
    if(wds.type_id==4)
    {
      const SupplyTime1=wds.SupplyTime1;
      const SupplyTime2=wds.SupplyTime2;
      const SupplyTime3=wds.SupplyTime3;
      WDS_DATA.push({SupplyTime1,SupplyTime2,SupplyTime3,...WDSData})
    }
    else if(wds.type_id==1)
    {
      const SupplyTime1=wds.SupplyTime1;
      const SupplyTime2=wds.SupplyTime2;
      const SupplyTime3=wds.SupplyTime3;
      WDS_DATA.push({SupplyTime1,SupplyTime2,SupplyTime3,...WDSData})
    }
    else if(wds.type_id==3)
    {
      const SupplyTime1=wds.SupplyTime1;
      const SupplyTime2=wds.SupplyTime2;
      const SupplyTime3=wds.SupplyTime3;
      WDS_DATA.push({SupplyTime1,SupplyTime2,SupplyTime3,...WDSData})
    }
    else if(wds.type_id==6)
    {
      WDS_DATA.push({...WDSData})
    }
    else{

    }
    //WDS_DATA.push({"SupplyTime":"06:00:00 To 09:00:00","Distribution Flow":dataValue.value.value,"Distribution Flow Total":dataValue1.value.value,"Distribution Pressure":dataValue2.value.value,"UGT Level":dataValue3.value.value,"UGT Peak Level":dataValue4.value.value,"Chlorine Leak Detector":dataValue6.value.value,"FRC Analyzer":dataValue7.value.value,"FRC Average":dataValue8.value.value,"Turbidity Analyzer":dataValue9.value.value,"Turbidity Average":dataValue10.value.value,"UGT Level":dataValue11.value.value,...pumpData})
    return WDS_DATA
  }
  async function getWTPData(wtp) {
    console.log(wtp)
    WTP_DATA=[];
    var WTPData = {};
    let tag_prefix=wtp.tag_prefix
      client = OPCUAClient.create({
        endpointMustExist: false,
      });
      client.on("backoff1", (retry, delay) => {
      //  console.log("Retrying to connect to ", endpointUrl, " attempt ", retry);
      });
      //console.log(" connecting to ");
      await client.connect(endpointUrl);
    //  console.log(" connected to ");
    
      session = await client.createSession();
   //   console.log(" session created");
     // step 4' : read a variable with read
     const maxAge = 0;
     Object.entries(wds_tags[tag_prefix]).forEach(async (entry) => {
       const [key, tag] = entry;
       console.log(entry)
       var tagname = key;
       //console.log(`ns=1;s=t|${tag}`)
       const Pump1StatusToRead = {
         nodeId: `ns=1;s=t|${tag}`,
         attributeId: AttributeIds.Value
       };
       const dataValue =  await session.read(Pump1StatusToRead, maxAge);     
       WTPData[key]=dataValue.value.value;
       //console.log(WTPData)  
     });
     WTP_DATA.push(WTPData)
     await session.close();
     // disconnecting
     
    await client.disconnect();
    console.log(WTP_DATA)
    return WTP_DATA

    }
  async function getSensorData(wtp) {
   
    WTP_DATA=[];
    var WTPData = {};
    let tag_prefix=wtp.tag_prefix
    console.log(tag_prefix)
      client = OPCUAClient.create({
        endpointMustExist: false,
      });
      client.on("backoff1", (retry, delay) => {
      //  console.log("Retrying to connect to ", endpointUrl, " attempt ", retry);
      });
      //console.log(" connecting to ");
      await client.connect(endpointUrl);
    //  console.log(" connected to ");
    
      session = await client.createSession();
    //   console.log(" session created");
      // step 4' : read a variable with read
      const maxAge = 0;
      Object.entries(sensor_tags[tag_prefix]).forEach(async (entry) => {
        const [key, tag] = entry;
        console.log(entry)
        var tagname = key;
        //console.log(`ns=1;s=t|${tag}`)
        const Pump1StatusToRead = {
          nodeId: `ns=1;s=t|${tag}`,
          attributeId: AttributeIds.Value
        };
        const dataValue =  await session.read(Pump1StatusToRead, maxAge);   
        console.log(dataValue)  
        WTPData[key]=dataValue.value.value;
        //console.log(WTPData)  
      });
      WTP_DATA.push(WTPData)
      await session.close();
      // disconnecting
      
    await client.disconnect();
    console.log(WTP_DATA)
    return WTP_DATA

    }
  module.exports = {
    createOPCUAClient,
    WDScreateOPCUAClient,
    getWTPData,
    getSensorData
};