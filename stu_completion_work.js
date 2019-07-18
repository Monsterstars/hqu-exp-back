//学生结业传成果接口
var obj = {};
var code = "100";
var msg = "处理失败";
if (k.request.method == "POST") {
    var appyId = k.request.apply_id;
    //var appyId = "ca09d708-8f11-0165-93e2-7578528d99f1";
    var achievement = k.database.stu_achievement.get(appyId);
    if (achievement) {
        if (k.request.files.length > 0) {
            k.file.createFolder("achievement", k.request.folder);
            k.file.createFolder(appyId, "achievement");
            k.file.createFolder("work", appyId);

            for (var i = 0; i < k.request.length; i++) {
                var file = k.request.files[i];files
                var filename = file.fileName;
                filename = "achievement\\" + appyId + "\\work\\" + filename;
                file.save(filename); //储存心得文件
            }
            var allwork = k.file.folderFiles("achievement\\" + appyId + "\\work");
            var work = allwork.map(function(work){
                return work.absoluteUrl
            }).join('\",\"');
            work = "[\""+work+"\"]";
            achievement.work_url = work;
            k.database.stu_achievement.update(achievement);
            code = "200";
            msg = "处理成功";
        }{
            msg = "未上传文件";
        }
    }else{
        msg = "没有改申请记录";
    }

    obj.code = code;
    obj.msg = msg;
    k.response.json(obj);
}