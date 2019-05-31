require('@babel/polyfill');
module.exports=function(){
    console.log("a.js")
}
class B{

}

//Generator函数.内置的API，不会被转化，需要使用"@babel/plugin-transform-runtime"作为开发依赖,@babel/runtime生产依赖。
//@babel/runtime以避免编译输出中的重复。运行时将编译到您的构建中。
function * gen(param){
    yield 1;
}

console.log(gen().next())

//es7语法需要使用@babel/polyfill补丁包去解析
'aaa'.includes('a');