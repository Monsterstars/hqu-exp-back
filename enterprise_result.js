/**
 * 企业发布实训结果api
 * 1、设置code为100，msg为“处理失败”
 * 2、判断请求是否为put
 * 3、若请求正确，判断证明及成绩是否均传入，若未传入则  msg 设为 "未传入全部数据";
 * 4、若传入，则判断成绩是否为0至100之间，若成绩格式不正确则  msg 设为 "成绩格式不正确";
 * 5、若正确，则从数据库中获取achievement，判断是否取得，若未获取到  msg 设为 "未取得记录";
 * 6、若取得，则储存每条证明信息，并将路径拼接为数组形式存入数据库，同时将mark数据存入数据库
 * 7、存入数据库后将code 设为 "200"， msg 设为 "处理成功";
 * 8、将code与msg赋给obj
 * 9、返回json
 */

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
        if (k.request.method == "PUT") {
            //判断请求是否为put
            var mark = k.request.mark;
            if (mark && k.request.files[0].fileName) {
                //判断是否证明及成绩均传入
                if (mark >= 0 && mark <= 100) {
                    //判断成绩是否为0至100之间
                    var achievementTable = k.database.getTable("stu_achievement");
                    var apply_id = k.request.apply_id;
                    var achievement = achievementTable.get(apply_id);
                    //从数据库中获取与apply_id相匹配的achievement
                    if (achievement) {
                        //判断是否取得achievement

                        if (!achievement.certificate && !achievement.mark) {
                            //判断数据库中是否有证明和成绩的数据
                            k.file.createFolder("achievement\\" + apply_id + "\\certificate", "");

                            for (var i = 0; i < k.request.files.length; i++) {
                                //遍历传入的证明材料
                                var file = k.request.files[i];
                                var filename = file.fileName;
                                filename = "achievement\\" + apply_id + "\\certificate\\" + filename;
                                file.save(filename);
                                //储存每个证明材料
                            }

                            var allCertificates = k.file.folderFiles("achievement\\" + apply_id + "\\certificate");
                            var certificate = allCertificates.map(function (certificate) {
                                return certificate.absoluteUrl;
                            }).join('\",\"');
                            certificate = '[\"' + certificate + '\"]';
                            achievement.certificate = certificate;
                            achievement.mark = mark;
                            achievementTable.update(achievement);

                            if (achievement.perception != "" && achievement.work_url != "") {
                                //判断企业结业结果和学生解也结果是否均传入
                                var apply = k.database.stu_apply.get(apply_id);
                                if (apply && apply.apply_status == 4) {
                                    //若均有则将状态改为结业（6）
                                    apply.apply_status = 6;
                                    k.database.stu_apply.update(apply);
                                }
                            }

                            code = "200";
                            msg = "处理成功";
                        } else {
                            //若数据库中有证明和成绩的数据
                            msg = "无法存入重复数据";
                        }
                    } else {
                        //若未取得achievement
                        msg = "未取得记录";
                    }
                } else {
                    //若成绩不在0至100之间
                    msg = "成绩格式不正确";
                }
            } else {
                //若未传入全部证明及成绩
                msg = "未传入全部数据";
            }
        }
    }
}
obj.code = code;
obj.msg = msg;
k.response.json(obj);