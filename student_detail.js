/**
 * 管理员/企业查询学生信息的api
 * 
 */
var sessionObj = {enterpriseId: 1725121008};
k.session.set("key", sessionObj);
//k.session.clear();
var code = "100";
var msg = "处理失败";
var obj = {};
if (k.request.method == 'GET') {
    //判断是否为“GET”请求
    var back = k.session.get("key");
    if (!back) { 
        //判断身份是否为管理员/企业
        msg = "登陆已过期，请重新登陆";
    } else {
        var adminId = back.adminId;
        var enterpriseId = back.enterpriseId;
        if (!(adminId||enterpriseId)) {
            //判断身份是否为学生
            msg = "登陆已过期，请重新登陆";
        } else {
            var stuId = k.request.student
            var stuTable = k.database.getTable("student");
            var student = stuTable.get(stuId);
            student.password = "**********";
            code = "200";
            msg = "查询成功";
            obj.data = student;
        }
    }
}

obj.code = code;
obj.msg = msg;
k.response.json(obj);