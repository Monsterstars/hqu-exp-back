// sample code..
//var obj = {};
//obj.name = "myname";
//obj.fieldtwo = "value of field two";
//k.response.setHeader("Access-Control-Allow-Origin", "*");
//k.response.json(obj);
var obj = {};
code = "100";
msg = "处理失败";
data = null;
if (k.request.method == "GET") {
  var back = k.session.get("key");
  if (!back) {
    msg = "登陆过期，请重新登录";
  } else {
    var stuId = back.studentId;
    if (!stuId) {
      msg = "登陆过期，请重新登录";
    } else {
      var status = k.request.status;
      var page = k.request.page;
      if (!status) {
        //没有传入status
        var stuApply = k.database.stu_apply
          .query("stu_id ==" + stuId)
          .orderByDescending("apply_status")
          .skip((page - 1) * 10)
          .take(10);
      } else {
        var stuApply = k.database.stu_apply
          .query("stu_id ==" + stuId && "apply_status ==" + status)
          .orderByDescending("submit_time")
          .skip((page - 1) * 10)
          .take(10);
      }
      if (stuApply) {
        data = stuApply;
        code = "200";
        msg = "处理成功";
      } else {
        msg = "该学生没有申请记录";
      }
    }
  }
}
obj.code = code;
obj.msg = msg;
obj.data = data;
k.response.json(obj);