const fs = require('fs')
const server = require('http').createServer()

server.on('request',(req,res)=>{

    //++ Solution 1 : Normal Fs Async Callback Function
    // fs.readFile('./test-file2.txt',(err,data)=>{
    //     if (err) {console.log(err)}
    //     res.end(data)
    // })
    //++ Solution 2 : Streams
    // const readable = fs.createReadStream('test-file.txt')
    // readable.on('data',(chunk)=>{
    //     res.write(chunk);
    // })
    //**  stop the stream after data is finished
    // readable.on('end',()=>{
    //     res.end()
    // })
    //** if there was any error ? send error code 500!!
    // readable.on('error', (err) => {
    //     console.log(err)
    //     res.statusCode = 500
    //     res.end('File Not Found !!')
    // })

    //++ Solution 3 : Streams Using PIPE operator
    // readableStream source => pipe(writable_Destination)
    //...........readableStream.pipe(res)
    const readableStream = fs.createReadStream('test-file2.txt')
    readableStream.pipe(res)
})

server.listen(1234,'127.0.0.1',()=>{
    console.log('listening...')
})

