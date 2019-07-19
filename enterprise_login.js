if(k.request.method == 'POST'){
    // 1、获取前端页面传入的账号密码
    var name = k.request.name;
    var password = k.request.password;
    // 2、查询账号对应密码
    var table = k.database.getTable("enterprise");
    var item = table.find("name",name);
    if(item.password == password){
        var obj = {code:"200", msg:"登陆成功"};
        var sessionObj = {enterpriseId: item._id};
        k.session.set("key", sessionObj);
        k.response.json(obj);
    }
    else{
        var obj = {code:"100", msg:"登录失败"};
        k.response.json(obj);
    }
}
else{
    var obj = {code:"100",msg:"method not found"}
    k.response.json(obj);
}