/*
	@param page 要查询的页数
    @param status1 要查询公司的状态
    @return reobj 返回查询十条数据,如果没数据返回获取失败信息
    @description 先为page没值的情况下默认为1  判断是否要根据公司的状态查询 查完判断数据是否为空 
*/
if (k.request.method == GET) {
    var page = k.request.queryString.page;
    var status = k.request.queryString.status;
    var table = k.database.getTable("enterprise");
    var reobj = {
        code: 200,
        msg: "success",
    };
    if (status) {
        var querylist = table.query().where("status==" + status).skip((page - 1) * 10).orderByDescending("register_time").take(10);
        if (!querylist) {
            reobj.code = 100;
            reobj.msg = "fail";
            reobj.data = "no message";
            k.Response.Json(reobj);
        } else {
            reobj.data = querylist;
            k.Response.Json(reobj);
        }
    } else {
        var querylist = table.query().skip((page - 1) * 10).take(10);
        if (!querylist) {
            reobj.code = 100;
            reobj.msg = "fail";
            reobj.data = "no message";
            k.Response.Json(reobj);
        } else {
            reobj.data = querylist;
            k.Response.Json(reobj);
        }
    }
}
else{
	reobj.code = 100;
    reobj.msg = "fail";
    reobj.data = "request error";
    k.Response.Json(reobj);
}