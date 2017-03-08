    const url = require('url')
    const fs = require('fs')
    
    
    const handlers = require('./handlers')

    module.exports = function(req, res) {

        const urlObj = url.parse(req.url, true)
            // console.log(urlObj)
        const pathname = urlObj.pathname
        const query = urlObj.query

        //处理外链的请求
        if (pathname.startsWith('/node_modules/') || pathname.startsWith('/public/')) {
            fs.readFile(`.${pathname}`, (err, data) => {
                if (err) {
                    throw err
                }
                res.end(data)
            })
        } else if (pathname === '/') {
            handlers.showIndex(req, res)

        } else if (pathname === '/album') {
            handlers.showAlbum(req, res)
        } else if (pathname === '/getAlbums') {
            handlers.getAlbums(req, res)

        } else {
            handlers.handle404(req, res)
        }

        // const friends = [
        //     {name: 'a1', age: 1},
        //     {name: 'a2', age: 2},
        //     {name: 'a3', age: 3},
        //     {name: 'a4', age: 4}
        // ]
        // if(urlObj.pathname === '/user') {
        //     const friend = friends.find(friend => {
        //         return friend.name === urlObj.query.name
        //     })  
        //     res.end(JSON.stringify(friend))
        // }
    }