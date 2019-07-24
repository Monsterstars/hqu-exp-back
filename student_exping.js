/**
 * 学生查询个人正在进行的实训的api
 * 
 */

var sessionObj = {
    studentId: 1725121008
};
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
            var applyTable = k.database.getTable("stu_apply");
            var apply = applyTable.find("stu_id == " + stuId + "&&apply_status==4");
            if (apply) {
                //判断是否取得apply数据
                var internshipTable = k.database.getTable("internship_detail");
                var exp = internshipTable.get(apply.exp_id); //通过取得的apply中的exp_id查询实训信息
                if (exp) {
                    //判断是否取得实训信息
                    var enterprise = k.database.enterprise.get(exp.enterprise_id); //通过exp中的enterprise_id查询企业信息
                    if (enterprise) {
                        //判断是否取得企业信息
                        var data = {
                            apply_id: apply._id,
                            exp_id: apply.exp_id,
                            topic: exp.topic,
                            enterprise_id: exp.enterprise_id,
                            enterprise_name: enterprise.name
                        };
                        code = "200";
                        msg = "查询成功";
                        obj.data = data;
                    }else{
                        msg = "未获取到企业信息";
                    }
                } else {
                    msg = "未获取到实训信息";
                }
            } else {
                msg = "没有正在进行的实训项目";

            }
        }
    }
}

obj.code = code;
obj.msg = msg;
k.response.json(obj);