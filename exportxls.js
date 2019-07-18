/*
	@param 应该需要要导出成绩的时间
    @return obj 返回学生成绩信息
    @description 通过查取学生信息表中每个学生，然后遍历查取每个学生的相关的实训成绩
    			 之后要改进，要对查询的数据进行限定，（根据之后的限定条件，选择先遍历学生表或者学生成绩表）
*/
var tab_stu = k.database.getTable("student");
var stulist = tab_stu.all();
var stuid;//学生学号
var stuname;//学生姓名
var expname; //实训topic
var mark; //实训分数
var redata = []; //查出的数据集合
var reobj = {
    code: 200,
    msg: "success",
}
for (let i = 0; i < stulist.length; i++) { //获得学号姓名
    var dataitem = {}; //集合中每个元素
    stuid = stulist[i].stu_id;
    stuname = stulist[i].name;
    dataitem.stuid = stuid;
    dataitem.stuname = stuname;
    var tab_apply = k.database.getTable("stu_apply");
    //找出数据可能不止一条，要另外限定
    var stuapply = tab_apply.find("apply_status==4 && stu_id==" + stuid);
    var tab_internship = k.database.getTable("internship_detail");
    var internship = tab_internship.get(stuapply.exp_id);
    var expname = internship.topic;
    dataitem.expname = expname;
    //获取分数
    var tab_achievement = k.database.getTable("stu_achievement");
    var achievement = tab_achievement.get(stuapply._id);
    mark = achievement.mark;
    dataitem.mark = mark;
    redata.push(dataitem);
}
reobj.data = redata;
k.response.Json(reobj);