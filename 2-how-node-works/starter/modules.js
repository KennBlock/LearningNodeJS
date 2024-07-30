// console.log(arguments)
// console.log(require('module').wrapper)

//++ importing All methodes from local module
// const C = require('./test-module1')
// const calc1 = new C();
// console.log(calc1.add(5,3))

//++ importing costume methodes from local module
const calc2 = require('./module2')
const {add,multiply,divide} = require('./module2')

console.log(multiply(2,22))

//++ Caching
require('./module3')()
require('./module3')()
require('./module3')()
