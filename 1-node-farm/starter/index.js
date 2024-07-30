const fs = require('fs')
const http = require('http')
const url = require('url')
const replaceTemplate = require('./modules/replaceTemplate')
const slugify = require('slugify')
//////////////////////////////////////////////////////////////////////////////////////////////////////

//Blocking, synchronus way
const textIn = fs.readFileSync('./txt/input.txt','utf-8')

const textOut = `This is what we know about the avodcado ${textIn}.\nCreated on ${Date.now()} AH AH YA NAMOUSSSAAHHHHHHHH`
console.log(textOut)
fs.writeFileSync('./txt/output.txt',textOut)

console.log('the file has been created')


//Non-Blocking, Asynchronus way
fs.readFile('./txt/start.txt', 'utf-8',(err,data1)=>{
    if (err) return console.log('ERROR! 🚫')
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2)
        fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
            console.log(data3)
            fs.writeFile('./txt/final.txt',`${data2}\n${data3}`,'utf-8', (err)=>{
                console.log('your file has been written ❤')
            })
        })
    })
})
console.log('Will read file !')



/**
 *+ ------------------------------------------SERVER--------------------------------------------------
 */

// SERVER

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')
const dataObj = JSON.parse(data)
const slugs = dataObj.map(el => slugify(el.productName, { lower: true }))

console.log(slugs)

console.log(slugify('Fresh Avocados', { lower: true }))

const server = http.createServer('', (req, res) => {
    // const pathname = req.url;
    // console.log(url.parse(req.url,true))
    const { query, pathname } = url.parse(req.url, true)
    console.log(pathname);
    console.log(query)


    //Overview page
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, { 'content-type': 'text/html' })
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('')
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)
        res.end(output);

        //Product page
    } else if (pathname === '/product') {
        res.writeHead(200, { 'content-type': 'text/html' })
        const product = dataObj[query.id]
        // res.end('this is product !');
        output = replaceTemplate(tempProduct, product)
        res.end(output)
        //API page
    } else if (pathname === '/api') {
        res.end(data)

        //Not Found Page
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        })
        res.end('<h1>page not found !</h1>');
    }
});

// first it accept the port and then host
server.listen(8000, '127.0.0.1', () => {
    console.log('server is started, waiting for any request !!');
});
/**
 *+ ------------------------------------------SERVER--------------------------------------------------
 */