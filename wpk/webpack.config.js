//wenpack是使用node写出来的
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');//抽离css到单独的文件
const TerserJSPlugin = require("terser-webpack-plugin");//压缩优化js代码
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");//压缩css代码
module.exports = {
    devServer: {//开发服务器配置 
        port: '3000',
        progress: true,//显示进度条
        contentBase: './build',//告诉服务器从哪个目录中提供内容。只有在你想要提供静态文件时才需要
        open: true,//自动打开浏览器
    },
    mode: 'development',//模式，默认production  development
    entry: './src/index.js',
    output: {
        filename: 'bundle.[hash:8].js',//打包后的文件名//加上[hash]是每次打包后都生成一个新的文件，不会覆盖之前的文件.:8只显示8位hash值
        path: path.resolve(__dirname, 'build')//路径必须是一个绝对路径

    },
    optimization: {//优化项
        minimizer: [
            // new TerserJSPlugin({
            //     cache:true,//启用文件缓存。缓存目录的默认路径：node_modules/.cache/terser-webpack-plugin
            //     parallel:true,//使用多进程并行运行来提高构建速度 强烈建议
            //     sourceMap:true//源码映射
            // }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({//根据模版文件自动生成一个引入bundle.js的html文件
            template: './src/index.html',//以谁为模版
            filename: 'index.html ',//打包出来的文件名
            // minify: {//最小化文件，压缩代码
            //     removeAttributeQuotes: true,//去掉双引号
            //     collapseWhitespace: true,//变为一行
            // },
            // hash: true//打包后的文件加上hash挫
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css'
        }),

    ],
    module: {//模块
        rules: [
            // {
            //     test:/\.js$/,
            //     use:{
            //         loader:'eslint-loader',//校验eslint规范,yarn add eslint eslint-loader -D
            //         options:{
            //             enforce:'pre'//强制当前loader在 '普通loader' 前执行
            //         }
            //     }
            // },
            {
                test:/\.js$/, //普通loader 
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:[//把es6转为es5
                            '@babel/preset-env'
                        ],
                        plugins:[
                            ['@babel/plugin-proposal-decorators',{ "legacy": true }],//转化装饰器语法
                            ['@babel/plugin-proposal-class-properties', { "loose" : true }],//解析高级语法如 class
                            "@babel/plugin-transform-runtime",
                        ]
                    }
                },
                include:path.resolve(__dirname,'src'),//包括这个路径下的文件
                exclude:/node_modules/,//排除这个文件下的文件
            },
            //解析以.css结尾的文件，根据特定的loader
            //loader特点 希望单一
            //css-loader 解析@import语法    style-loader css插入head标签中
            //lopader用法： 字符串只用一个loader。多个loader需要[]。顺序默认是从右到左执行 从下到上
            // { test: /\.css$/, use:['style-loader','css-loader']},
            //loader还可以写成对象形式。
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,//抽离出来的文件以link方式插入html
                    'css-loader',
                    'postcss-loader',//css前面自动加前缀
                ]
            },
            //处理less文件
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader',//less转为css
                ]
            },
        ]
    }
}