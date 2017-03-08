const net = require('net');

const client = net.connect({port: 8080, host: "192.168.20.129"}, ()=>{
    process.stdin.on('data', (chuck) => {
        client.write(chunk.toString());
    })
})