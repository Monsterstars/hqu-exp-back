
if(k.request.method=='POST'){
    var exps = k.request.exps;
    //var expsarray = exps.split(",");
   // var works = k.request.works.split(",");
    var obj = {};
    obj.stu_id = k.request.stu_id;
    obj.name = k.request.name;
    obj.gender = k.request.gender;
    obj.enterence_year = k.request.enterence_year;
    obj.major = k.request.major;
    obj.tel = k.request.tel;
    obj.introduction = k.request.introduction;
    obj.email = k.request.email;
    obj.password = k.request.password;
   // obj.exps = expsarray;
   // obj.works = works;
   
   obj.exps = k.request.exps;
   obj.works = k.request.works;

    //k.response.write(expsarray);
    k.response.json(obj);
    if(obj){
       k.database.student.add(obj);
        k.response.write("1111");
    }
    
}




    /*var obj={
        stu_id: "1725121018",
        name: "prj",
        gender: 0,
        enterence_year: "2017",
        major: "土木",
        tel: "10000000000",
        introduction: "hahahahhahahahhahahahahahhaha",
        email: "1234568@163.com",
        password: "123456",
        exps: "[{https://www.baidu.com/img/bd_logo1.png?where=super},{https://www.baidu.com/img/bd_logo1.png?where=super}]",
        works: "[{https://www.baidu.com/img/bd_logo1.png?where=super},{https://www.baidu.com/img/bd_logo1.png?where=super}]"
      }*/
   // var id = k.database.student.add(obj);
