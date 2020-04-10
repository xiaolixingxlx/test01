// app.js开启服务端的服务
// 用服务端开启的前后端交互的例子：评论上传
// 先把大框架搭出来，然后在里边添加内容。
//  1.先判断请求的路径是谁，例如，跳转的是'/',就到首页；跳转的是'post'，就到评论提交页。因为是一个form表单，点击提交按钮，action='url地址'，指定接收并处理的服务器程序。

fhka
// 引入文件
var fs = require('fs')// require作用： 1.加载文件模块并执行里面的代码2.拿到被加载文件模块导出的接口对象                    
//  1.加载http核心模块
var http = require('http')
// 获取URL 
var url = require('url')//require：要求 //request：请求
// 通过require引入art-template
var template = require('art-template')

// 设置数组  默认值 点击数组进行添加必须是 对象形式的数组元素
var comments = [
    {name:'张三',message:'我先试试看1',dataTime:'2020-05-01'},
    {name:'李四',message:'我先试试看2',dataTime:'2020-05-01'},
    {name:'王五',message:'我先试试看3',dataTime:'2020-05-01'},
]

http.createServer(function (request, response) { //  创建一个Web服务器
    // url.parse(请求路径，true)
    // true：将我们的query字符串转换成对象
    var pathnameObj = url.parse(request.url,true)
    var pathname = pathnameObj.pathname;
    //如果是首页的话，读取根目录文件
    if (pathname === '/') {
        // fs.readFile(路径,文件)   读取文件名和目录名
        fs.readFile('./views/index.html', function (err, data) {
            if (err) { return response.end('404') }//出错
           var htmlStr =  template.render(data.toString(),{
                comments:comments
            })
            response.end(htmlStr)
        })
    } else if (pathname === '/post') {  //如果是post
        // fs.readFile(路径,文件)   读取文件名和目录名
        fs.readFile('./views/post.html', function (err, data) {
            if (err) { return response.end('404') } //出错
            response.end(data)
        })
    } else if (pathname === '/pinglun') { //如果是评论的话，点击提交，获取query
        // 获取query对象  用url 模块的一个方法  //query:查询
        var con = pathnameObj.query;//路径名对象.查询 con即为对象
        // 将con对象添加给comments默认值(一开始var的默认值)  .unshift() 数组添加元素的方法  //comments:评论  unshift：取消移位
        comments.unshift(con);
        console.log(comments)// 打印
        // 重定向问题：点击完发表之后，需要重新返回首页(根目录)
        // 根据状态码判断是否需要重定向，statusCode = 302  如果点击提交，则需要重定向到/也就是我们的根目录
        response.statusCode = 302;  //302：重定向   301  304
        response.setHeader('Location','/'); //设置location='/'，回到根目录
        response.end()//结束
    }else{ //失败时，链接一个“失联”文件
        // fs.readFile(路径,文件)   读取文件名和目录名
        fs.readFile('./views/404.html',function(err,data){
            response.end(data)
        })
    }
}).listen(3500, function () { //  绑定端口号，启动服务器
    console.log('server is running....')
})


// // 先把大框架搭出来，然后在里边添加内容。
        // 1.引入文件
        // 2.1.加载http核心模块
        // 2.2.创建一个Web服务器
                // 2.3.注册request请求事件
        // 2.4.绑定端口号，启动服务器
// 业务逻辑思路：
// 1.创建web服务，
// 2.根据路径判断，先判断请求的路径是谁，
//   2.1.如跳转的是'/',就到首页；
//   2.2.如跳转的是'post'，就到评论提交页。
//         因为是一个form表单，点击提交按钮，action='url地址'，指定接收并处理的服务器程序。
//   2.3.如果是评论的话，点击提交，获取query，添加新的对象元素后，显示出来，并返回至首页。
//   2.4.请求失败时，读取并返回一个404文件。
// 3.绑定端口号，启动服务器