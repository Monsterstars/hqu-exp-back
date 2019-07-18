//分页查询当前企业的所有实训

var obj = {};
var code = "100";
var data = new Array();
var msg = "处理失败";

var back = k.session.get("key");
var enterpriseId = back.id;

if (back.role == "enterprise") {
    if (k.request.method == "GET") {
        var page = k.request.page;
        var internship = k.database.internship_detail.query("enterprise_id ==" + enterpriseId).skip((page - 1) * 2).take(2);
        for (var i = 0; i < internship.length; i++) {
            data.push(internship[i]);
        }
        code = "200";
        msg = "处理成功";
    }
    obj.code = code;
    obj.msg = msg;
    obj.data = data;
    k.response.json(obj);
}