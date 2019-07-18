/**
 * 管理员的登录的api
 * 1、设置code为100，msg为“登录失败”
 * 2、判断请求类型
 * 3、获取传入的email，判断是否为空，若为空则将msg设为"未输入邮箱账号"
 * 4、若email不为空则获取传入的password，判断是否为空，若为空则将msg设为"未输入密码"
 * 5、若password不为空则在数据库中查询获取admin，判断是否取得，若未获取到则将msg设为"用户不存在"
 * 6、若查获取到admin则验证密码时候匹配，若不匹配则 msg 设为"密码错误";
 * 7、若密码匹配则 code 设为 "200"，msg 设为 "登录成功";
 * 8、将code、msg赋值给obj
 * 9、返回json
 */

var code = "100";
var msg = "登陆失败";
var obj = {};
if (k.request.method == 'POST') { 
    //判断是否为post请求    
    var email = k.request.email;
    if (email) {
        //若用户名不为空       
        var password = k.request.password;
        if (password) {
            //若密码不为空            
            var adminTable = k.database.getTable("admin");
            var admin = adminTable.find("email", email);
            if (admin) {
                //若用户存在
                if (password == admin.password) {
                    //若密码匹配        
                    code = "200";
                    msg = "登录成功";
                    var sess = {
                         adminId: admin.__id
                     };
                     k.session.set("key", sess);
                } else {
                    //密码不匹配                   
                    msg = "用户邮箱或密码错误";
                }
            } else {
                //用户不存在               
                msg = "用户邮箱或密码错误";
            }
        } else {
            //未输入密码           
            msg = "未输入密码";
        }
    } else {
        //未输入邮箱       
        msg = "未输入邮箱账号";
    }
}
obj.code = code;
obj.msg = msg;
k.response.json(obj);