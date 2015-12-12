module.exports.page = new Object;
module.exports.data = new Object;

/*
    page控制器
*/

//获得全部page
module.exports.page.getList = function (req, res) {
    console.log("page.getlist");
}

//根据id获得page
module.exports.page.get = function (req, res) {
    console.log("page.get");
    var p = {
        title: "页面一",
        subTitle: "页面描述",
        projectId: "123456789",
        widgets: [
            {
                type: "_number",
                data: [
                    {
                        name: "NAME",
                        source: "123",
                        max: "100",
                        min: "0"
                    },
                    {
                        name: "NAME",
                        source: "123",
                        max: "100",
                        min: "0"
                    }
                ]
            },
            {
                type: "_bool",
                data: [
                    {
                        name: "NAME",
                        source: "123",
                        tInfo: "真时显示数据",
                        fInfo: "假时显示数据",
                        type: "danger"
                    }
                ]
            },
            {
                type: "_bar",
                data: [
                    {
                        name: "NAME",
                        source: "123",
                        max: 5,
                        color: "red"
                    }
                ]
            },
            {
                type: "_info",
                data: [
                    {
                        name: "信息条",
                        content: "这是一条信息"
                    }
                ]
            }
        ]
    }
    res.json(p);
}

//创建page
module.exports.page.post = function (req, res) {
    console.log("page.post");
}

//更新page
module.exports.page.put = function (req, res) {
    console.log("page.put");
}

//根据id删除page
module.exports.page.delete = function (req, res) {
    console.log("page.delete");
}

/*
    data控制器
*/
//更新page
module.exports.data.put = function (req, res) {
    console.log("data.put");
}
