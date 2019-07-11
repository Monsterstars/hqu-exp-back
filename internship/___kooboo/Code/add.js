// sample code.. 
//var obj = {}; 
//obj.name = "myname"; 
//obj.fieldtwo = "value of field two"; 
//k.response.setHeader("Access-Control-Allow-Origin", "*"); 
//k.response.json(obj); 





    var obj = {
        password:"123456", 
        name: "111",
        college:"123",
        email:"123@qq.com"
    }; 
      
    var table = k.database.getTable("admin"); 
    table.add(obj); 
