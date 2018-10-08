var express = require('express')
const db = require('../models')
const fs =require('fs')
//===========ROUTER============================================
var apiRouter = express.Router();

apiRouter.get('/:id', getMovies)

async function getMovies(req,res){
  let id = req.params.id
  try {
    let show = await db.Movie.findById(id)
    let path = show.path
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1] 
        ? parseInt(parts[1], 10)
        : fileSize-1
      const chunksize = (end-start)+1
      const file = fs.createReadStream(path, {start, end})
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(200, head)
      fs.createReadStream(path).pipe(res)
    }} catch (error) {
        return res.status(504).json({success:true,message:error.message})
  }
}




module.exports=apiRouter
