if(k.request.method == 'POST'){
    // 1、获取前端数据
    var stu_id = k.request.stu_id;
    var name = k.request.name;
    var gender = k.request.gender;
    var enterence_year = k.request.enterence_year;
    var major = k.request.major;
    var tel = k.request.tel;
    var introduction = k.request.intro;
    var email = k.request.email;
    var password = k.request.password;
    // 3、判断输入数据是否符合要求
    var msg = msg(stu_id, name, gender, enterence_year, major, tel, introduction, email, password);
    k.response.write(msg);
    if (msg == "注册成功") {
    // 4.1、更新数据进入数据库
        var table = k.database.getTable("student");
    // 4.1.1、拼装json对象
        var database_obj = {
            stu_id: stu_id, 
            name: name,
            gender: gender,
            enterence_year: enterence_year,
            major: major,
            tel: tel,
            introduction: introduction,
            email: email,
            password: password
        };
        var returnid = table.add(database_obj);
        var obj = {code:"200", msg:msg};
        k.response.json(obj);
    }
    else{
    //4.2、返回错误信息 
        var obj = {code:"100", msg:msg};
        k.response.json(obj);
    }
}
else{
    var obj = {code:"100",msg:"method not found"}
    k.response.json(obj);
}


function msg(stu_id, name, gender, enterence_year, major, tel, introduction, email, password){
    if(!stu_id){
        return "请输入学号";
    }
    if(!name){
        return "请输入姓名";
    }
    if(!gender){
        return "请输入性别";
    }
    if(!enterence_year){
        return "请输入入学年份";
    }
    if(!major){
        return "请输入专业";
    }
    if(!tel){
        return "请输入电话";
    }
    if(!introduction){
        return "请输入简介";
    }
    if(!email){
        return "请输入邮箱";
    }
    if(!password){
        return "请输入密码";
    }
    else{
        var table = k.database.getTable("student");
        var item = table.find("email",email);
        if(!item.password){
            return "注册成功";
        }
        else{
            return "该邮箱已被注册，请联系管理员";
        }
    }
}