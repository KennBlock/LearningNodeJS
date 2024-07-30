const EventEmitter = require('events')

const http = require('http')


class Sales extends EventEmitter {
    constructor(){
        super();
    }
}
const myEmitter = new Sales()
myEmitter.on('Jak 3ar ABi',()=>{
    console.log('3ar abi is here ay tnaket')
})
myEmitter.on('Jak 3ar ABi', () => {
    console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH')
})
myEmitter.on('Jak 3ar ABi', (stock) => {
    console.log(`there are now ${stock} items left in stock`)
})
myEmitter.emit('Jak 3ar ABi',9)


////////////////////////////////////////////////////

const server = http.createServer()
server.on('request',(req,res)=>{
    console.log('request recieved')
    res.end('request recieved')
})

server.on('request', (req, res) => {
    res.end('Another request recieved')
})

server.on('close',()=>{
    console.log('server closed')
})

server.listen(1234,'127.0.0.1',()=>{
    console.log('waiting for request...')
}
)

/////////////////////////////////////////////
