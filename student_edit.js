/**
 * gzk
 * 学生修改个人信息的api
 * 
 */
var code = '100';
var msg = '处理失败';
var obj = {};

if (k.request.method == 'POST') {
    // 判断请求是否为put
    var stu_id = k.request.stu_id;
    var studentTable = k.database.getTable("student");
    var student = studentTable.get(stu_id);
    if (student) {
        //判断student是否取得
        var major = k.request.major;
        var tel = k.request.tel;
        var introduction = k.request.intro;
        var exps = k.request.exps;
        if (major) {
            student.major = major;
        }
        if (tel) {
            student.tel = tel;
        }
        if (introduction) {
            student.introduction = introduction;
        }
        if (exps) {
            student.exps = exps;
        }
        studentTable.update(student);
        code = '200';
        msg = '处理成功';
    } else {
        msg = '未取得记录';
    }
}
obj.code = code;
obj.msg = msg;
k.response.json(obj);