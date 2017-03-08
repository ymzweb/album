const fs = require('fs')
const config = require('./config')
const path = require('path')

exports.showIndex = (req, res) => {
    fs.readFile('./views/index.html', (err, data) => {
        if (err) {
            throw err
        }
        res.end(data)
    })
}

exports.showAlbum = (req, res) => {
    fs.readFile('./views/album.html', (err, data) => {
        if (err) {
            throw err
        }
        res.end(data)
    })
}

exports.getAlbums = (req, res) => {
    //写一个请求图片的接口，返回图片路径的数组
    fs.readdir(config.uploadDir, (err, files) => {
        if (err) {
            throw err
        }
        let albums = []
            // console.log(files)
        files.forEach(item => {
            const currenPath = path.join(config.uploadDir, item)
            if (fs.statSync(currenPath).isDirectory()) {
                albums.push(item)
            }
        })
        res.writeHead(200, {
            'content-Type': 'text/plain; charset=utf-8'
        })
        res.end(JSON.stringify({
            albums
        }))
    })
}

exports.handle404 = (req, res) => {
    res.end('404 NOT Found.')
}