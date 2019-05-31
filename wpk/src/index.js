console.log('hello webpack')
let a = require('./a.js');
a();
(() => {
    console.log('111')
})()

@log
class A {
    toString() {
        return '33333babel'
    }
}
let b = new A();
console.log(b.toString())

function log(target){
    console.log(target,'18');
}

require("./index.css");
require("./index.less");