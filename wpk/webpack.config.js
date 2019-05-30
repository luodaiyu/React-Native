//wenpack是使用node写出来的
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
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
    plugins: [
        new HtmlWebpackPlugin({//根据模版文件自动生成一个引入bundle.js的html文件
            template: './src/index.html',//以谁为模版
            filename: 'index.html ',//打包出来的文件名
            minify: {//最小化文件，压缩代码
                removeAttributeQuotes: true,//去掉双引号
                collapseWhitespace: true,//变为一行
            },
            hash: true//打包后的文件加上hash挫
        })
    ],
    module: {//模块
        rules: [//解析以.css结尾的文件，根据特定的loader
            //loader特点 希望单一
            //css-loader 解析@import语法    style-loader css插入head标签中
            //lopader用法： 字符串只用一个loader。多个loader需要[]。顺序默认是从右到左执行
            // { test: /\.css$/, use:['style-loader','css-loader']},
            //loader还可以写成对象形式。
            {
                test: /\.css$/, use: [
                    {
                        loader: 'style-loader',
                        options: {//将style插入到顶部。为了使我们自己在html里写的样式优先级更高
                            insertAt: 'top'
                        }
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            //处理less文件
            {
                test: /\.less$/, 
                use: [
                    {
                        loader: 'style-loader',
                        options: {//将style插入到顶部。为了使我们自己在html里写的样式优先级更高
                            insertAt: 'top'
                        }
                    },
                    'css-loader',
                    'less-loader',//less转为css
                ]
            },
        ]
    }
}