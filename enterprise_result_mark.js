/**gzk
 * 企业发布实训成绩api
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
            var mark = k.request.mark;
            if (mark) {
                //判断是否证明及成绩均传入
                if (mark >= 0 && mark <= 100) {
                    //判断成绩是否为0至100之间
                    var achievementTable = k.database.getTable("stu_achievement");
                    var apply_id = k.request.apply_id;
                    var achievement = achievementTable.get(apply_id);
                    //从数据库中获取与apply_id相匹配的achievement
                    if (achievement) {
                        //判断是否取得achievement

                        if (!achievement.mark) {
                            //判断数据库中是否有成绩的数据
                            
                            achievement.mark = mark;
                            achievement.certificate = "已证明实训完成";
                            
                            achievementTable.update(achievement);

                            if (achievement.perception != "" && achievement.work_url != "") {
                                //判断企业结业结果和学生结业结果是否均传入
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
                            //若数据库中有成绩的数据
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
                //若未传入及成绩
                msg = "未传入成绩数据";
            }
        }
    }
}
obj.code = code;
obj.msg = msg;
k.response.json(obj);