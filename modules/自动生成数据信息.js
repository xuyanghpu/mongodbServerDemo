var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/radioDB";



function dateFtt(date, fmt) { //author: meizz
    var o = {
        "M+" : date.getMonth() + 1, //月份
        "d+" : date.getDate(), //日
        "h+" : date.getHours(), //小时
        "m+" : date.getMinutes(), //分
        "s+" : date.getSeconds(), //秒
        "q+" : Math.floor((date.getMonth() + 3) / 3), //季度
        "S" : date.getMilliseconds()//毫秒
    };
    if (arguments.length == 1) {
        fmt = 'yyyy-MM-dd hh:mm:ss';
    }
    if (/(y+)/.test(fmt)){
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for ( var k in o){
        if (new RegExp("(" + k + ")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]): (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

function  getrandom() {
    var d = new Date();
d.toISOString()
    d.setYear(Math.floor(Math.random()*100) +2000);
    d.setMonth(Math.floor(Math.random()*10) + 1);
    d.setDate(Math.floor(Math.random()*27) +1);
    d.setHours(Math.floor(Math.random()*23) + 1,Math.floor(Math.random()*28) + 1,Math.floor(Math.random()*58) + 1,Math.floor(Math.random()*999));
    return d;
}


//1、故障状态
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("radioDB");
    {
        for (var i =0;i < 1000;i++)
        {
            var myobj = {
                address: 242001 + Math.floor(Math.random()*20),
                time: getrandom(),
                data:{
                    "msg":"report",
                    "type":"fault_state",
                    "addr":241003 +  Math.floor(Math.random()*24),
                    "args":{
                        "flag":(Math.floor(Math.random()*2)==1)?true:false,
                        "code":[225+ Math.floor(Math.random()*10),226 + Math.floor(Math.random()*9)]
                    }
                }
            };

            dbo.collection("infos").insertOne(myobj, function(err, res) {
                if (err) throw err;
            });
        }
    }
    console.log("1故障状态-文档插入成功");
    db.close();

});


//2、接管状态
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("radioDB");
    for (var i =0;i < 1000;i++)
    {
        var myobj = {
            address: 242001 + Math.floor(Math.random()*20),
            time: getrandom(),
            data: {
                "msg":"report",
                "type":"radio_ctr_state",
                "addr":241003 +  Math.floor(Math.random()*24),
                "args":{
                    "flag":(Math.floor(Math.random()*2)==1)?true:false
                }
            }
        }

        dbo.collection("infos").insertOne(myobj, function(err, res) {
            if (err) throw err;
        });
    }
    console.log("2接管状态-文档插入成功");
    db.close();
});
//3、开机状态
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("radioDB");

    for (var i =0;i < 1000;i++)
    {
        var myobj = {
            address: 242001 + Math.floor(Math.random()*20),
            time: getrandom(),
            data: {
                "msg":"report",
                "type":"power_state",
                "addr":241003 +  Math.floor(Math.random()*24),
                "args":{
                    "state":(Math.floor(Math.random()*2)==1)?"open":"close"
                }
            }
        }

        dbo.collection("infos").insertOne(myobj, function(err, res) {
            if (err) throw err;
        });
    }
    console.log("3开机状态-文档插入成功");
    db.close();
});

//4、探测状态
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("radioDB");
    for (var i =0;i < 1000;i++)
    {
        var myobj = {
            address: 242001 + Math.floor(Math.random()*20),
            time: getrandom(),
            data: {
                "msg":"report",
                "type":"detect_state",
                "addr":241003 +  Math.floor(Math.random()*24),
                "args":{
                    "state":(Math.floor(Math.random()*2)==1)?"active":"passive",
                    "rmtaddr":241002 +  Math.floor(Math.random()*24)
                }
            }
        }

        dbo.collection("infos").insertOne(myobj, function(err, res) {
            if (err) throw err;
        });
    }

    console.log("4探测状态-文档插入成功");
    db.close();
});

//5、建联状态
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("radioDB");
    for (var i =0;i < 1000;i++)
    {
        var myobj = {
            address: 242001 + Math.floor(Math.random()*20),
            time: getrandom(),
            data: {
                "msg":"report",
                "type":"link_state",
                "addr":241003 +  Math.floor(Math.random()*24),
                "args":{
                    "state":(Math.floor(Math.random()*2)==1)?"active":"passive",
                    "rmtaddr":241002 +  Math.floor(Math.random()*24)
                }
            }
        }

        dbo.collection("infos").insertOne(myobj, function(err, res) {
            if (err) throw err;
        });
    }
    console.log("5建联状态-文档插入成功");
    db.close();
});

//6、扫描状态
// {
// 	"msg":"report",
// 	"type":"free_state",
// 	"addr":241003,
// 	"args":{
// 		"power":45.5
// 	}
// }
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("radioDB");
    for (var i =0;i < 1000;i++)
    {
        var myobj = {
            address: 242001 + Math.floor(Math.random()*20),
            time: getrandom(),
            data: {
                "msg":"report",
                "type":"free_state",
                "addr":241003 +  Math.floor(Math.random()*24),
                "args":{
                    "power":45.5 + Math.floor(Math.random()*100)
                }
            }
        }

        dbo.collection("infos").insertOne(myobj, function(err, res) {
            if (err) throw err;
        });
    }
    console.log("6建联状态-文档插入成功");
    db.close();
});

//7、上报本地电台位置信息
// {
// 	"msg":"report",
// 	"type":"local_position",
// 	"addr": 241003,
// 	"args":{
// 		"flag":true/false,
// 		"longitude":120.3545,
// 		"latitude":34.5756,
// 		"height":2908
// 	}
// }

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("radioDB");
    for (var i =0;i < 1000;i++)
    {
        var myobj = {
            address: 242001 + Math.floor(Math.random()*20),
            time: getrandom(),
            data: {
                "msg":"report",
                "type":"local_position",
                "addr":241003 +  Math.floor(Math.random()*24),
                "args":{
                    "flag":(Math.floor(Math.random()*1)==1)?true:false,
                    "longitude":Math.floor(Math.random()*10) + 120.3545,
                    "latitude":Math.floor(Math.random()*10) + 34.5756,
                    "height":2908 + Math.floor(Math.random()*100)
                }
            }
        }

        dbo.collection("infos").insertOne(myobj, function(err, res) {
            if (err) throw err;
        });
    }
    console.log("7上报本地电台位置信息-文档插入成功");
    db.close();
});

// 8、上报本地电台与目标电台综合位置信息
// {
// 	"msg":"report",
// 	"type":"target_and_local_position",
// 	"addr":243008,
// 	"args":{
// 		"flag":true/false,
// 		"longitude":120.35,
// 		"latitude":34.57,
// 		"height":2908,
// 		"rmt_longitude":120.3512,
// 		"rmt_latitude":34.5712,
// 		"rmt_height":2908,
// 		"distance":345.45,
// 		"rmtaddr":245003
// 	}
// }

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("radioDB");

    for (var i =0;i < 2000;i++)
    {
        var myobj = {
            address: 242001 + Math.floor(Math.random()*20),
            time: getrandom(),
            data: {
                "msg":"report",
                "type":"target_and_local_position",
                "addr":241008 +  Math.floor(Math.random()*24),
                "args":{
                    "flag":(Math.floor(Math.random()*1)==1)?true:false,
                    "longitude":Math.floor(Math.random()*10) + 120.3545,
                    "latitude":Math.floor(Math.random()*10) + 34.5756,
                    "height":2908 + Math.floor(Math.random()*100),

                    "rmt_longitude":120.3512 + Math.floor(Math.random()*10),
                    "rmt_latitude":34.5712 + Math.floor(Math.random()*10),
                    "rmt_height":2908 + Math.floor(Math.random()*10),
                    "distance":345.45 + Math.floor(Math.random()*10),
                    "rmtaddr":245003 + Math.floor(Math.random()*10)
                }
            }
        }

        dbo.collection("infos").insertOne(myobj, function(err, res) {
            if (err) throw err;
        });
    }
    console.log("8上报本地电台与目标电台综合位置信息-文档插入成功");
    db.close();
});

// 9、上报远端电台呼入
// {
// 	"msg":"report",
// 	"type":"rmt_call_in",
// 	"addr":242001,
// 	"args":{
// 		"rmt_addr":242002
// 	}
// }

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("radioDB");

    for (var i =0;i < 1000;i++)
    {
        var myobj = {
            address: 242001 + Math.floor(Math.random()*20),
            time: getrandom(),
            data: {
                "msg":"report",
                "type":"rmt_call_in",
                "addr":241001 +  Math.floor(Math.random()*24),
                "args":{
                    "rmt_addr":241001 +  Math.floor(Math.random()*24)
                }
            }
        }

        dbo.collection("infos").insertOne(myobj, function(err, res) {
            if (err) throw err;
        });
    }
    console.log("9上报远端电台呼入-文档插入成功");
    db.close();
});


// 10、上报短报文发送结果
// {
// 	"msg":"report",
// 	"type":"send_msg_flag",
// 	"addr":242001,
// 	"args":{
// 		"flag":true/false,
// 		"rmtaddr":234821,
// 		"sn":""
// 	}
// }
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("radioDB");
    for (var i =0;i < 1000;i++)
    {
        var myobj = {
            address: 242001 + Math.floor(Math.random()*20),
            time: getrandom(),
            data: {
                "msg":"report",
                "type":"send_msg_flag",
                "addr":241001 +  Math.floor(Math.random()*24),
                "args":{
                    "flag":(Math.floor(Math.random()*2)==1)?true:false,
                    "rmt_addr":241001 +  Math.floor(Math.random()*24),
                    "sn":"123"
                }
            }
        }

        dbo.collection("infos").insertOne(myobj, function(err, res) {
            if (err) throw err;
        });
    }
    console.log("10上报短报文发送结果-文档插入成功");
    db.close();
});

// 11、网关向服务器上传接收到的短报文内容及电台信息
// {
// 	"msg":"report",
// 	"type":"recv_msg_content",
// 	"addr":242001,
// 	"args":{
// 		"content": ,
// 		"rmtaddr":234821
// 	}
// }
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("radioDB");

    for (var i =0;i < 1000;i++)
    {
        var myobj = {
            address: 242001 + Math.floor(Math.random()*20),
            time: getrandom(),
            data: {
                "msg":"report",
                "type":"recv_msg_content",
                "addr":241001 +  Math.floor(Math.random()*24),
                "args":{
                    "content":"XXXXX",
                    "rmt_addr":241001 +  Math.floor(Math.random()*24)
                }
            }
        }

        dbo.collection("infos").insertOne(myobj, function(err, res) {
            if (err) throw err;
        });
    }
    console.log("11网关向服务器上传接收到的短报文内容及电台信息-文档插入成功");
    db.close();
});
// 12、网关向服务器上报结束探测
// {
// 	"msg":"report",
// 	"type":"stop_detect",
// 	"addr":242001,
// 	"args":{
// 		"rmtaddr":234821
// 	}
// }

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("radioDB");
    for (var i =0;i < 1000;i++)
    {
        var myobj = {
            address: 242001 + Math.floor(Math.random()*20),
            time: getrandom(),
            data: {
                "msg":"report",
                "type":"stop_detect",
                "addr":241001 +  Math.floor(Math.random()*24),
                "args":{
                    "rmt_addr":241001 +  Math.floor(Math.random()*24)
                }
            }
        }

        dbo.collection("infos").insertOne(myobj, function(err, res) {
            if (err) throw err;
        });
    }
    console.log("12网关向服务器上报结束探测-文档插入成功");
    db.close();
});

// 13、网关向服务器上报本地电台环境温度、湿度
// {
// 	"msg":"report",
// 	"type":"environment_state",
// 	"addr":242001,
// 	"args":{
// 		"temperature":37,
// 		"humidity":32,
// 	}
// }

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("radioDB");
    for (var i =0;i < 1000;i++)
    {
        var myobj = {
            address: 242001 + Math.floor(Math.random()*20),
            time: getrandom(),
            data: {
                "msg":"report",
                "type":"environment_state",
                "addr":241001 +  Math.floor(Math.random()*24),
                "args":{
                    "temperature":37 +  Math.floor(Math.random()*20),
                    "humidity":32 +  Math.floor(Math.random()*20)
                }
            }
        }

        dbo.collection("infos").insertOne(myobj, function(err, res) {
            if (err) throw err;
        });
    }
    console.log("13网关向服务器上报本地电台环境温度-文档插入成功");
    db.close();
});

// 14、网关向服务器上报其配置参数
// {
// 	"msg":"report",
// 	"type":"gw_config_ctl",
// 	"addr":242001,
// 	"args":{
// 		"vox_in":1,
// 		"vox_out":1,
// 		"denoise":1,
// 		"gain_out":1
// 	}
// }

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("radioDB");
    for (var i =0;i < 1000;i++)
    {
        var myobj = {
            address: 242001 + Math.floor(Math.random()*20),
            time: getrandom(),
            data: {
                "msg":"report",
                "type":"gw_config_ctl",
                "addr":241001 +  Math.floor(Math.random()*24),
                "args":{
                    "vox_in":Math.floor(Math.random()*7),
                    "vox_out":Math.floor(Math.random()*7),
                    "denoise":Math.floor(Math.random()*7),
                    "gain_out":Math.floor(Math.random()*7)
                }
            }
        }

        dbo.collection("infos").insertOne(myobj, function(err, res) {
            if (err) throw err;
        });
    }
    console.log("14网关向服务器上报其配置参数-文档插入成功");
    db.close();
});

// 15、网关向服务器请求注册信息
// {
// 	"msg":"request",
// 	"type":"register_info",
// 	"addr":242001
// 	"args":{
// 	}
// }

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("radioDB");
    for (var i =0;i < 1000;i++)
    {
        var myobj = {
            address: 242001 + Math.floor(Math.random()*20),
            time: getrandom(),
            data: {
                "msg":"request",
                "type":"register_info",
                "addr":241001 +  Math.floor(Math.random()*24),
                "args":{}
            }
        }

        dbo.collection("infos").insertOne(myobj, function(err, res) {
            if (err) throw err;
        });
    }
    console.log("15网关向服务器请求注册信息-文档插入成功");
    db.close();
});

// 16、服务器向网关请求开关机
// {
// 	"msg":"request",
// 	"type":"radio_power_ctl",
// 	"addr":242001,
// 	"args":{
// 		"state":"open"/"close"
// 	}
// }


MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("radioDB");
    for (var i =0;i < 1000;i++)
    {
        var myobj = {
            address: 242001 + Math.floor(Math.random()*20),
            time: getrandom(),
            data: {
                "msg":"request",
                "type":"radio_power_ctl",
                "addr":241001 +  Math.floor(Math.random()*24),
                "args":{
                    "state":(Math.floor(Math.random()*2)==1)?"open":"close"
                }
            }
        }

        dbo.collection("infos").insertOne(myobj, function(err, res) {
            if (err) throw err;
        });
    }
    console.log("16服务器向网关请求开关机-文档插入成功");
    db.close();
});
// 17、服务器向网关请求开始探测
// {
// 	"msg":"request",
// 	"type":"start_detect_ctl",
// 	"addr":242001,
// 	"args":{
// 		"rmtaddr":234821
// 	}
// }
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("radioDB");
    for (var i =0;i < 1000;i++)
    {
        var myobj = {
            address: 242001 + Math.floor(Math.random()*20),
            time: getrandom(),
            data: {
                "msg":"request",
                "type":"start_detect_ctl",
                "addr":241001 +  Math.floor(Math.random()*24),
                "args":{
                    "rmtaddr":241001 + Math.floor(Math.random()*20)
                }
            }
        }

        dbo.collection("infos").insertOne(myobj, function(err, res) {
            if (err) throw err;
        });
    }
    console.log("17服务器向网关请求开始探测-文档插入成功");
    db.close();
});

// 18、服务器向网关请求结束探测
// {
// 	"msg":"request",
// 	"type":"stop_detect_ctl",
// 	"addr":242001,
// 	"args":{
// 		"rmtaddr":234821
// 	}
// }

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("radioDB");
    for (var i =0;i < 1000;i++)
    {
        var myobj = {
            address: 242001 + Math.floor(Math.random()*20),
            time: getrandom(),
            data: {
                "msg":"request",
                "type":"stop_detect_ctl",
                "addr":241001 +  Math.floor(Math.random()*24),
                "args":{
                    "rmtaddr":241001 + Math.floor(Math.random()*20)
                }
            }
        }

        dbo.collection("infos").insertOne(myobj, function(err, res) {
            if (err) throw err;

        });
    }

    console.log("18服务器向网关请求结束探测-文档插入成功");
    db.close();
});
// 19、服务器向网关请求开始追踪
// {
// 	"msg":"request",
// 	"type":"start_track_ctl",
// 	"addr":242001,
// 	"args":{
// 		"rmtaddr":234821
// 	}
// }
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("radioDB");
    for (var i =0;i < 1000;i++)
    {
        var myobj = {
            address: 242001 + Math.floor(Math.random()*20),
            time: getrandom(),
            data: {
                "msg":"request",
                "type":"start_track_ctl",
                "addr":241001 +  Math.floor(Math.random()*24),
                "args":{
                    "rmtaddr":241001 + Math.floor(Math.random()*20)
                }
            }
        }

        dbo.collection("infos").insertOne(myobj, function(err, res) {
            if (err) throw err;

        });
    }

    console.log("19服务器向网关请求开始追踪-文档插入成功");
    db.close();
});
// 20、服务器向网关请求结束追踪
// {
// 	"msg":"request",
// 	"type":"stop_track_ctl",
// 	"addr":242001,
// 	"args":{
// 		"rmtaddr":234821
// 	}
// }

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("radioDB");
    for (var i =0;i < 1000;i++)
    {
        var myobj = {
            address: 242001 + Math.floor(Math.random()*20),
            time: getrandom(),
            data: {
                "msg":"request",
                "type":"stop_track_ctl",
                "addr":241001 +  Math.floor(Math.random()*24),
                "args":{
                    "rmtaddr":241001 + Math.floor(Math.random()*20)
                }
            }
        }

        dbo.collection("infos").insertOne(myobj, function(err, res) {
            if (err) throw err;

        });
    }

    console.log("20服务器向网关请求结束追踪-文档插入成功");
    db.close();
});
// 21、服务器向网关下发短报文
// {
// 	"msg":"request",
// 	"type":"sent_msg_ctl",
// 	"addr":242001,
// 	"args":{
// 		"content": ,
// 		"rmtaddr":234821,
// 		"sn":""
// 	}
// }
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("radioDB");
    for (var i =0;i < 1000;i++)
    {
        var myobj = {
            address: 242001 + Math.floor(Math.random()*20),
            time: getrandom(),
            data: {
                "msg":"request",
                "type":"sent_msg_ctl",
                "addr":241001 +  Math.floor(Math.random()*24),
                "args":{
                    "content": "XXXX",
                    "rmtaddr":241001 + Math.floor(Math.random()*20),
                    "sn":"123"
                }
            }
        }

        dbo.collection("infos").insertOne(myobj, function(err, res) {
            if (err) throw err;

        });
    }

    console.log("21服务器向网关下发短报文-文档插入成功");
    db.close();
});

// 22、服务器向网关下发设置网关参数指令
// {
// 	"msg":"request",
// 	"type":"gw_config_ctl",
// 	"addr":242001,
// 	"args":{
// 		"vox_in":1,
// 		"vox_out":1,
// 		"denoise":1,
// 		"gain_out":1
// 	}
// }

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("radioDB");
    for (var i =0;i < 1000;i++)
    {
        var myobj = {
            address: 242001 + Math.floor(Math.random()*20),
            time: getrandom(),
            data: {
                "msg":"request",
                "type":"gw_config_ctl",
                "addr":241001 +  Math.floor(Math.random()*24),
                "args":{
                    "vox_in":Math.floor(Math.random()*7),
                    "vox_out":Math.floor(Math.random()*7),
                    "denoise":Math.floor(Math.random()*7),
                    "gain_out":Math.floor(Math.random()*7)
                }
            }
        }

        dbo.collection("infos").insertOne(myobj, function(err, res) {
            if (err) throw err;

        });
    }

    console.log("22服务器向网关下发设置网关参数指令-文档插入成功");
    db.close();
});
// 23、服务器向网关请求呼叫目标台
// {
// 	"msg":"request",
// 	"type":"call_out",
// 	"addr":242001,
// 	"args":{
// 		"mode":"normal"/"advance",
// 		"rmtaddr":234821
// 	}
// }

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("radioDB");
    for (var i =0;i < 1000;i++)
    {
        var myobj = {
            address: 242001 + Math.floor(Math.random()*20),
            time: getrandom(),
            data: {
                "msg":"request",
                "type":"call_out",
                "addr":241001 +  Math.floor(Math.random()*24),
                "args":{
                    "mode":(Math.floor(Math.random()*2)==1)?"normal":"advance",
                    "rmt_addr":241001 +  Math.floor(Math.random()*24)
                }
            }
        }

        dbo.collection("infos").insertOne(myobj, function(err, res) {
            if (err) throw err;

        });
    }

    console.log("23服务器向网关请求呼叫目标台-文档插入成功");
    db.close();
});

// 24、网关回复resquest的部分ACK
// {
// 	"msg":"reponse",
// 	"type":"ack",
// 	"addr":242001,
// 	"args":{
// 		"ack_type":"register_info"/...,
// 		"flag":true/false
// 	}
// }
// 说明："ack_type"区分request:
// 		register_info：		注册信息请求；
// 		radio_power_ctl：	电台开关机控制请求
// 		start_detect_ctl：	开始探测请求
// 		stop_detect_ctl：	结束探测请求
// 		start_track_ctl：	开始追踪请求
// 		stop_track_ctl：	结束追踪请求
// 		gw_config_ctl：		下发网关配置请求
//
// 25、探测时信道质量信息
// {
// 	"msg":"report",
// 	"type":"detect_channel_snr",
// 	"addr":242001,
// 	"args":{
// 		"fre":23.9898,
// 		"snr":
// 		{
// 			"result":3,
// 			"tx":21,
// 			"rx":13
// 		},
// 		"rmtaddr":234821
// 	}
// }

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("radioDB");
    for (var i =0;i < 2000;i++)
    {
        var myobj = {
            address: 242001 + Math.floor(Math.random()*20),
            time: getrandom(),
            data: {
                "msg":"report",
                "type":"detect_channel_snr",
                "addr":241001 +  Math.floor(Math.random()*24),
                "args":{
                        "fre":23.9898 + Math.floor(Math.random()*24),
                        "snr":
                        {
                            "result":Math.floor(Math.random()*5),
                            "tx":Math.floor(Math.random()*21),
                            "rx":Math.floor(Math.random()*21)
                        },
                        "rmtaddr":234821 + Math.floor(Math.random()*20)
                    }
            }
        }

        dbo.collection("infos").insertOne(myobj, function(err, res) {
            if (err) throw err;

        });
    }

    console.log("25探测时信道质量信息-文档插入成功");
    db.close();
});

//
// 26、建联成功时信道质量信息与模式信息
// {
// 	"msg":"report",
// 	"type":"connect_ok_channel_snr",
// 	"addr":242001,
// 	"args":{
// 		"state":"active"/"passive",
// 		"mode":"normal"/"advance",
// 		"rx_fre":23.9898,
// 		"tx_fre":24.9898,
// 		"snr":
// 		{
// 			"result":3,
// 			"tx":21,
// 			"rx":12
// 		},
// 		"rmtaddr":234821
// 	}
// }

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("radioDB");
    for (var i =0;i < 2000;i++)
    {
        var myobj = {
            address: 242001 + Math.floor(Math.random()*20),
            time: getrandom(),
            data: {
                "msg":"report",
                "type":"connect_ok_channel_snr",
                "addr":241001 +  Math.floor(Math.random()*24),
                "args":{
                    "state":(Math.floor(Math.random()*2)==1)?"active":"passive",
                    "mode":(Math.floor(Math.random()*2)==1)?"normal":"advance",
                    "rx_fre":23.9898 + Math.floor(Math.random()*24),
                    "tx_fre":24.9898 + Math.floor(Math.random()*24),
                    "fre":23.9898 + Math.floor(Math.random()*24),
                    "snr":
                        {
                            "result":Math.floor(Math.random()*5),
                            "tx":Math.floor(Math.random()*21),
                            "rx":Math.floor(Math.random()*21)
                        },
                    "rmtaddr":234821 + Math.floor(Math.random()*20)
                }
            }
        }

        dbo.collection("infos").insertOne(myobj, function(err, res) {
            if (err) throw err;

        });
    }

    console.log("26建联成功时信道质量信息与模式信息-文档插入成功");
    db.close();
});

// 27、服务器向网关下发发送短报文请求的回复
// {
// 	"msg":"reponse",
// 	"type":"ack_sent_msg_ctl",
// 	"addr":242001,
// 	"args":{
// 		"flag":true/false
// 		"sn":""
// 	}
// }

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("radioDB");
    for (var i =0;i < 1000;i++)
    {
        var myobj = {
            address: 242001 + Math.floor(Math.random()*20),
            time: getrandom(),
            data: {
                "msg":"reponse",
                "type":"ack_sent_msg_ctl",
                "addr":241001 +  Math.floor(Math.random()*24),
                "args":{
                    "state":(Math.floor(Math.random()*2)==1)?true:false,
                    "sn":"123"
                }
            }
        }

        dbo.collection("infos").insertOne(myobj, function(err, res) {
            if (err) throw err;

        });
    }

    console.log("27服务器向网关下发发送短报文请求的回复-文档插入成功");
    db.close();
});

// 28、服务器向网关下发呼叫目标电台请求的回复
// {
// 	"msg":"reponse",
// 	"type":"ack_call_out",
// 	"addr":242001,
// 	"args":{
// 		"flag":true/false,
// 		"rmtaddr":234821
// 	}
// }

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("radioDB");
    for (var i =0;i < 1000;i++)
    {
        var myobj = {
            address: 242001 + Math.floor(Math.random()*20),
            time: getrandom(),
            data: {
                "msg":"reponse",
                "type":"ack_call_out",
                "addr":241001 +  Math.floor(Math.random()*24),
                "args":{
                    "flag":(Math.floor(Math.random()*2)==1)?true:false,
                    "rmtaddr":234821+ Math.floor(Math.random()*20)
                }
            }
        }

        dbo.collection("infos").insertOne(myobj, function(err, res) {
            if (err) throw err;

        });
    }

    console.log("28服务器向网关下发呼叫目标电台请求的回复-文档插入成功");
    db.close();
});

// 29、服务器向网关回复注册信息
// {
// 	"msg":"reponse",
// 	"type":"gateway_id",
// 	"addr":242001,
// 	"args":{
// 		"sip_id":1000001,
// 		"sip_password":,1000001
// 		"cc_num":1100
// 		"data_time":"2019-06-14,11:03:12"
// 	}
// }

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("radioDB");
    for (var i =0;i < 1000;i++)
    {
        var myobj = {
            address: 242001 + Math.floor(Math.random()*20),
            time: getrandom(),
            data: {
                "msg":"reponse",
                "type":"gateway_id",
                "addr":241001 +  Math.floor(Math.random()*24),
                "args":{
                    "sip_id":1000001,
                    "sip_password":1000001,
                    "cc_num":1100,
                    "data_time":getrandom()
                }
            }
        }

        dbo.collection("infos").insertOne(myobj, function(err, res) {
            if (err) throw err;

        });
    }

    console.log("29服务器向网关回复注册信息-文档插入成功");
    db.close();
});