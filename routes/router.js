//路由
function route(handle,pathname){

    console.log("request route:"+pathname);

    if(typeof handle[pathname] === 'function'){
        handle[pathname](req,res);
    }else{
        console.log("No Request handler found for " +pathname);
    }
}
exports.route =route