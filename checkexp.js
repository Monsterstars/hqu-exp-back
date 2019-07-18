/*
	@param expid 管理员通过或不通过的实训信息id
    @param passed 管理员是否通过 2表示通过 1表示不通过
    @return obj 返回处理成功或者出错的状态
    @description 先判断传来的passed是否为1 or 2 再判断数据库是否存在该id的实训信息
*/
if (k.request.method == POST) {
    var expid = k.request.queryString.expid;
    var passed = k.request.queryString.passed;
    var reobj = {
        code: 200,
        msg: "success",
    };
    if (passed == 2 || passed == 1) {
        var table = k.database.getTable("internship_detail");
        var query = table.get(expid);
        if (query) {
            var obj = {
                status: passed,
            }
            table.update(expid, obj);
            k.response.json(reobj);
        } else {
            reobj.code = 100;
            reobj.msg = "fail";
            reobj.data = "not found id";
            k.response.json(reobj);
        }
    } else {
        reobj.code = 100;
        reobj.msg = "fail";
        reobj.data = "status error";
        k.response.json(reobj);
    }
}
/*
	@param expid 要查询的实训信息id
    @return obj 返回处理成功或者出错的状态以及该实训的详细信息
    @description 根据id查询实训信息
*/
else if (k.request.method == GET){
    var expid = k.request.expid;
    var tab_intern = k.database.getTable("internship_detail");
    var reobj = {
        code: 100,
        msg: "success",
    };
    if (expid) {
        var query = tab_intern.get(expid);
        //id查询结果不存在
        if (!query) {
            reobj.code = 200;
            reobj.msg = "fail";
            reobj.data = "not found id";
            k.Response.Json(reobj);
        } else if (query.status == 1) { //实训已通过，查询报名人数
            var tab_apply = k.database.getTable("stu_apply");
            var applylist = tab_apply.findAll("apply_status==0");
            var entlist = tab_apply.findAll("apply_status==2");
            var stulist = tab_apply.findAll("apply_status==4");
            query.submit_num = applylist.length;
            query.enterprise_check_num = entlist.length;
            query.stu_check_num = entlist.length;
            reobj.data = query;
            k.Response.Json(reobj);
        } else { //实训未通过或正审核，不必查询报名人数
            reobj.data = query;
            k.Response.Json(reobj);
        }
    } else { //id不存在
        reobj.code = 200;
        reobj.msg = "fail";
        reobj.data = "no id";
        k.Response.Json(reobj);
    }
}else{
	reobj.code = 200;
    reobj.msg = "fail";
    reobj.data = "request error";
    k.Response.Json(reobj);
}