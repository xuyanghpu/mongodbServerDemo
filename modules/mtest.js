var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/radioDB';

//创建数据库
// MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
//     if (err) throw err;
//     console.log('数据库已创建');
//     var dbase = db.db("runoob0");
//     dbase.createCollection('site', function (err, res) {
//         if (err) throw err;
//         console.log("创建集合!");
//         db.close();
//     });
// });

//添加
// MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("runoob0");
//     var myobj = { name: "菜鸟教程", url: "www.runoob" };
//     dbo.collection("site").insertOne(myobj, function(err, res) {
//         if (err) throw err;
//         console.log("文档插入成功");
//         db.close();
//     });
// });

//查询
// MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
// //     if (err) throw err;
// //     var dbo = db.db("runoob");
// //     dbo.collection("site"). find({}).toArray(function(err, result) { // 返回集合中所有数据
// //         if (err) throw err;
// //         console.log(result);
// //         db.close();
// //     });
// // });

//查询
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("radioDB");
    var strwhere = {"address":242005};

    dbo.collection("infos").find(strwhere).count(function (err, result) {
        // 对返回值result做你想做的操作
        console.log(result);
        dbo.collection("infos").find(strwhere).limit(2).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
        });

        db.close();
    });
});