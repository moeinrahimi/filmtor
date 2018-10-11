var express = require('express')
const db = require('../models')
const fs = require('fs')
const file = require('../helpers/file')
const { getMovie } = require('../helpers/imdb')
//===========ROUTER============================================
var apiRouter = express.Router();

apiRouter.get('/', getMovies)
apiRouter.get('/index', indexMovies)

async function getMovies(req, res) {
  try {
    let movies = await db.Movie.all()
    return res.status(200).json({ success: true, movies: movies })
  } catch (error) {
    return res.status(504).json({ success: true, message: error.message })
  }
}
async function indexMovies(req, res) {
  try {
    let baseDir = await db.Setting.findOne({
      where: {
        key: 'baseDir'
      },
      attributes: ['value']
    })
    if (!baseDir) {
      console.log('no baseDir created')
      return
    }
    let directories = file.readDir(baseDir.value)
    console.log(directories)
    for (let i = 0; i < directories.length; i++) {
      try {
        let dir = directories[i]
        let absolutePath = baseDir.value + '/' + dir
        let stat = fs.statSync(absolutePath)
        if (!stat.isDirectory()) continue
        let movieFolderFiles = fs.readdirSync(absolutePath)
        // console.log(movieFolderFiles)
        let movieFile = movieFolderFiles.find((movieFolder) => {
          if (movieFolder.endsWith('mkv')) {
            return movieFolder
          }
        })
        if (!movieFile) continue
        let moviePath = baseDir.value + '/' + dir + '/' + movieFile
        let movie = await getMovie(dir)
        db.Movie.create({
          title: movie.title,
          year: movie.year,
          rated: movie.rated,
          plot: movie.plot,
          rank: JSON.stringify(movie.ratings),
          path: moviePath,
          poster: movie.poster
        })
        console.log(movie, 'movie ')


      } catch (e) {
        console.log(e)
      }
    }
    // return res.status(200).json({ success: true, message_id: 0 })
  } catch (e) {
    console.log(e, 'path')
    // return res.status(504).json({ success: false, message_id: 1, message: e.message })
  }
}



module.exports = apiRouter
indexMovies()