/**
 * 企业上传实训证明api
 *api/enterprise/result/certificate
 */
var sessionObj = {
    enterpriseId: "3e10d708-0b7e-9b75-906b-96b86a811f39",
};
k.session.set("key", sessionObj);
var code = "100";
var msg = "处理失败";
var obj = {};
var back = k.session.get("key");
if (!back) {
    msg = "登陆已过期，请重新登陆";
} else {
    var enterpriseId = back.enterpriseId;
    if (!enterpriseId) {
        msg = "登陆已过期，请重新登陆";
    } else {
        if (k.request.method == "POST") {
            //判断请求是否为put
            if (k.request.files.length!=0) {
                //判断是否有文件证明传入
                var exp_id = k.request.exp_id;
                var applyTable = k.database.getTable("stu_apply");
                var applylist = applyTable.findAll("exp_id == " + exp_id + "&& apply_status == 4");//获取当前项目全部通过的申请数据
                if (applylist.length!=0) {
                    //判断是否取得数据
                    var achievementTable = k.database.getTable("stu_achievement");
                    var achievement = achievementTable.get(applylist[0]._id);
                    if (!achievement.certificate) {
                        //判断数据库中是否有证明材料的数据
                        k.file.createFolder("achievement\\ " + exp_id + "\\certificate ", "");
                        for (var i = 0; i < k.request.files.length; i++) {
                            //遍历传入的证明材料
                            var file = k.request.files[i];
                            var filename = file.fileName;
                            filename = "achievement\\" + exp_id + "\\certificate\\" + filename;
                            file.save(filename);
                            //储存每个证明材料
                        }
                        var allCertificates = k.file.folderFiles("achievement\\" + exp_id + "\\certificate");
                        var certificate = allCertificates.map(function(certificate) {
                            return certificate.absoluteUrl;
                        }).join('\",\"');
                        certificate = '[\"' + certificate + '\"]';//拼接文件路径
                        for (var i = 0; i < applylist.length; i++) {//遍历全部的申请
                            achievement = achievementTable.get(applylist[i]._id);
                            achievement.certificate = certificate;
                            achievementTable.update(achievement);
                            if (achievement.perception != "" && achievement.work_url != "" && achievement.mark != "") {
                                //判断企业结业结果和学生结业结果是否均传入                           
                                applylist[i].apply_status = 6;
                                applyTable.update(applylist[i]);
                            }

                        }
                        code = "200";
                        msg = "处理成功";

                    } else {
                        //若数据库中有证明的数据
                        msg = "无法存入重复数据";
                    }
                } else {
                    //若未取得applylist
                    msg = "未取得记录";
                }
            } else {
                //若传入文件为空
                msg = "未传入文件";
            }
        }
    }
} 
obj.code = code;
obj.msg = msg;
k.response.json(obj);