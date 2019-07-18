var code = "100";
var msg = "1处理失败";
var data = null;
var obj = {};
/*var sess = {
    studentId: 123
};
k.session.set("key", sess);*/
//k.session.clear(); 
if (k.request.method == 'GET') {
    var back = k.session.get("key");
    if (!back) {
        msg = "1登陆已过期，请重新登陆";
    } else {
        var studentId = back.studentId;
        if (!studentId) {
            msg = "2登陆已过期，请重新登陆";
        } else {
            var page = k.request.page;
            if (!page) {
                page = 1;
            }
            var table = k.database.getTable("internship_detail");
            var internship_detail = table.query().skip((page - 1) * 10).take(10);
            for (var i = 0; i < internship_detail.length; i++) {
                var enterpriseTable = k.database.getTable("enterprise");
                var enterprise = enterpriseTable.get(internship_detail[i].enterprise_id);
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