/**
 * 企业处理实训报名信息api
 * 1、设置code为100，msg为“处理失败”
 * 2、判断请求是否为put
 * 3、获取传入的 applyId 与 status
 * 4、判断 status 是否为 通过2或 不通过3，若值不正确则 msg 设为 "无法更改此状态";
 * 5、若status正确则从数据库中获取apply，判断是否取得，若未获取到  msg 设为 "申请id错误";
 * 6、若取得则判断现状态是否为未处理（0），若现状态不正确则 msg 设为 "无法更改此状态";
 * 7、若现状态正确则更改现状态为传入状态，在stu_achievement数据库新建数据，并code 设为 "200"， msg 奢设为 "处理成功";
 * 8、将code与msg赋给obj
 * 9、返回json
 *  
 */

var obj = {};
var msg = "1处理失败";
var code = "100";
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
            var applyId = k.request.applyId;
            var newStatus = k.request.applyStatus;
            if (newStatus == 2 || newStatus == 3) {
                //判断更改状态是否为为通过(2)或不通过(3)
                var applyTable = k.database.getTable("stu_apply");
                var apply = applyTable.get(applyId);
                if (apply) {
                    //判断是否取得apply
                    var status = apply.apply_status;
                    if (status == 0) {
                        //判断现状态是否为未处理
                        apply.apply_status = newStatus;
                        applyTable.update(apply);
                        code = "200";
                        msg = "处理成功";
                    } else {
                        //else现状态不为未处理
                        msg = "无法更改此状态";
                    }
                } else {
                    //else未取得apply
                    msg = "申请信息不存在";
                }
            } else {
                //else更改状态错误
                msg = "无法更改此状态";
            }
        }
    }
}
obj.code = code;
obj.msg = msg;
k.response.json(obj);