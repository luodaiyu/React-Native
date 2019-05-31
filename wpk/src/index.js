//倒入第三方库
//1 math
// import $ from 'jquery';
//暴露全局的loader expose-loader .内联loader
//loader种类：pre 前面执行的loader, nomal 普通的loader ， 内联端的loader， 后置loader postloader
// console.log(window.$);

//2 math
//不想手动倒入$符，可以使用插件帮助注入$符到每个模块
// console.log($,'10');
// console.log(window.$,'11');//输出undefined 这是由于webpack插件只是导入到，每个模块，但是并没有暴露到全局对象上

//3 math
//webpack配置中写入以下配置。该配置用于，在html页面引入第三方库csdn，但是不需要打包进bundle
// externals: {
//     jquery: 'jQuery'
//   }
//import $ from 'jquery';
//console.log($);

//-----------
// console.log('hello webpack')
// let a = require('./a.js');
// a();
// (() => {
//     console.log('111')
// })()

// @log
// class A {
//     toString() {
//         return '33333babel'
//     }
// }
// let b = new A();
// console.log(b.toString())

// function log(target){
//     console.log(target,'18');
// }

// require("./index.css");
// require("./index.less");

//-------


//使用webpack打包图片
//1)在js中创建图片来引入
//file-loader 默认会在内部生成一张图片到build目录下
//把生成的图片的名字返回回来
import './index.css';
import logo from './one.jpg';
console.log(logo,'53');
let image=new Image();
image.src=logo;
document.body.appendChild(image);

//2）在css中引入backgroun('url)

//3)<img src="" alt="" />
//在页面上使用img标签引入图片。需要使用html-withimg-loader.将图片路由换成存在的hashh值名的图片
