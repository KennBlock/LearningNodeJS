const fs = require('fs')
const crypto = require('crypto')
const start = Date.now()
const process = require('process');

console.log(process.env.UV_THREADPOOL_SIZE)
setTimeout(() => {
    console.log('timer is finished')
}, 0);


fs.readFile('test-file.txt','utf-8',()=>{
    console.log('-------------------------------')
    setTimeout(() => { console.log('timer 3 is finished') }, 3000);
    setTimeout(() => { console.log('timer 2 is finished') }, 0);
    setImmediate(() => { console.log('immediate is finished') })

    process.nextTick(()=>{console.log('proces.next tick')})
    console.log('I/O finished')

    crypto.pbkdf2('password','salt',100000,1024,'sha512', () => console.log(Date.now()-start,'password encrypted'))
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => console.log(Date.now() - start, 'password encrypted'))
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => console.log(Date.now() - start, 'password encrypted'))
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => console.log(Date.now() - start, 'password encrypted'))

})
console.log('hello from the top level code')