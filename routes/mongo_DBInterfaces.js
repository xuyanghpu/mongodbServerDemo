var express = require('express');
var router = express.Router();

var mongodb = require('../modules/mongoDB');

router.get('/', function(req, res, next) {
    res.send('mongo数据库-数据接口');
});

//查询总数
//http://127.0.0.1:3000/mongo/count?address=242001
router.get('/count',function(req,res){
    var addr=req.query.address;
    var strwhere = {"address":parseInt(addr)};
    if (addr)
    {
        mongodb.count('infos',strwhere,function(err,data){
            res.jsonp(data);
            res.end();
        });
    }
    else
    {
        mongodb.count('infos',{},function(err,data){
            res.jsonp(data);
            res.end();
        });
    }
})

//查询总数
//http://127.0.0.1:3000/mongo/type_count?address=242001&type=fault_state
router.get('/type_count',function(req,res){
    var addr=req.query.address;
    var type=req.query.type;
    var strwhere = {
        "address":parseInt(addr),
        "data.type":type
    };
    mongodb.type_count('infos',strwhere,function(err,data){
        res.jsonp(data);
        res.end();
    });
})


//查询数据详细信息 获取全部数据
//http://127.0.0.1:3000/mongo/find?address=242001
router.get('/find',function(req,res){
    var addr=req.query.address;
    var json = {"address":parseInt(addr)};
    mongodb.find('infos',(json),function(err,data){
        res.jsonp(data);
        res.end();
    });
})

//http://127.0.0.1:3000/mongo/find?address=242001&type=fault_state
router.get('/type_find',function(req,res){
    var addr=req.query.address;
    var type=req.query.type;
    var strwhere = {
        "address":parseInt(addr),
        "data.type":type
    };
    mongodb.type_find('infos',strwhere,function(err,data){
        res.jsonp(data);
        res.end();
    });
})



//查询数据详细信息 分表
//http://127.0.0.1:3000/mongo/find_limit?address=242001&pagerows=500&page=1
router.get('/find_limit',function(req,res){
    var addr=req.query.address;
    var pagerows=req.query.pagerows;
    var page=req.query.page;

    var json = {
        "address":parseInt(addr),
        "pagerows":parseInt(pagerows),
        "page":parseInt(page)
    };
    mongodb.find_limit('infos',(json),function(err,data){
        res.jsonp(data);
        res.end();
    });
})


//添加数据信息
//http://127.0.0.1:3000/mongo/addname?address=xuya0
router.get('/addname',function(req,res){
    var addr=req.query.address;
    var json = {
        "name":addr
    };
    console.log(json);
    mongodb.insert("dsp",json,function (err,data) {
        res.jsonp(data);
        res.end();
    })
})

//查看数据库中所有地址指令总数统计情况
//http://127.0.0.1:3000/mongo/aggregate_group_by_address_count
// router.get('/aggregate_group_by_address_count',function(req,res){
//     var json = {
//                $group:{
//         _id:"$address",
//             namecount:{
//             $sum:1
//         }}};
//
//     mongodb.aggregate_group_by_address_count("infos",json,function (err,data) {
//         res.jsonp(data);
//         res.end();
//     })
// })
router.get('/aggregate_group_by_address_count',function(req,res){
    var json = {
        $group:{
            _id:"$address",
            namecount:{
                $sum:1
            }}};

    mongodb.aggregate_group_by_address_count("infos",json,function (err,data) {
        res.jsonp(data);
        res.end();
    })
})


//查看数据库中某个地址指令分类总数统计情况
//http://127.0.0.1:3000/mongo/aggregate_group_detailinfo_by_type?address=242001
router.get('/aggregate_group_detailinfo_by_type',function(req,res){

    var addr=req.query.address;
    console.log(addr);

    mongodb.aggregate_group_detailinfo_by_type("infos",addr,function (err,data) {
        res.jsonp(data);
        res.end();
    })
})


//查询某个电台的故障状态的信息 按照时间排序
//> db.infos.find({"data.type":"fault_state","address":242008,"data.args.flag":false},{"_id":0,"time":1,"data":1}).sort({"time":1});
//http://127.0.0.1:3000/mongo/find_fault_state_by_address?address=242001
router.get('/find_fault_state_by_address',function(req,res){

    var addr=req.query.address;
    console.log(addr);

    var json = {
        "data.type":"fault_state",
        "address":parseInt(addr),
        "data.args.flag":false
    }

    mongodb.find_fault_state_by_address("infos",json,function (err,data) {
        res.jsonp(data);
        res.end();
    })
})

//查询某个电台的开机状态的信息 按照时间排序
//> db.infos.find({"data.type":"power_state","address":242008,"data.args.state":"open"},{"_id":0,"time":1,"data":1}).sort({"time":1});
//http://127.0.0.1:3000/mongo/find_radio_state_open_by_address?address=242001
router.get('/find_radio_state_open_by_address',function(req,res){

    var addr=req.query.address;
    console.log(addr);

    var json = {
        "data.type":"power_state",
        "address":parseInt(addr),
        "data.args.state":"open"
    }

    mongodb.find_radio_state_open_by_address("infos",json,function (err,data) {
        res.jsonp(data);
        res.end();
    })
})

//查询某个电台的关机状态的信息 按照时间排序
//> db.infos.find({"data.type":"power_state","address":242008,"data.args.state":"close"},{"_id":0,"time":1,"data":1}).sort({"time":1});
//http://127.0.0.1:3000/mongo/find_radio_state_close_by_address?address=242001
router.get('/find_radio_state_close_by_address',function(req,res){

    var addr=req.query.address;
    console.log(addr);

    var json = {
        "data.type":"power_state",
        "address":parseInt(addr),
        "data.args.state":"close"
    }

    mongodb.find_radio_state_close_by_address("infos",json,function (err,data) {
        res.jsonp(data);
        res.end();
    })
})

//查询本地电台位置信息 按照时间排序
//> db.infos.find({"data.type":"local_position","address":242008,"data.args.flag":true},{"_id":0,"time":1,"data":1}).sort({"time":1});
//http://127.0.0.1:3000/mongo/find_local_position_by_address?address=242001
router.get('/find_local_position_by_address',function(req,res){

    var addr=req.query.address;
    console.log(addr);

    var json = {
        "data.type":"local_position",
        "address":parseInt(addr),
        "data.args.flag":false
    }

    mongodb.find_local_position_by_address("infos",json,function (err,data) {
        res.jsonp(data);
        res.end();
    })
})

//查询所有电台的本址信息
//http://127.0.0.1:3000/mongo/aggregate_find_all_address
router.get('/aggregate_find_all_address',function(req,res){
    mongodb.aggregate_find_all_address("infos",function (err,data) {
        res.jsonp(data);
        res.end();
    })
})

//查询最大时间和最小时间
//http://127.0.0.1:3000/mongo/aggregate_find_min_max_datetime
router.get('/aggregate_find_min_max_datetime',function(req,res){
    mongodb.aggregate_find_min_max_datetime("infos",function (err,data) {
        res.jsonp(data);
        res.end();
    })
})



module.exports = router;