const imdbwrapper = require('imdb-api')
const imdb = new imdbwrapper.Client({apiKey: '9c271230'});
async function getMovie(title){
  try{
    let movie =  await imdb.get({'name': title})
    return movie 
  }catch(e){
    console.log(e)
    return e
  }
  
}
module.exports = {
  getMovie
}