var mongoose = require('../server/mongo.js');
var model = require('../model/commonModel.js');

Date.prototype.format = function(fmt){
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "D+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "w+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(Y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//基础对象声明
var Page = model.Page;
var Project = model.Project;
var Comment = model.Comment;
var Alarm = model.Alarm;

//基础对象定义
module.exports.analog = new Object;
module.exports.digit = new Object;
module.exports.bar = new Object;
module.exports.info = new Object;
module.exports.comment = new Object;
module.exports.page = new Object;
module.exports.project = new Object;
module.exports.alarm = new Object;

/* analog */

//analog 单对象搜索
module.exports.analog.get = function (req, res) {
    console.log(req.query.analogId);
    Page.findOne({
        _id:req.params.id
    },
    function (err, page) {
        if (err) return console.log(err);  
             var analog = page.analogs.id(req.query.analogId);
             res.json(analog);
        });
}

//analog 单对象修改
module.exports.analog.put = function (req, res) {
    console.log(req.query.analogId);
    Page.findOne({
        _id:req.params.id
    },
    function (err, page) {
        if (err) return console.log(err);  
             var newAnalog = page.analogs.id(req.body.analogId);
             newAnalog.name = req.body.name;
             newAnalog.source = req.body.source;
             page.update(
                 {
                     $pull:{analogs:{_id:req.body.analogId}},
                 },
                function (err,analog) {
                    if (err) return console.log(err);
                    page.update(
                         {
                             $push:{analogs:newAnalog}
                         },
                        function (err,analog) {
                            if (err) return console.log(err)
                            res.json(analog);
                    });
            });
    });
}

//analog 对象搜索
module.exports.analog.getlist = function (req, res) {
    Page.findOne({
        _id:req.params.id
    },
    function (err, page) {
        if (err) return console.log(err);
            console.log(page);
        res.json(page.analogs);
    });
}

//analog 对象添加
module.exports.analog.post = function (req, res) {
     Page.findOne({
        _id:req.params.id
    },
    function (err, page) {
    if (err) return console.log(err);
         var child = {
             name:req.body.name,
             time:new Date().format("YYYY-MM-DD hh:mm:ss")
         };
         page.update(
             {
                 $push:{analogs:child}
             },
            function (err,analog) {
                if (err) return console.log(err)
                res.json(analog);
        });
    });
}

//analog 对象删除
module.exports.analog.delete = function (req, res) {
     Page.findOne({
        _id:req.params.id
    },
    function (err, page) {
    if (err) return console.log(err);
         console.log(req.body.analogId);
         var child = {
             _id:req.body.analogId,
         };
         page.update(
             {
                 $pull:{analogs:child}
             },
            function (err,analog) {
                if (err) return console.log(err)
                res.json(analog);
        });
    });
}

/* digit */
//digit 单对象修改
module.exports.digit.put = function (req, res) {
    console.log(req.query.digitId);
    Page.findOne({
        _id:req.params.id
    },
    function (err, page) {
        if (err) return console.log(err);  
             var newDigit = page.digits.id(req.body.digitId);
             console.log(req.body.source);
             newDigit.name = req.body.name;
             newDigit.source = req.body.source;
             newDigit.tInfo = req.body.tInfo;
             newDigit.fInfo = req.body.fInfo;
             newDigit.type = req.body.type;
             page.update(
                 {
                     $pull:{digits:{_id:req.body.digitId}},
                 },
                function (err,digit) {
                    if (err) return console.log(err);
                    page.update(
                         {
                             $push:{digits:newDigit}
                         },
                        function (err,digit) {
                            if (err) return console.log(err)
                            res.json(digit);
                    });
            });
        });
}

//digit 单对象搜索
module.exports.digit.get = function (req, res) {
    console.log(req.query.digitId);
    Page.findOne({
        _id:req.params.id
    },
    function (err, page) {
        if (err) return console.log(err);  
             var digit = page.digits.id(req.query.digitId);
             res.json(digit);
        });
}

//digit 对象搜索
module.exports.digit.getlist = function (req, res) {
    Page.findOne({
        _id:req.params.id
    },
    function (err, page) {
        if (err) return console.log(err);
            console.log(page);
        res.json(page.digits);
    });
}

//digit 对象添加
module.exports.digit.post = function (req, res) {
     Page.findOne({
        _id:req.params.id
    },
    function (err, page) {
    if (err) return console.log(err);
         var child = {
             name:req.body.name,
             time:new Date().format("YYYY-MM-DD hh:mm:ss")
         };
         page.update(
             {
                 $push:{digits:child}
             },
            function (err,digit) {
                if (err) return console.log(err)
                res.json(digit);
        });
    });
}

//digit 对象删除
module.exports.digit.delete = function (req, res) {
     Page.findOne({
        _id:req.params.id
    },
    function (err, page) {
    if (err) return console.log(err);
         console.log(req.body.digitId);
         var child = {
             _id:req.body.digitId
         };
         page.update(
             {
                 $pull:{digits:child}
             },
            function (err,digit) {
                if (err) return console.log(err)
                res.json(digit);
        });
    });
}

/* bar */
//bar 单对象修改
module.exports.bar.put = function (req, res) {
    Page.findOne({
        _id:req.params.id
    },
    function (err, page) {
        if (err) return console.log(err);  
             var newBar = page.bars.id(req.body.barId);
             console.log(req.body.source);
             newBar.name = req.body.name;
             newBar.source = req.body.source;
             newBar.max = req.body.max;
             newBar.color = req.body.color;
             page.update(
                 {
                     $pull:{bars:{_id:req.body.barId}},
                 },
                function (err,bar) {
                    if (err) return console.log(err);
                    page.update(
                         {
                             $push:{bars:newBar}
                         },
                        function (err,bar) {
                            if (err) return console.log(err)
                            res.json(bar);
                    });
            });
        });
}

//bar 单对象搜索
module.exports.bar.get = function (req, res) {
    console.log(req.query.barId);
    Page.findOne({
        _id:req.params.id
    },
    function (err, page) {
        if (err) return console.log(err);  
             var bar = page.bars.id(req.query.barId);
             res.json(bar);
        });
}

//bar 对象搜索
module.exports.bar.getlist = function (req, res) {
    Page.findOne({
        _id:req.params.id
    },
    function (err, page) {
        if (err) return console.log(err);
            console.log(page);
        res.json(page.bars);
    });
}

//bar 对象添加
module.exports.bar.post = function (req, res) {
     Page.findOne({
        _id:req.params.id
    },
    function (err, page) {
    if (err) return console.log(err);
         var child = {
             name:req.body.name,
             time:new Date().format("YYYY-MM-DD hh:mm:ss")
         };
         page.update(
             {
                 $push:{bars:child}
             },
            function (err,bar) {
                if (err) return console.log(err)
                res.json(bar);
        });
    });
}

//bar 对象删除
module.exports.bar.delete = function (req, res) {
     Page.findOne({
        _id:req.params.id
    },
    function (err, page) {
    if (err) return console.log(err);
         console.log(req.body.barId);
         var child = {
             _id:req.body.barId
         };
         page.update(
             {
                 $pull:{bars:child}
             },
            function (err,bar) {
                if (err) return console.log(err)
                res.json(bar);
        });
    });
}

/* info */
//info 单对象搜索
module.exports.info.get = function (req, res) {
    console.log(req.query.infoId);
    Page.findOne({
        _id:req.params.id
    },
    function (err, page) {
        if (err) return console.log(err);  
             var info = page.infos.id(req.query.infoId);
             res.json(info);
        });
}

//info 对象搜索
module.exports.info.getlist = function (req, res) {
    Page.findOne({
        _id:req.params.id
    },
    function (err, page) {
        if (err) return console.log(err);
            console.log(page);
        res.json(page.infos);
    });
}

//info 单对象修改
module.exports.info.put = function (req, res) {
    Page.findOne({
        _id:req.params.id
    },
    function (err, page) {
        if (err) return console.log(err);  
             var newInfo = page.infos.id(req.body.infoId);
             console.log(req.body.content);
             newInfo.name = req.body.name;
             newInfo.content = req.body.content;
             page.update(
                 {
                     $pull:{infos:{_id:req.body.infoId}},
                 },
                function (err,info) {
                    if (err) return console.log(err);
                    page.update(
                         {
                             $push:{infos:newInfo}
                         },
                        function (err,info) {
                            if (err) return console.log(err)
                            res.json(info);
                    });
            });
        });
}

//info 对象添加
module.exports.info.post = function (req, res) {
     Page.findOne({
        _id:req.params.id
    },
    function (err, page) {
    if (err) return console.log(err);
         var child = {
             name:req.body.name,
             time:new Date().format("YYYY-MM-DD hh:mm:ss")
         };
         page.update(
             {
                 $push:{infos:child}
             },
            function (err,info) {
                if (err) return console.log(err)
                res.json(info);
        });
    });
}

//info 对象删除
module.exports.info.delete = function (req, res) {
     Page.findOne({
        _id:req.params.id
    },
    function (err, page) {
    if (err) return console.log(err);
         console.log(req.body.infoId);
         var child = {
             _id:req.body.infoId
         };
         page.update(
             {
                 $pull:{infos:child}
             },
            function (err,info) {
                if (err) return console.log(err)
                res.json(info);
        });
    });
}

//comment 对象添加
module.exports.comment.post = function (req, res) {
    Comment.create({
        page:req.params.id,
        content:req.body.content,
        name:req.session.username,
        time:new Date().format("YYYY-MM-DD hh:mm:ss")
    },function (err, comment) {
        if (err) return console.log(err);
        res.json(comment);
    });
}

//comment 对象分页搜索
module.exports.comment.getlist = function (req, res) {
    Comment.find({page: req.params.id}).sort({time:-1}).skip(req.query.num).limit(5).exec(function(err,datas){  
        if (err) return console.log(err);
        res.json(datas);
    });
}

//alarm 对象分页搜索
module.exports.alarm.getlist = function (req, res) {
    Alarm.find({projectId: req.params.id}).sort({time:-1}).skip(req.query.num).limit(5).exec(function(err,datas){  
        if (err) return console.log(err);
        res.json(datas);
    });
}

/* page */
//page 根据ID找page对象
module.exports.page.get = function (req, res) {
    Page.find(
        {
            _id: req.params.id
        },
        function (err, result) {
        if (err) return console.log(err);
        res.json(result[0]);
    });
}

//page 对象添加
module.exports.page.post = function (req, res) {
    Page.create({
        name: req.body.name,
        project: req.body.project,
        time:new Date().format("YYYY-MM-DD hh:mm:ss")
    }, function (err, result) {
        if (err) return console.log(err);
        Project.update(
            {
                '_id':result.project,
            }, 
            {
                '$push':{'pages':{_id:result._id,name:result.name}}
            },
            function (err,result) {
                if (err) return console.log(err)
                res.json(result);
            }
        );
    });
}

//Page 对象删除
module.exports.page.delete = function (req, res) {
    Page.findOneAndRemove({
        _id: req.params.id
    }, function (err,page,result) {
        console.log(page);
        if (err) return console.log(err);
        Project.update(
            {
                '_id':page.project
            }, 
            {
                '$pull':{'pages':{_id:page._id}}
            },
            function (err,result) {
                if (err) return console.log(err)
                res.json(result);
            }
        );
    });
}

//page 对象搜索
module.exports.page.getlist = function (req, res) {
    Page.find(
        {
            project: req.params.id
        },
        function (err, result) {
        if (err) return console.log(err);
        res.json(result);
    });
}

/* project */
//project 对象添加
module.exports.project.post = function (req, res) {
    Project.create({
        name: req.body.name
    }, function (err, project) {
        if (err) return console.log(err);
        Page.create({
            _id: project._id,
            project:project._id,
            name: "工程首页",
            time:new Date().format("YYYY-MM-DD hh:mm:ss")
        }, function (err, result) {
            if (err) return console.log(err);
            res.json(project);
        });
    });
}

//project 对象删除
module.exports.project.delete = function (req, res) {
    Project.findOneAndRemove({
        _id: req.params.id
    }, function (err,project) {
        if (err) return console.log(err);
        console.log(project.pages);
        project.pages.push(req.params.id);
        Page.remove({
            _id:{
                '$in':project.pages
            }
        }, function (err,result) {
            if (err) return console.log(err);
            res.json(result);
        });
    });
}

//project 对象修改
module.exports.project.put = function (req, res) {
    Project.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.params.name
        }
    }, function (err, project) {
        if (err) return console.log(err);
        res.send(project);
    });
}

//project 对象搜索
module.exports.project.getList = function (req, res) {
    Project.find({}, function (err, result) {
        if (err) console.log("project.getList error");
        console.log(result);
        res.json(result);
    });
}

//project 单对象搜索
module.exports.project.get = function (req, res) {
    Project.findOne({
        _id: req.params.id
    }, function (err, result) {
        if (err) return console.log(err);
        res.json(result);
    });
}
/* project */

