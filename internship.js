/*
	@param page 要查询的页数
    @param status 要查询实训的状态
    @return reobj 返回查询十条数据
    @description 先判断状态没然后返回对应的实训数据
*/
var page= k.request.queryString.page;
var status = k.request.queryString.status;
var table = k.database.getTable("internship_detail");
var reobj = {
    code: 200,
    msg: "success",
};
if (status) {
    var querylist = table.query().where("status=="+status).skip((page-1)*10).take(10);
    reobj.data = querylist;
    k.Response.Json(reobj);
} else {
    var querylist = table.query().skip((page-1)*10).take(10);
    reobj.data = querylist;
    k.Response.Json(reobj);
}