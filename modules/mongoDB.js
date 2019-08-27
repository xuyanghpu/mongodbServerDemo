/**
 * Created by Administrator on 2017/8/18 0018.
 */
var MongoClient=require('mongodb').MongoClient;

var DbUrl='mongodb://localhost:27017/radioDB';  /*连接数据库*/

var ObjectID = require('mongodb').ObjectID;

function  __connectDb(callback){
    MongoClient.connect(DbUrl,{useNewUrlParser:true},function(err,db){

        if(err){
            console.log('数据库连接失败');
            return;
        }
        var dbo = db.db("radioDB");

        //增加 修改 删除
        callback(dbo);
    })
}

//暴露 ObjectID


exports.ObjectID=ObjectID;
//计算指定本址的数据总数
exports.count=function(collectionname,json,callback){

    __connectDb(function(db){
        var result=db.collection(collectionname).find(json).count(function(error,data){

            console.log("count：" + data);
            callback(error,data);/*拿到数据执行回调函数*/
        })

    })

}

exports.type_count=function(collectionname,json,callback){

    __connectDb(function(db){
        var result=db.collection(collectionname).find(json).count(function(error,data){

            console.log("count：" + data);
            callback(error,data);/*拿到数据执行回调函数*/
        })

    })

}

exports.aggregate_group_by_address_count = function(collectionname,json,callback){
    __connectDb(function(db) {
        console.log(json);
        var result = db.collection(collectionname).aggregate([json,{"$sort":{"_id":1}}]);
        result.toArray(function (err,data) {
            console.log("count：" + data);
            callback(err,data);/*拿到数据执行回调函数*/
        })
    })
}

exports.aggregate_group_detailinfo_by_type = function(collectionname,address,callback){
    __connectDb(function(db) {
        console.log(address);

        var result = db.collection(collectionname).aggregate([{"$match":{"address":parseInt(address)}},{"$group":{"_id":"$data.type","count":{"$sum":1}}},{"$sort":{"count":-1}}]);
        result.toArray(function (err,data) {
            console.log("count：" + data);
            callback(err,data);/*拿到数据执行回调函数*/
        })
    })
}

//获取所有电台的本址信息
exports.aggregate_find_all_address = function(collectionname,callback){
    __connectDb(function(db) {
        var result = db.collection(collectionname).aggregate([{"$group":{"_id":"$address","count":{"$sum":1}}},{"$sort":{"_id":1}}]);
        result.toArray(function (err,data) {
            callback(err,data);/*拿到数据执行回调函数*/
        })
    })
}

//查询最大时间和最小时间
exports.aggregate_find_min_max_datetime = function(collectionname,callback){
    __connectDb(function(db) {
        var result = db.collection(collectionname).aggregate([{"$group":{_id: "min_max_datetime",min_value:{"$min":"$time"},max_value:{"$max":"$time"}}}]);
        result.toArray(function (err,data) {
            callback(err,data);/*拿到数据执行回调函数*/
        })
    })
}


//数据库查找
exports.find=function(collectionname,json,callback){

    __connectDb(function(db){
        console.log(collectionname);
        console.log(json);
        var result=db.collection(collectionname).find(json).toArray(function(error,data){
            callback(error,data);/*拿到数据执行回调函数*/
        })

    })

}

exports.type_find=function(collectionname,json,callback){

    __connectDb(function(db){
        console.log(collectionname);
        console.log(json);
        var result=db.collection(collectionname).find(json).toArray(function(error,data){
            callback(error,data);/*拿到数据执行回调函数*/
        })
    })
}


//查询数据详细信息 分表
exports.find_limit=function(collectionname,json,callback){

    __connectDb(function(db){
        var strwhere = {
          "address":parseInt(json.address)
        };
       var result=db.collection(collectionname).find(strwhere).skip(parseInt(json.pagerows) * parseInt(json.page)).limit(parseInt(json.pagerows)).toArray(function(error,data){
            callback(error,data);/*拿到数据执行回调函数*/
        })
    })
}

//查询某个电台的故障状态的信息 按照时间排序
//> db.infos.find({"data.type":"fault_state","address":242008,"data.args.flag":false},{"_id":0,"time":1,"data":1}).sort({"time":1});
//http://127.0.0.1:3000/mongo/find_fault_state_by_address?address=242001
exports.find_fault_state_by_address=function(collectionname,json,callback){

    __connectDb(function(db){
        var strwhere = {
            "_id":0,
            "time":1,
            "data":1
        };
        var result=db.collection(collectionname).find(json,strwhere).sort({"time":1}).toArray(function(error,data){
            callback(error,data);/*拿到数据执行回调函数*/
        })
    })
}

//查询某个电台的开机状态的信息 按照时间排序
//> db.infos.find({"data.type":"power_state","address":242008,"data.args.state":"open"},{"_id":0,"time":1,"data":1}).sort({"time":1});
//http://127.0.0.1:3000/mongo/find_radio_state_close_by_address?address=242001
exports.find_radio_state_close_by_address=function(collectionname,json,callback){

    __connectDb(function(db){
        var strwhere = {
            "_id":0,
            "time":1,
            "data":1
        };
        var result=db.collection(collectionname).find(json,strwhere).sort({"time":1}).toArray(function(error,data){
            callback(error,data);/*拿到数据执行回调函数*/
        })
    })
}

//查询某个电台的关机状态的信息 按照时间排序
//> db.infos.find({"data.type":"power_state","address":242008,"data.args.state":"close"},{"_id":0,"time":1,"data":1}).sort({"time":1});
//http://127.0.0.1:3000/mongo/find_radio_state_open_by_address?address=242001
exports.find_radio_state_open_by_address=function(collectionname,json,callback){

    __connectDb(function(db){
        var strwhere = {
            "_id":0,
            "time":1,
            "data":1
        };
        var result=db.collection(collectionname).find(json,strwhere).sort({"time":1}).toArray(function(error,data){
            callback(error,data);/*拿到数据执行回调函数*/
        })
    })
}

//暂时用不上
//查询本地电台位置信息 按照时间排序
//> db.infos.find({"data.type":"local_position","address":242008,"data.args.flag":true},{"_id":0,"time":1,"data":1}).sort({"time":1});
//http://127.0.0.1:3000/mongo/find_local_position_by_address?address=242001
exports.find_local_position_by_address=function(collectionname,json,callback){

    __connectDb(function(db){
        var strwhere = {
            "_id":0,
            "time":1,
            "data":1
        };
        var result=db.collection(collectionname).find(json,strwhere).sort({"time":1}).toArray(function(error,data){
            callback(error,data);/*拿到数据执行回调函数*/
        })
    })
}


//增加数据
exports.insert=function(collectionname,json,callback){

    __connectDb(function(db){
        console.log(json);
        db.collection(collectionname).insertOne(json,function(error,data){
            callback(error,data);
        })
    })
}



//增加数据
exports.update=function(collectionname,json1,json2,callback){

    __connectDb(function(db){
        db.collection(collectionname).updateOne(json1,{$set:json2},function(error,data){

            callback(error,data);
        })
    })

}

//删除数据
exports.deleteOne=function(collectionname,json,callback){

    __connectDb(function(db){
        db.collection(collectionname).deleteOne(json,function(error,data){
            callback(error,data);
        })
    })

}
