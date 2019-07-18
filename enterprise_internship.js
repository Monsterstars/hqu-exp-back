//企业对实训的增删改查操作

var code = "100";
var msg = "处理失败";
var data = null;
var back = k.session.get("key");
if (!back) {
    msg = "登陆已过期，请重新登陆";
} else {
    var enterpriseId = back.enterpriseId;
    if (!enterpriseId) {
        msg = "登陆已过期，请重新登陆";
    } else {
        //如果method为GET 实现根据实训id查找实训 
        if (k.request.method == 'GET') { //判断请求是否为get
            var expId = k.request.expId;
            var expInfo = k.database.internship_detail.get(expId);

            if (expInfo) { // 判断是否取得expInfo
                code = "200";
                msg = "查询成功";
                data = expInfo;
                var applyTable = k.database.getTable("stu_apply"); //从stu_apply数据库取得申请此项目的记录
                var apply = applyTable.findAll("exp_id", expId);
                var submit_num = apply.length; //计算申请总数
                var enterprise_check_num = 0;
                var stu_check_num = 0;

                for (var i = 0; i < apply.length; i++) { //计算企业通过数和学生通过数
                    if (apply[i].apply_status == 2) {
                        enterprise_check_num += 1;
                    } else if (apply[i].apply_status == 4) {
                        stu_check_num += 1;
                    }
                }
                data.submit_num = submit_num; //申请实训总数
                data.enterprise_check_num = enterprise_check_num; //企业通过数
                data.stu_check_num = stu_check_num; //学生确认数
            }
        }

        //如果method为DELETE实现根据实训id删除实训
        if (k.request.method == "DELETE") {
            var internshipId = k.request.expId;
            k.database.internship_detail.delete(internshipId);
            code == "200";
            msg == "删除成功";
        }

        //如果method为PUT 实现根据实训id修改实训信息
        if (k.request.method == "PUT") {
            var internshipId = k.request.form.expId;
            var internship = k.database.internship_detail.get(internshipId);
            if (internship) {
                if (internship.status == 2) {
                    code = "100";
                    msg = "该实训已审核成功，无法修改信息";
                } else {
                    var topic = k.request.form.topic;
                    var expBeginTime = k.request.form.exp_begin_time;
                    var expEndTime = k.request.form.exp_end_time;
                    var description = k.request.form.description;
                    var needNum = k.request.form.need_num;
                    var applyEndTime = k.request.form.apply_end_time;
                    var expModifyTime = (new Date()).getTime();

                    var tableValue = {
                        topic: topic,
                        exp_begin_time: new Date(expBeginTime),
                        exp_end_time: new Date(expEndTime),
                        description: description,
                        need_num: needNum,
                        apply_end_time: new Date(applyEndTime),
                        exp_modify_time: new Date(expModifyTime)
                    };

                    k.database.internship_detail.update(internshipId, tableValue);
                    code = "200";
                    msg = "处理成功";
                }
            } else {
                code = "100";
                msg = "internship is not exit";
            }
        }

        //如果method为POST 为根据当前登入的cookie发布实训
        if (k.request.method == "POST") {

            var enterprise = k.database.enterprise.get(enterpriseId); //取得session中的id

            if (enterprise) {
                if (enterprise.status == 2) { //判断企业是否通过审核
                    var topic = k.request.form.topic;
                    var expBeginTime = k.request.form.exp_begin_time;
                    var expEndTime = k.request.form.exp_end_time;
                    var submitTime = (new Date()).getTime();
                    var description = k.request.form.description;
                    var needNum = k.request.form.need_num;
                    var applyEndTime = k.request.form.apply_end_time;
                    var verify_status = 0;

                    var tableValue = {
                        topic: topic,
                        enterprise_id: enterpriseId,
                        exp_begin_time: expBeginTime,
                        exp_end_time: expEndTime,
                        submit_time: submitTime,
                        description: description,
                        need_num: needNum,
                        apply_end_time: applyEndTime,
                        status: verify_status,
                        exp_modify_time: submitTime
                    };

                    var internshipId = k.database.internship_detail.add(tableValue);
                    code = "200";
                    msg = "处理成功";
                } else {
                    code = "100";
                    msg = "企业没有通过审核，不能发布实训";
                }
            } else {
                code = "100";
                msg = "enterprise not exit";
            }
        }

        obj.code = code;
        obj.msg = msg;
        obj.data = data;
        k.response.json(obj);
    }
}