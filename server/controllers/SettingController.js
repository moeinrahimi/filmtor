var express = require('express')
const db = require('../models')

//===========ROUTER============================================
var apiRouter = express.Router();

apiRouter.get('/', getSettings)
apiRouter.patch('/', updateSettings)


async function getSettings(req, res) {
  try{
    let settings = await db.Setting.all()
    return res.status(200).json({success:false,message_id:1,settings})
  }catch(e){
    console.log(e)
    return res.status(504).json({success:false,message_id:1,message:e.message})
  }
}
async function updateSettings(req, res) {
  let settings = req.body.settings
  try{
    if(!settings || settings.length == 0 )
      return res.status(400).json({success:false,message_id:2,message:'no settings provided' })
    if(!Array.isArray(settings))
      settings = [settings]
    for(let i  = 0 ; i < settings.length ; i++){
      let setting = settings[i]
      let settingDb = await db.Setting.findOrCreate({
        where : {
          key : setting.key,
          value : setting.value
        }
      })
      if(settingDb[1] == 0 ){
         db.Setting.update({
           value : setting.value
         },{
          where : {
            id : settingDb.id
          }
        })
      }
    }
    return res.status(200).json({success:false,message_id:0,message:'settings saved successfully'})
  }catch(e){
    console.log(e)
    return res.status(504).json({success:false,message_id:1,message:e.message})
  }
}


module.exports=apiRouter
