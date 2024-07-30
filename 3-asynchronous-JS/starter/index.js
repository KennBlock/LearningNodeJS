const fs = require('fs');
const superagent = require('superagent');

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//     console.log(`breed ${data}`)

//++ Using CallBacks [BAD SOLUTION !]
// superagent
// .get(`https://dog.ceo/api/breed/${data}/images/random`)
// .end(err,res=>{
//     if (err) console.log(err.message)
//     console.log(res.body.message)
//     fs.writeFile('dog-img.txt',res.body.message, err => {
//         if (err) console.log(err.message)
//         console.log('random dog image saved to file !')
//     })
// })

//++ Using Promises [GOOD SOLUTION !]
//#  How Promise Works ?
//   1 - The producing code (e.g., an asynchronous function) creates a promise.
//   2 - The promise represents the current state of the operation (initially “pending”).
//   3 - When the operation completes successfully, the promise becomes “fulfilled” with a value.
//   4 - If an error occurs, the promise becomes “rejected” with an error object.
// })

//? building the promise
const readFilePro = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf-8', (err, data) => {
            if (err) reject('THERE IS AN ERROR READING FILE ⛔')
            resolve(data)
        })
    })
}

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, (err, data) => {
            if (err) reject('THERE IS AN ERROR WRITING FILE ⛔')
            resolve('FiLE WRITTEN SUCCESSFULLY')
        })
    })
}
/*
readFilePro(`${__dirname}/dog.txt`)
    .then((data) => {
        const breed = data.trim();
        console.log(`breed ${breed}`);
        return superagent.get(`https://dog.ceo/api/breed/${breed}/images/random`);
    })
    .then((res) => {
        console.log(res.body.message);
        return writeFilePro(`${__dirname}/dog-image.txt`, res.body.message);
    })
    .then(() => {
        console.log('Random Dog image is saved to file !');
    })
    // TO HANDLE ANY ERROR HAPPEN TO REQUEST
    .catch((err) => {
        console.log(err.message);
    });
*/

const getDogPic = async () => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`)
        console.log(`breed ${data}`);
        const res1 =  superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
        const res2 =  superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
        const res3 =  superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
        const allres =  await Promise.allSettled([res1,res2,res3])
        console.log(allres)
        const images = all.map(el => el.body.message)
        console.log(images)

        await writeFilePro('./dog-image.txt', img.join('\n'))
        console.log('IMAGE SAVED SUCCSESS')
    }   catch (error) {
        console.log('SOMETHING WENT WRONG')
        throw(error)
    }
    return '2-READY !!'
}

/*
console.log(`1 - Will Get dog Pics`);
const x = getDogPic().then(x => {
    console.log(x)
    console.log(`3 - DONE Get dog Pics`);
 }).catch(err=>{console.log(err)})

*/

(async ()=>{
try {
    console.log('1- WILL GET THE DOG PIC 🕔')
    const x = await getDogPic()
    console.log(x)
    console.log('3- DONE GETTING THE DOG PIC ✅')
} catch (error) {
    console.log('error 💥')
}
})()