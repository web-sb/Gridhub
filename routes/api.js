var express = require('express');
var router = express.Router();
var control = require('../control/pageControl.js');

/*
    页面api
    1、搜索页面
    2、按id查找页面
    3、创建页面
    4、更新页面
    5、删除页面
*/
//获得全部pages
router.get('/pages', control.page.getList);

//根据id获得pages
router.get('/pages/:id', control.page.get);

//创建pages
router.post('/pages', control.page.post);

//更新pages
router.put('/pages/:id', control.page.put);

//更新pages
router.delete('/pages/:id', control.page.delete);


/*
    数据api
    1、搜索页面
*/
//更新pages
router.put('/datas/', control.data.put);




//end
module.exports = router;
