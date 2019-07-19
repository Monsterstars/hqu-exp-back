/**
 * 学生查询自己信息的api
 * 
 */

var sessionObj = {studentId: 1725121008};
k.session.set("key", sessionObj);
var code = "100";
var msg = "处理失败";
var obj = {};
if (k.request.method == 'GET') {
    //判断是否为“GET”请求
    var back = k.session.get("key");
    if (!back) { 
        //判断身份是否为学生
        msg = "登陆已过期，请重新登陆";
    } else {
        var stuId = back.studentId;
        if (!stuId) {
            //判断身份是否为学生
            msg = "登陆已过期，请重新登陆";
        } else {
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