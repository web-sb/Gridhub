(function () {
    //init
    var widget = {}; //主模块
    var previous_widget;
    var root = typeof self === 'object' && self.self === self && self ||
        typeof global === 'object' && global.global === global && global ||
        this;

    if (root != null) {
        previous_widget = root.widget;
    }

    var _timer = null; //定时器
    var _cycle = 3000; //默认周期3000ms

    var _driver = null; //页面数据驱动
    var _templet = null; //元件模板库

    var _content = null; //绘制环境
    var _page = null; //页面对象
    var _widgets = null; //元件对象

    var _data = []; //元件数据
    var _pageId = null; //当前页面ID
    var _projectId = null; //当前工程ID

    /*
        获得工程Id
    */
    widget.getProjectId = function () {
        return _projectId
    };

    /*
        获得页面Id
    */
    widget.getPageId = function () {
        return _pageId
    };

    /*
        初始化变量
    */
    var _init = function (pageId, content) {
        console.log("_init");

        _pageId = pageId;
        _content = content;

        if (_templet === null || _driver === null) {
            _templet = templet;
            _driver = driver;
        }

        console.log("_init-templet-" + _templet._number());
        console.log("_init-driver-" + _driver._number());
    };

    /*
        获得页面数据对象
        1、异步获取页面数据对象
        2、赋值page
        3、赋值projectId
        4、调用回调函数
    */
    var _getPage = function (pageId, callback) {
        console.log("_getPage");
        $.ajax({
            url: '/api/pages/' + pageId,
            type: 'GET',
            success: function (page) {
                _page = page;
                _widgets = _page.widgets;
                _projectId = page.projectId;
                console.log("11111" + page.projectId);
                callback();
            }
        });
    };

    /*
        页面填充
        _content ： 页面环境
        _page ： 页面json数据
        _templet ： 元件模板
        1、填充页面
    */
    var _fillPage = function () {
        console.log("_fillPage");
        $("#title").text(_page.title);
        $("#subTitle").text(_page.subTitle);
        for (var w in _widgets) {
            $(_content).append(_templet[_widgets[w].type](_widgets[w].data));
        }
    };


    /*
        定时刷新
    */
    var _update = function () {
        console.log("_update");
        $.ajax({
            url: '/api/datas',
            type: 'PUT',
            success: function (page) {

            }
        });
    };

    /*
        初始化函数
        1、初始化全局变量
        2、初始化页面数据
        3、初始化页面元件
        4、开始刷新
    */
    widget.init = function (pageId, content) {
        console.log("widget.init");

        async.waterfall([
            function (callback) {
                //初始化全局变量
                _init(pageId, content, templet, driver);
                callback(null);
            },
            function (callback) {
                //初始化页面数据
                _getPage(_pageId, _fillPage);
                callback(null);
            }
        ], function (err, result) {
            //开始刷新默认周期3000ms
            widget.start(100);
        });
    };

    /*
        开始刷新
    */
    widget.start = function (s) {
        console.log("widget.start");
        var span = 100;
        if (s)
            span = s;

        setTimeout(function () {
            _update;
            _timer = setInterval(_update, _cycle);
        }, span);

    };

    /*
        停止刷新
    */
    widget.stop = function () {
        console.log("widget.stop");
        clearInterval(_timer);
    };

    /*
        设置刷新周期
    */
    widget.setCycle = function (cycle) {
        console.log("widget.setCycle");
        if (typeof cycle !== 'number')
            return;
        widget.stop();
        _cycle = cycle;
        widget.start();

    };

    //end
    root.widget = widget;

}());
