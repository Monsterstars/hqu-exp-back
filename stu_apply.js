//学生报名实训，确认实训的api

if (k.request.method == 'POST') {
    var stu_id = k.request.stu_id;
    var id = k.request.id;
    var status = k.request.status;
    var back = k.session.get("key");
    var studentId = back.studentId;
    if (!studentId || studentId != stu_id) {
        var obj = {
            code: "100",
            msg: "登陆已过期，请重新登陆"
        };
        k.response.json(obj);
    } else {
        var table = k.database.getTable("stu_apply");
        var obj = {
            stu_id: stu_id,
            id: id,
            apply_status: status
        };
        table.add(obj);
        var obj = {
            code: "200",
            msg: "处理成功"
        };
        k.response.json(obj);
    }
} else if (k.request.method == 'PUT') {
    var apply_id = k.request.apply_id;
    var apply_status = k.request.apply_status;
    var back = k.session.get("key");
    var studentId = back.studentId;
    if (!studentId || studentId != stu_id) {
        var obj = {
            code: "100",
            msg: "登陆已过期，请重新登陆"
        };
        k.response.json(obj);
    } else {
        var table = k.database.getTable("stu_apply");
        var stu_apply = table.find("_id", apply_id);
        stu_apply.apply_status = apply_status;
        table.update(stu_apply);
        if (apply_status == 4) {
            var achievementTable = k.database.getTable("stu_achievement");
            var achievementObj = {
                apply_id: apply_id,
            };
            achievementTable.add(achievementObj);
        }
        var obj = {
            code: "200",
            msg: "处理成功"
        };
        k.response.json(obj);
    }
}