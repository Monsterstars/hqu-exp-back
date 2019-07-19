//获得当前登录的企业信息
//查询企业信息api
var code = "100";
var msg = "处理失败";
var data = null;
var obj = {};
var back = k.session.get("key");
var enterpriseId = back.enterpriseId;
if (back) {
    if (enterpriseId) { //判断当前用户是否为企业
        if (k.request.method == "GET") { //判断GET方法
            var enterprise = k.database.enterprise.get(enterpriseId);
            if (enterprise) {
                code = "200";
                msg = "请求成功";
                //delete enterprise['password'];
                data = enterprise;
            } else {
                code = "100";
                msg = "企业不存在";
            }
        } else {
            code = "100";
            msg = "method not GET"
        }
    }
} else {
    msg = "登录已过期，请重新登录";
}
obj.code = code;
obj.msg = msg;
obj.data = data;
k.response.json(obj);