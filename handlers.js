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

//根据提交的相册名称，创建相册目录(文件夹)
exports.addAlbum = function (req, res, urlObj) {

    const albumName = urlObj.query.albumName

    if (albumName.trim().length === 0) {
        res.writeHead(200, {
            'Content-Type': 'text/plain; charset=utf-8'
        })
        res.end('请输入完整相册名')
    }

    fs.readdir(config.uploadDir, (err, files) => {
        if (err) {
            throw err
        }

        files.forEach(item => {
            if (item === urlObj.query.albumName) {
                return res.end('该相册名称已存在')
            }   
        })
        fs.mkdir(path.join(config.uploadDir, albumName), (err) => {
            if (err) {
                throw err
            }
            console.log('相册创建成功')
            res.writeHead('302', {
                'Location': '/'
            })
            res.end()
        })
        
    })

    
    
}


exports.handle404 = (req, res) => {
    res.end('404 NOT Found.')
}