//��õ�ǰ��¼����ҵ��Ϣ
//��ѯ��ҵ��Ϣapi
var code = "100";
var msg = "����ʧ��";
var data = null;
var obj = {};
var back = k.session.get("key");
var enterpriseId = back.enterpriseId;
if (back) {
    if (enterpriseId) { //�жϵ�ǰ�û��Ƿ�Ϊ��ҵ
        if (k.request.method == "GET") { //�ж�GET����
            var enterprise = k.database.enterprise.get(enterpriseId);
            if (enterprise) {
                code = "200";
                msg = "����ɹ�";
                //delete enterprise['password'];
                data = enterprise;
            } else {
                code = "100";
                msg = "��ҵ������";
            }
        } else {
            code = "100";
            msg = "method not GET"
        }
    }
} else {
    msg = "��¼�ѹ��ڣ������µ�¼";
}
obj.code = code;
obj.msg = msg;
obj.data = data;
k.response.json(obj);