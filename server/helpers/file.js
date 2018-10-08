const fs = require('fs')

function readDir(path){
  try {
    let directories = fs.readdirSync(path)
    return directories  
  } catch (error) {
    return error
  }
  
}
module.exports = {
readDir
}