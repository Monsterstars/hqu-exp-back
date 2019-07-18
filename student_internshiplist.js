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
        var studentId = back.studentId;
        if (!studentId) {
            //判断身份是否为学生
            msg = "登陆已过期，请重新登陆";
        } else {
            var page = k.request.page;
            if (!page||page < 1) {
                //若页码数据为空或不标准
                page = 1;
            }
            var table = k.database.getTable("internship_detail");
            var internship_detail = table.query().skip((page - 1) * 10).take(10);//每页有10个数据，取的页码后跳过(page-1)*10个数据向后取
            for (var i = 0; i < internship_detail.length; i++) {
                var enterpriseTable = k.database.getTable("enterprise");
                var enterprise = enterpriseTable.get(internship_detail[i].enterprise_id); //根据每条数据的enterprise_id，从enterprise数据库查得相对应数据
                if (enterprise) {
                    internship_detail[i].enterprise = enterprise.name;
                }
            }

            code = "200";
            msg = "查询成功";
            obj.data = internship_detail;
        }
    }
}

obj.code = code;
obj.msg = msg;
k.response.json(obj);