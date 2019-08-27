var express = require('express');
var router = express.Router();

var msyqldb = require('../modules/mysqlDB');
var db=new msyqldb('192.168.11.200','cust','123456789','3306','nodejs');
var mysqlConnection = db.getConnection();

router.get('/', function(req, res, next) {

    res.send('mysql数据库-数据接口');
});

//查询数据接口
router.get('/test', function(req, res, next) {

    console.log(req.query);
    db.excuteQuery("select * from person",mysqlConnection,function (data) {
        console.log(data);
        res.jsonp(data.data);
        res.end();
    })
});


//删除数据接口，传值方式/delete?pid =1
router.get('/delete', function(req, res, next) {

    console.log(req.query);
    var id = req.query.pid;
    db.excuteQuery("delete from person where name = '" + id + "';",mysqlConnection,function (data) {
        res.send("删除数据" + id + "成功");
    })
});

//修改数据接口 传值方式 /edit?name=2&age=3&pw=122345
router.get('/edit', function(req, res, next) {
    console.log(req.query);
    var url = "update person set age = '" + req.query.age + "',professional='"+req.query.pw+"' where name = '" + req.query.name + "';"
    db.excuteQuery(url,mysqlConnection,function (data) {
        console.log("更新成功");
        res.end();
    })
});

module.exports = router;
