var id = k.request.id; 
 var obj = k.database.admin.get(id);
if (obj) {  k.response.json(obj); }; 