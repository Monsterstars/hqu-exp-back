/**
 * 查询企业详细信息及审核企业的api
 * 1、设置code为100，msg为“查询失败”，data为null
 * 2、判断请求类型
 * 3、获取传入的enterpriseId
 * 4、数据库查询enterprise
 * 5、若查询成功则重新赋值code、msg与data，并隐藏密码
 * 6、若查询失败或请求类型不正确不改变返回数据
 * 7、返回json
 */

var code = "100";
var msg = "处理失败";
var obj = {};
var sess = {
    adminId: 123
};
k.session.set("key", sess);
//k.session.clear(); 
var back = k.session.get("key");
if (!back) {
    msg = "1登陆已过期，请重新登陆";
} else {
    var adminId = back.adminId;
    if (!adminId) {
        msg = "2登陆已过期，请重新登陆";
    } else {
        if (k.request.method == "GET") {
            //判断是否为get请求
            var enterpriseId = k.request.enterpriseId;
            var enterpriseTable = k.database.getTable("enterprise");
            var enterprise = enterpriseTable.get(enterpriseId);
            if (enterprise) {
                //判断是否查出enterprise
                code = "200";
                msg = "查询成功";
                enterprise.password = "*********"; //隐藏密码
                obj.data = enterprise;
            }
        } else if (k.request.method == "PUT") {
            //判断是否为put请求
            var enterpriseId = k.request.enterpriseId;
            var newStatus = k.request.status;
            if (newStatus == 1 || newStatus == 2) {
                //判断更改状态为通过(1)或不通过(2)
                var enterpriseTable = k.database.getTable("enterprise");
                var enterprise = enterpriseTable.get(enterpriseId);
                if (enterprise) {
                    //判断是否取得enterpriseId相匹配的数据
                    if (enterprise.status == 0) {
                        //判断现状态是否为待审核
                        enterprise.status = newStatus;
                        enterpriseTable.update(enterprise);
                        code = "200";
                        msg = "处理成功";
                    } else {
                        //else不为待审核
                        msg = "无法更改此状态";
                    }
                } else {
                    //else未取得enterpriseId相匹配的数据
                    msg = "企业id错误";
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

/**
 * 审核企业的api
 * 1、设置code、msg、obj为初始值，
 * 2、判断请求是否为put
 * 3、获取传入的 enterpriseId 与 status
 * 4、判断 status 是否为 通过1或 不通过2，若值不正确则 msg 设为 "无法更改此状态";
 * 5、若status正确则从数据库中获取enterprise，判断是否取得，若未获取到  msg 设为 "企业id错误";
 * 6、若取得则判断现状态是否为待审核，若现状态不正确则 msg 设为 "无法更改此状态";
 * 7、若现状态正确则更改现状态为传入状态，并code 设为 "200"， msg 奢设为 "处理成功";
 * 8、将code与msg赋给obj
 * 9、返回json
 */