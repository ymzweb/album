const http = require('http')
const config = require('./config')

const router = require('./router')



http.createServer((req, res) => {

    router(req, res);
   
})

.listen(config.port, config.host, () => {
    console.log(`服务开启at port ${config.port}`)
    console.log(`请访问http://${config.host}:${config.port}/`)
})