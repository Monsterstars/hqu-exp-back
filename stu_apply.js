if(k.request.method == 'POST'){
	var stu_id = k.request.stu_id;
	var id = k.request.id;
	var status = k.request.status;
	var back = k.session.get("key");
    var studentId = back.studentId;
    if(!studentId || studentId != stu_id){
    	var obj = {code:"100", msg:"登陆已过期，请重新登陆"};
        k.response.json(obj);
    }
    var table = k.database.getTable("stu_apply");
    var obj = {stu_id: stu_id, id: id, apply_status: status};
    table.add(obj);  
    var obj = {code:"200", msg:"处理成功"};
    k.response.json(obj);
}
if(k.request.method == 'GET'){
	var back = k.session.get("key");
    var studentId = back.studentId;
    if(!studentId || studentId != stu_id){
    	var obj = {code:"100", msg:"登陆已过期，请重新登陆"};
        k.response.json(obj);
    }
    else{
        var table = k.database.getTable("stu_apply");
        var stu_apply = table.all();
        var obj = {code:"200", msg:"处理成功",data:stu_apply};
        k.response.json(obj);
    }
}