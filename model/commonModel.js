var mongoose = require('../server/mongo.js');

/****************************analog格式定义****************************/
var analogSchema = mongoose.Schema({
    name: String,
    source: Number,
    time: String
});
module.exports.Analog = mongoose.model('analog', analogSchema);
/****************************./analog格式定义****************************/

/****************************digit格式定义****************************/
var digitSchema = mongoose.Schema({
    name: String,
    source: Number,
    value: Number,
    tInfo: String,
    fInfo: String,
    type: String,
    time: String
});
module.exports.Digit = mongoose.model('digit', digitSchema);
/****************************./digit格式定义****************************/

/****************************bar格式定义****************************/
var barSchema = mongoose.Schema({
    name: String,
    source: Number,
    max: Number,
    color: String,
    time: String
});
module.exports.Bar = mongoose.model('bar', barSchema);
/****************************./bar格式定义****************************/

/****************************info格式定义****************************/
var infoSchema = mongoose.Schema({
    name: String,
    content: String,
    time: String
});
module.exports.Info = mongoose.model('info', infoSchema);
/****************************./info格式定义****************************/

/****************************comment格式定义****************************/
var commentSchema = mongoose.Schema({
    page: String,
    name: String,
    icon: String,
    time: String,
    content: String
});
module.exports.Comment = mongoose.model('comment', commentSchema);
/****************************./comment格式定义****************************/

/****************************page格式定义****************************/
var pageSchema = mongoose.Schema({
    name: String,
    project: String,
    infos: [infoSchema],
    analogs: [analogSchema],
    bars: [barSchema],
    digits: [digitSchema],
    time: String
});
module.exports.Page = mongoose.model('page', pageSchema);
/****************************./page格式定义****************************/

/****************************page格式定义****************************/
var pageIndexSchema = mongoose.Schema({
    name: String,
});
module.exports.PageIndex = mongoose.model('pageIndex', pageIndexSchema);
/****************************./page格式定义****************************/

/****************************project格式定义****************************/
var projectSchema = mongoose.Schema({
    name: String,
    pages: [pageIndexSchema],
    time: String
});
module.exports.Project = mongoose.model('project', projectSchema);
/****************************./project格式定义****************************/

/****************************comment格式定义****************************/
var alarmSchema = mongoose.Schema({
    time: String,
    projectId: String,
    pageId:String,
    digitId:String,
    type:String,
    value:Number,
    info:String,
    digitName:String
});
module.exports.Alarm = mongoose.model('alarm', alarmSchema);
/****************************./comment格式定义****************************/
