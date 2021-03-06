var http = require("http");
var url = require("url");
var fs = require("fs");
var server1 = http.createServer(function (request, response) {
    var urlObj = url.parse(request.url, true);
    var pathname = urlObj.pathname;
    var query = urlObj.query;
    var reg = /\.(HTML|CSS|JS|ICO)/i;
    if (reg.test(pathname)) {
        var suffix = reg.exec(pathname)[1].toUpperCase();
        var suffixMIME = suffix === 'HTML' ? 'text/html' : (suffix === 'CSS' ? 'text/css' : 'text/javascript');
        try {
            console.log(pathname);
            var conFile = fs.readFileSync('./public' + pathname, 'utf-8');
            response.writeHead(200, { 'content-type': suffixMIME + ';charset=utf-8;' });
            response.end(conFile);
            //以conFile结束向客户端的响应，即给客户端返回./index.html的全部代码，供客户端渲染成页面。
        } catch (e) {
            response.writeHead(404, { 'content-type': 'text/plain;charset=utf-8;' });
            response.end('request file is not found!');
        }
        return;
    }
    //->数据API请求处理:客户端的JS代码中我们通过AJAX向服务器发送的请求,服务器接收到请求并且
    // 获取客户端传递的数据,把需要的数据内容准备好,然后在返回给客户端,客户端在AJAX的READY
    // STATE等于4的时候获取返回的内容(都是按照API的规范文档来处理)
    var customData = fs.readFileSync('./public/json/custom.json', 'utf-8');
    customData.length === 0 ? customData = '[]' : null;
    customData = JSON.parse(customData);

    var blogData = fs.readFileSync('./public/json/blogItem.json', 'utf-8');
    blogData = JSON.parse(blogData);

    var result = {
        code: 1,
        msg: '失败',
        data: null
    };
    var customId = null;
    
    //1)获取所有的客户信息
    if (pathname === '/getAllList') {
        if (customData.length > 0) {
            result = {
                code: 0,
                msg: '成功',
                data: customData
            };
        }
        response.writeHead(200, { 'content-type': 'application/json;charset=utf-8;' });
        response.end(JSON.stringify(result));
        return;
    }
    if (pathname === '/getBlogList') {
        
            result = {
                code: 0,
                msg: '成功',
                data: blogData
            };

        response.writeHead(200, { 'content-type': 'application/json;charset=utf-8;' });
        response.end(JSON.stringify(result));
        return;
    }
    //2)获取指定的客户信息
    if (pathname === '/getInfo') {
        customId = query['id'];
        customData.forEach(function (item, index) {
            if (item['id'] == customId) {
                result = {
                    code: 0,
                    msg: '成功',
                    data: item
                };
            }
        });
        response.writeHead(200, { 'content-type': 'application/json;charset=utf-8;' });
        response.end(JSON.stringify(result));
        return;
    }
    //3)增加客户信息
    if (pathname === '/addInfo') {
        var str = '';
        request.on('data', function (chunk) {
            str += chunk;
        });
        request.on('end', function () {
            var data = JSON.parse(str);
            data['id'] = customData.length === 0 ? 1 : parseFloat(customData[customData.length - 1]['id']) + 1;
            customData.push(data);
            fs.writeFileSync('./public/json/custom.json', JSON.stringify(customData), 'utf-8');
            result = {
                code: 0,
                msg: '成功'
            };
            response.writeHead(200, { 'content-type': 'application/json;charset=utf-8;' });
            response.end(JSON.stringify(result));
        });
        return;
    }
    //4)修改客户信息
    if (pathname === '/updateInfo') {
        str = '';
        request.on('data', function (chunk) {
            str += chunk;
        });
        request.on('end', function () {
            var data = JSON.parse(str),
                flag = false;
            for (var i = 0; i < customData.length; i++) {
                if (data['id'] == customData[i]['id']) {
                    customData[i] = data;
                    flag = true;
                    break;
                }
            }
            if (flag) {
                fs.writeFileSync('./public/json/custom.json', JSON.stringify(customData), 'utf-8');
                result = {
                    code: 0,
                    msg: '成功'
                };
            }
            response.writeHead(200, { 'content-type': 'application/json;charset=utf-8;' });
            response.end(JSON.stringify(result));
        });
        return;
    }
    //5)删除客户信息
    if (pathname === '/removeInfo') {
        customId = query['id'];
        var flag = false;
        customData.forEach(function (item, index) {
            if (item['id'] == customId) {
                customData.splice(index, 1);
                flag = true;
            }
        });
        if (flag) {
            fs.writeFileSync('./public/json/custom.json', JSON.stringify(customData), 'utf-8');
            result = {
                code: 0,
                msg: '成功'
            };
        }
        response.writeHead(200, { 'content-type': 'application/json;charset=utf-8;' });
        response.end(JSON.stringify(result));
        return;
    }
    response.writeHead(404, { 'content-type': 'text/plain;charset=utf-8;' });
    response.end('request url is not found!');
});
server1.listen(3000, function () {
    console.log("server is success,listening on 80 port!");
});