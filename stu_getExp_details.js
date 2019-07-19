if(k.request.method == 'GET'){
	var expId = k.request.expId;
	var back = k.session.get("key");
    var studentId = back.studentId;
    if(!studentId){
    	var obj = {code:"100", msg:"登陆已过期，请重新登陆"};
        k.response.json(obj);
    }
    else{
        var table = k.database.getTable("internship_detail");
        var internship_detail = table.find("enterprise_id",expId);
        var obj = {code:"200", msg:"查询成功",data:internship_detail};
        k.response.json(obj);
    }
}
else{
    var obj = {code:"100",msg:"method not found"}
    k.response.json(obj);
}