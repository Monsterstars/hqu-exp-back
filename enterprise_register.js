if(k.request.method == 'POST'){
    // 1、获取前端数据
	var type = k.request.type;
    var name = k.request.name;
    var address = k.request.address;
    var email = k.request.email;
    var contact_name = k.request.contact_name;
    var contact_tel = k.request.contact_tel;
    var qualificate_file = k.request.qualificate_file;
    var intro = k.request.intro;
    // 2、生成当前时间
    var time = new Date();
    // 3、判断输入数据是否符合要求
    var msg = msg(type, name, address, email, contact_name, contact_tel, qualificate_file, intro);
    if (msg == "注册成功") {
    // 4.1、添加数据进入数据库
        var table = k.database.getTable("enterprise");
    // 4.1.1、拼装json对象
        var database_obj = {
            type: type, 
            name: name,
            address: address,
            email: email,
            contact_name: contact_name,
            contact_tel: contact_tel,
            qualificate_file: qualificate_file,
            intro: intro,
            register_time: time,
            status: 0,
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


function msg(type, name, address, email, contact_name, contact_tel, qualificate_file, intro){
	if(!type){
    	return "请选择类型";
    }
    if(!name){
    	return "请输入名称";
    }
    if(!address){
    	return "请输入地址";
    }
    if(!email){
    	return "请输入邮箱";
    }
    if(!contact_name){
    	return "请输入联系人姓名";
    }
    if(!contact_tel){
    	return "请输入联系人电话";
    }
    if(!qualificate_file){
    	return "请上传资质文件";
    }
    if(!intro){
    	return "请输入简介";
    }
    else{
    	return "注册成功";
    }
}