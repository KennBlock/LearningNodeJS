//++ ---------------------------SERVER LAUNCHING AND ITS SETTINGS -------------------------------------

const fs = require('fs') //* FOR USING FILE SYSTEM
const http = require('http') //* FOR USING server and http protocol request response
const url = require('url') //* FOR PARSING URL's to Console or anywhere u want
const slugify = require('slugify') //* Usefull library to parse urls and to make life easier

//* CREATING THE SERVER (DEPLOYMENT !!)
const server = http.createServer((req, res) => {

    //set status code to 200 OK!
    res.statusCode = 200

    //setting the headers
    res.setHeader('Content-Type', 'text/plain')

    //writting the headers when code 200 Ok !
    res.writeHead(200, { 'content-type': 'text/html' })

    //putting server request event listener (Request + CLOSE !)
    server.on('request', (req, res) => {
        console.log('request recieved')
        res.end('request recieved')
    })
    server.on('close', () => {
        console.log('server closed')
    })
})

//* STARTING THE SERVER COMMAND
server.listen(1234, '127.0.0.1', () => {
    console.log('Server running at http://127.0.0.1:3000/');
    console.log('waiting for request...')
})

//* Handling Different HTTP Methods

if (req.method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('GET request received\n');
} else if (req.method === 'POST') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('POST request received\n');
} else {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`${req.method} not allowed\n`);
}
//* Parsing URL and Query Parameters

const parsedUrl = url.parse(req.url, true);

res.statusCode = 200;
res.setHeader('Content-Type', 'application/json');

const response = {
    pathname: parsedUrl.pathname,
    query: parsedUrl.query
};

res.end(JSON.stringify(response));

//++ ------------------------------------------------------------------------------------------------


//++ -----------------------------------FILE SYSTEM MANUPILATION-------------------------------------
const fs = require('fs') //* FOR USING FILE SYSTEM
//# READING DATA
//* Reading File ASYNCRONOUSLY
fs.readFile('FILE-NAME.txt', 'utf-8', (err, data) => {
    // firstly we handle any error
    if (err) console.log(err, 'couldnt read file ')
    // then we consume the callback func data
    console.log(data)
    server.end(data)
})

//* Reading File SYNCRONOUSLY
try {
    //  assign the data into variable then consume it when it finish reading
    data = fs.readFileSync('FILE-NAME.txt', 'utf-8')
    console.log(data);
} catch (err) {
    console.log(err)
}
//# WRITING DATA
//* Writing File ASYNCRONOUSLY
dataToWrite = 'BOUSERBESS STREET'
fs.writeFile('FILE-NAME.txt', dataToWrite, 'utf-8', (err, data) => {
    if (err) console.log('error occured', err)
    console.log('file has been written successfully');
})

//* Writing File SYNCRONOUSLY
dataToWrite = 'BOUSERBESS STREET'
fs.writeFileSync('FILE-NAME.txt', dataToWrite, 'utf-8')
try {
    console.log('file has been written successfully');
} catch (err) {
    console.log(err);
}

//** OTHER FS COMMANDS

fs.unlink(path, callback)
fs.rename(oldPath, newPath, callback)
fs.access(path, mode, callback)
fs.readdir(path, options, callback)
fs.mkdir(path, options, callback)
fs.rmdir(path, options, callback)
fs.watch(filename, options, listener)

//++ ------------------------------------------------------------------------------------------------

//** Types of Streams
// 1 - Readable Streams: Streams from which data can be read(e.g., fs.createReadStream).
const readableStream = fs.createReadStream('example.txt', { encoding: 'utf8' });
readableStream.on('data', (chunk) => {
    console.log(`Received ${chunk.length} bytes of data.`);
    console.log(chunk);
});

readableStream.on('end', () => {
    console.log('No more data to read.');
});

readableStream.on('error', (err) => {
    console.error('An error occurred:', err.message);
});
// 2 - Writable Streams: Streams to which data can be written(e.g., fs.createWriteStream).
const writableStream = fs.createWriteStream('output.txt');
writableStream.write('Hello, ', 'utf8');
writableStream.write('World!', 'utf8');
writableStream.end();

writableStream.on('finish', () => {
    console.log('All writes are now complete.');
});

writableStream.on('error', (err) => {
    console.error('An error occurred:', err.message);
});
// 3 - Duplex Streams: Streams that are both readable and writable(e.g., TCP sockets).

const { Duplex } = require('stream');

class DuplexStream extends Duplex {
    constructor(options) {
        super(options);
        this.data = [];
    }

    _read(size) {
        if (this.data.length > 0) {
            this.push(this.data.shift());
        } else {
            this.push(null);
        }
    }

    _write(chunk, encoding, callback) {
        this.data.push(chunk);
        callback();
    }
}

const duplexStream = new DuplexStream();

duplexStream.on('data', (chunk) => {
    console.log(`Read: ${chunk.toString()}`);
});

duplexStream.write('Hello, ');
duplexStream.write('World!');
duplexStream.end();

duplexStream.on('finish', () => {
    console.log('All writes are now complete.');
});


// 4 - Transform Streams: Duplex streams that can modify or transform the data as it is read or written(e.g., zlib //compression streams).

const { Transform } = require('stream');

class UppercaseTransform extends Transform {
    _transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    }
}

const uppercaseTransform = new UppercaseTransform();

process.stdin.pipe(uppercaseTransform).pipe(process.stdout);


//** Core Stream Methods
// 1 - stream.pipe(destination, [options]): Pipes the readable stream to a writable stream.
readableStream = fs.createReadStream('example.txt', { encoding: 'utf8' });
writableStream = fs.createWriteStream('output.txt');

//* Pipe: Connecting Readable and Writable Streams
readableStream.pipe(writableStream);

readableStream.on('end', () => {
    console.log('Piping completed.');
});

readableStream.on('error', (err) => {
    console.error('An error occurred:', err.message);
});

writableStream.on('error', (err) => {
    console.error('An error occurred:', err.message);
});
// 2 - stream.read([size]): Reads data from the stream.
// 3 - stream.write(chunk, [encoding], [callback]): Writes data to the stream.
// 4 - stream.end([chunk], [encoding], [callback]): Signals that no more data will be written to the writable stream.

//** Core Stream EVENTS
// 1 - 'data': Emitted when data is available to read.
// 2 - 'end': Emitted when there is no more data to read.
// 3 - 'error': Emitted when an error occurs.
// 4 - 'finish': Emitted when all data has been flushed to the underlying system

//++ ----------------------------------------STREAMS-------------------------------------------------


