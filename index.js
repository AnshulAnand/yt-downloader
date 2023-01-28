const fs = require('fs')
const ytdl = require('ytdl-core')
const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/download', (req, res) => {
  console.log(req.body)
  const { URL, iTag } = req.body
  ytdl(URL, {
    filter: format => {
      return format.itag == iTag
    },
  })
    .pipe(fs.createWriteStream('video.mp4'))
    .on('finish', () => {
      res.download('./video.mp4', error =>
        console.log('Video downloading error: ', error || 'No error')
      )
    })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
