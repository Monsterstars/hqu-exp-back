if(k.request.method == 'GET'){
	var page = k.request.page;
	if(!page){
		// page = 1;
	}
	var back = k.session.get("key");
    var studentId = back.studentId;
    if(!studentId){
    	var obj = {code:"100", msg:"登陆已过期，请重新登陆"};
        k.response.json(obj);
    }
    else{
        var table = k.database.getTable("internship_detail");
        var internship_detail = table.all();
        var obj = {code:"200", msg:"查询成功",data:internship_detail};
        k.response.json(obj);
    }
}