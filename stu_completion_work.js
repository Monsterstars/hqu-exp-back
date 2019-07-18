//学生结业传成果接口
var obj = {};
var code = "100";
var msg = "处理失败";
if (k.request.method == "POST") {
    var applyId = k.request.apply_id;
    //var applyId = "ca09d708-8f11-0165-93e2-7578528d99f1";
    var achievement = k.database.stu_achievement.get(applyId);
    if (achievement) {
        if (k.request.files.length > 0) {
            if (k.request.files[0].fileName != "") {
                k.file.createFolder("achievement\\" + applyId + "\\work", "");

                for (var i = 0; i < k.request.files.length; i++) {
                    var file = k.request.files[i];
                    var filename = file.fileName;
                    filename = "achievement\\" + applyId + "\\work\\" + filename;
                    file.save(filename); //储存心得文件
                }
                var allwork = k.file.folderFiles("achievement\\" + applyId + "\\work");

                var work = allwork.map(function (work) {
                    return work.absoluteUrl
                }).join('\",\"');
                work = "[\"" + work + "\"]";

                achievement.work_url = work;
                k.database.stu_achievement.update(achievement);
                code = "200";
                msg = "处理成功";
            }
        } else {
            msg = "未上传文件";
        }
    } else {
        msg = "没有改申请记录";
    }

    obj.code = code;
    obj.msg = msg;
    k.response.json(obj);
}