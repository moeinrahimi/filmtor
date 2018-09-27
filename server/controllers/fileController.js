var express = require('express')
const db = require('../models')
const fs =require('fs')
const imdb = require('imdb-api')
//===========ROUTER============================================
var apiRouter = express.Router();

apiRouter.get('/', getDirectory)


async function getDirectory(req, res) {
  try{
    const cli = new imdb.Client({apiKey: '9c271230'});
    

    let baseDir = await db.Setting.findOne({
      where : {
        key : 'baseDir'
      },
      attributes : ['value']
    })
    if(!baseDir){
      console.log('no baseDir created')
      return 
    }
      
    let directories = fs.readdirSync(baseDir.value)
    console.log(directories)
    for(let i =0 ;i < directories.length;i++){
      let dir = directories[i]
      let absolutePath = baseDir.value +'/'+ dir
      let movieFolderFiles = fs.readdirSync(absolutePath)
      // console.log(movieFolderFiles)
      movieFolderFiles.forEach((movieFolder)=>{
        console.log(movieFolder)
        if(movieFolder.endsWith('mkv')){
          console.log(movieFolder,'9')
          cli.get({'name': movieFolder}).then(console.log);

        }
      })
    }
    // return res.status(200).json({success:false,message_id:1,settings})
  }catch(e){
    console.log(e)
    // return res.status(504).json({success:false,message_id:1,message:e.message})
  }
}



module.exports=apiRouter
getDirectory()