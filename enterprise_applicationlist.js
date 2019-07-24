//分页查询当前企业的实训申请记录

//企业查询申请信息api
var code = "100";
var msg = "处理失败";
var data = new Array();
var obj = {};
if (k.request.method == "GET") {
    var internshipId = k.request.internshipId;
    var page = k.request.page;
    var status = k.request.status;
    var apply = k.database.stu_apply.query("exp_id == " + internshipId&&"apply_status =="+status).orderByDescending("submit_time").skip((page - 1) * 10).take(10);

    if (apply) {
        for (var i = 0; i < apply.length; i++) {
            var stuId = apply[i].stu_id;
            var student = k.database.student.get(stuId);
            var stuName = student.name;
            var enterenceYear = student.enterence_year;
            var major = student.major;
            apply[i].stuName = stuName;
            apply[i].enterence_year = enterenceYear;
            apply[i].major = major;
            data.push(apply[i]);
        }
        code = "200";
        msg = "处理成功";
    } else {
        code = "100";
        msg = "该实训没有收到申请";
    }
    obj.code = code;
    obj.msg = msg;
    obj.data = data;
    k.response.json(obj);
}