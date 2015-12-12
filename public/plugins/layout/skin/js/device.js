var randomScalingFactor = function () {
    return Math.round(Math.random() * 100)
};

var chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "Electronics",
            fillColor: "rgba(210, 214, 222, 1)",
            strokeColor: "rgba(210, 214, 222, 1)",
            pointColor: "rgba(210, 214, 222, 1)",
            pointStrokeColor: "#c1c7d1",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            type: "ems_load",
            data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
                },
        {
            label: "Digital Goods",
            fillColor: "rgba(60,141,188,0.9)",
            strokeColor: "rgba(60,141,188,0.8)",
            pointColor: "#3b8bba",
            pointStrokeColor: "rgba(60,141,188,1)",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(60,141,188,1)",
            type: "ems_load",
            data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
                }
          ]
};

var updateChart = function () {
    var chartCanvas = $(".demo .chartContent");
    for (var i = 0; i < chartCanvas.length; i++) {
        var chart = chartCanvas.get(i).getContext("2d");
        var type = chartCanvas[i].dataset.widget;
        var id = chartCanvas[i].dataset.id;
        $.ajax({
            url: '/api/widget/' + type + "/" + id,
            type: 'GET',
            dataType: "json",
            contentType: "application/json",
            success: function (chartSetting) {
                //            var form = {
                //                id: chartCanvas.data("id"),
                //                type: chartCanvas.data("widget"),
                //                datas: [{
                //                    index: 1,
                //                    type: "analog",
                //                    source: 1065,
                //                    value: []
                //                        }]
                //            }

                if (type === "line") {
                    new Chart(chart).Line(chartData, chartSetting.option);
                } else if (type === "bar") {
                    new Chart(chart).Bar(chartData, chartSetting.option);
                } else if (type === "pie") {
                    new Chart(chart).Pie(chartData, chartSetting.option);
                }
            }
        });
    }
}


var updateCanvasElement = function (type, callback) {

    $.ajax({
        url: '/api/widget/' + type,
        type: 'GET',
        success: function (result) {
            $("#canvasElement").empty();
            for (index in result) {
                var option = "<option value='" + result[index]._id + "'>" + result[index].config.name + "</option>";

                $("#canvasElement").append(option);
            }
            callback;
        }
    });
}



function saveLayout() {
    console.log("saved!");
}

//line 更新Line清单
var updateGraphTemplateList = function () {
    $.ajax({
        url: '/api/graphTemplate',
        type: 'GET',
        success: function (result) {

            $("#graphTemplateList").empty();

            for (var i = 0; i < result.length; i++) {

                var line = "<li class='list-group-item'>" + "<label>" + result[i].name + "</label>" + "<div class='btn-group pull-right' data-id='" + result[i]._id + "'>" + "<button class='btn btn-success btn-xs loadGraphTemplateButton'>载入</button>" + "<button class='btn btn-danger btn-xs deleteGraphTemplateButton'>删除</button>" + "</div>" + "</li>";
                $("#graphTemplateList").append(line);
            }
            $(".deleteGraphTemplateButton").click(deleteGraphTemplateButton);
            $(".loadGraphTemplateButton").click(loadGraphTemplateButton);

        }
    });
    $.ajax({
        url: '/api/graph',
        type: 'GET',
        success: function (result) {

            $("#graphList").empty();

            for (var i = 0; i < result.length; i++) {

                var line = "<li class='list-group-item'>" + "<label>" + result[i].name + "</label>" + "<div class='btn-group pull-right' data-id='" + result[i]._id + "'>" + "<button class='btn btn-danger btn-xs deleteGraphButton'>删除</button>" + "</div>" + "</li>";
                $("#graphList").append(line);
            }
            $(".deleteGraphButton").click(deleteGraphButton);

        }
    });
}

var loadGraphTemplateButton = function () {
    $.ajax({
        url: '/api/graphTemplate/' + $(this).parent().data("id"),
        type: 'GET',
        success: function (result) {
            $("#graphName").val("");
            $(".demo").empty();
            $("#graphTemplateId").val(result._id);
            $("#graphTemplateName").val(result.name);
            $(".demo").html(result.html);
            updateChart();
            alert("载入成功！");
        }
    });
}

var deleteGraphTemplateButton = function () {
    $.ajax({
        url: '/api/graphTemplate/' + $(this).parent().data("id"),
        type: 'DELETE',
        success: function (result) {
            alert(result.message);
            updateGraphTemplateList();
        }
    });
}

var deleteGraphButton = function () {
    $.ajax({
        url: '/api/graph/' + $(this).parent().data("id"),
        type: 'DELETE',
        success: function (result) {
            alert(result.message);
            updateGraphTemplateList();
        }
    });
}


function saveGraphTemplate() {
    var e = "";
    $("#saveGraphTemplateButton").unbind("click").click(function () {
        if ($("#graphTemplateName").val() === "") {
            alert("模板名称不能为空！");
            return;
        }
        if ($("#graphTemplateId").val() === "") {
            alert("请点击新模板按钮创建模板！");
        } else {
            var data = {
                name: $("#graphTemplateName").val(),
                html: $(".demo").html()
            }
            $.ajax({
                url: '/api/graphTemplate/' + $("#graphTemplateId").val(),
                data: data,
                type: 'PUT',
                success: function (result) {
                    alert(result.message);
                }
            });
        }
    });
    $("#createGraphTemplateButton").unbind("click").click(function () {
        if ($("#graphTemplateName").val() === "") {
            alert("图形名称不能为空！");
            return;
        }
        var data = {
            id: $("#graphTemplateId").val(),
            name: $("#graphTemplateName").val(),
            html: $(".demo").html()
        }
        $.ajax({
            url: '/api/graphTemplate',
            type: 'POST',
            data: data,
            success: function (result) {
                $("#graphTemplateId").val(result.graphTemplate._id);
                alert(result.message);
            }
        });

    });
}

function createGraph() {
    $("#createGraphButton").unbind("click").click(function () {
        if ($("#graphName").val() === "") {
            alert("图形名称为空！");
            return;
        }

        var data = {
            template: $("#graphTemplateName").val(),
            name: $("#graphName").val(),
            html: $("#html").val()
        }


        $.ajax({
            url: '/api/graph',
            type: 'POST',
            data: data,
            success: function (result) {
                alert(result.message);
            }
        });

    });
}

function handleSaveLayout() {
    var e = $(".demo").html();
    if (e != window.demoHtml) {
        saveLayout();
        window.demoHtml = e
    }
}

function handleJsIds() {
    handleModalIds();
    handleAccordionIds();
    handleCarouselIds();
    handleTabsIds()
}

function handleAccordionIds() {
    var e = $(".demo #myAccordion");
    var t = randomNumber();
    var n = "panel-" + t;
    var r;
    e.attr("id", n);
    e.find(".panel").each(function (e, t) {
        r = "panel-element-" + randomNumber();
        $(t).find(".panel-title").each(function (e, t) {
            $(t).attr("data-parent", "#" + n);
            $(t).attr("href", "#" + r)
        });
        $(t).find(".panel-collapse").each(function (e, t) {
            $(t).attr("id", r)
        })
    })
}

function handleCarouselIds() {
    var e = $(".demo #myCarousel");
    var t = randomNumber();
    var n = "carousel-" + t;
    e.attr("id", n);
    e.find(".carousel-indicators li").each(function (e, t) {
        $(t).attr("data-target", "#" + n)
    });
    e.find(".left").attr("href", "#" + n);
    e.find(".right").attr("href", "#" + n)
}

function handleModalIds() {
    var e = $(".demo #myModalLink");
    var t = randomNumber();
    var n = "modal-container-" + t;
    var r = "modal-" + t;
    e.attr("id", r);
    e.attr("href", "#" + n);
    e.next().attr("id", n)
}

function handleTabsIds() {
    var e = $(".demo #myTabs");
    var t = randomNumber();
    var n = "tabs-" + t;
    e.attr("id", n);
    e.find(".tab-pane").each(function (e, t) {
        var n = $(t).attr("id");
        var r = "panel-" + randomNumber();
        $(t).attr("id", r);
        $(t).parent().parent().find("a[href=#" + n + "]").attr("href", "#" + r)
    })
}

function randomNumber() {
    return randomFromInterval(1, 1e6)
}

function randomFromInterval(e, t) {
    return Math.floor(Math.random() * (t - e + 1) + e)
}

function gridSystemGenerator() {
    $(".lyrow .preview input").bind("keyup", function () {
        var e = 0;
        var t = "";
        var n = false;
        var r = $(this).val().split(" ", 12);
        $.each(r, function (r, i) {
            if (!n) {
                if (parseInt(i) <= 0) n = true;
                e = e + parseInt(i);
                t += '<div class="col-md-' + i + ' column"></div>'
            }
        });
        if (e == 12 && !n) {
            $(this).parent().next().children().html(t);
            $(this).parent().prev().show()
        } else {
            $(this).parent().prev().hide()
        }
    })
}

function configurationElm(e, t) {
    $(".demo").delegate(".configuration > a", "click", function (e) {
        e.preventDefault();
        var t = $(this).parent().next().next().children();
        $(this).toggleClass("active");
        t.toggleClass($(this).attr("rel"))
    });
    $(".demo").delegate(".configuration .dropdown-menu a", "click", function (e) {
        e.preventDefault();
        var t = $(this).parent().parent();
        var n = t.parent().parent().next().next().children();
        t.find("li").removeClass("active");
        $(this).parent().addClass("active");
        var r = "";
        t.find("a").each(function () {
            r += $(this).attr("rel") + " "
        });
        t.parent().removeClass("open");
        n.removeClass(r);
        n.addClass($(this).attr("rel"))
    })
}

function removeElm() {
    $(".demo").delegate(".remove", "click", function (e) {
        e.preventDefault();
        $(this).parent().remove();
        if (!$(".demo .lyrow").length > 0) {
            clearDemo()
        }
    })
}

function clearDemo() {
    $(".demo").empty()
}

function removeMenuClasses() {
    $("#menu-layoutit li button").removeClass("active")
}

function cleanHtml(e) {
    $(e).parent().append($(e).children().html())
}

function filter(t) {
    t.find(".preview, .configuration, .drag, .remove").remove();

    t.find(".lyrow").addClass("removeClean");

    t.find(".box-element").addClass("removeClean");

    //允许box-element 中包含panel-body的元素嵌套
    //存在需要一个row的激活bug
    t.find(".lyrow .box-element .lyrow .lyrow .lyrow .removeClean").each(function () {
        cleanHtml(this)
    });
    t.find(".lyrow .box-element .lyrow .lyrow .removeClean").each(function () {
        cleanHtml(this)
    });
    t.find(".lyrow .box-element .lyrow .removeClean").each(function () {
        cleanHtml(this)
    });
    t.find(".lyrow .box-element .removeClean").each(function () {
        cleanHtml(this)
    });
    //允许lyrow 中包含column的元素嵌套
    t.find(".lyrow .lyrow .lyrow .lyrow .lyrow .removeClean").each(function () {
        cleanHtml(this)
    });
    t.find(".lyrow .lyrow .lyrow .lyrow .removeClean").each(function () {
        cleanHtml(this)
    });
    t.find(".lyrow .lyrow .lyrow .removeClean").each(function () {
        cleanHtml(this)
    });
    t.find(".lyrow .lyrow .removeClean").each(function () {
        cleanHtml(this)
    });
    t.find(".lyrow .removeClean").each(function () {
        cleanHtml(this)
    });
    t.find(".removeClean").each(function () {
        cleanHtml(this)
    });
    t.find(".panel").children().filter(this); //嵌套标记

}

function downloadLayoutSrc() {
    var e = "";
    $("#download-layout").children().html($(".demo").html());
    var t = $("#download-layout").children();
    filter(t);
    t.find(".removeClean").remove();
    $("#download-layout .column,.panel-body").removeClass("ui-sortable");
    $("#download-layout .row").removeClass("clearfix").children().removeClass("column");
    formatSrc = $.htmlClean($("#download-layout").html(), {
        format: true,
        allowedAttributes: [["id"], ["style"], ["class"], ["data-toggle"], ["data-target"], ["data-id"], ["data-source"], ["data-widget"], ["data-parent"], ["role"], ["data-dismiss"], ["aria-labelledby"], ["aria-hidden"], ["data-slide-to"], ["data-slide"]]
    });
    $("#download-layout").html(formatSrc);
    $("#downloadModal textarea").empty();
    $("#downloadModal textarea").val(formatSrc);
    createGraph();

}
var currentDocument = null;
var timerSave = 2e3;
var demoHtml = $(".demo").html();
$(window).resize(function () {
    $("body").css("min-height", $(window).height() - 90);
    $(".demo").css("min-height", $(window).height() - 160)
});
$(document).ready(function () {
    $(".select2").select2();
    $("#canvasType").change(function () {
        $("#canvasElement").empty();
        updateCanvasElement($(this).children('option:selected').val());
    });


    $(document).bind("contextmenu", function (e) {
        return false;
    });

    $("body").css("min-height", $(window).height() - 90);
    $(".demo").css("min-height", $(window).height() - 160);
    $(".demo, .demo .column .panel-body").sortable({
        connectWith: ".column",
        opacity: .35,
        handle: ".drag"
    });
    $(".sidebar-nav .lyrow").draggable({
        connectToSortable: ".demo,.demo .panel-body",
        helper: "clone",
        handle: ".drag",
        drag: function (e, t) {
            t.helper.width(400)
        },
        stop: function (e, t) {

            $(".demo .column").sortable({
                opacity: .35,
                connectWith: ".column"
            });
            $(".demo .panel-body").sortable({
                opacity: .35,
                connectWith: ".panel-body"
            })

        }
    });

    $(".sidebar-nav .box").draggable({
        connectToSortable: ".column",
        helper: "clone",
        handle: ".drag",
        drag: function (e, t) {
            t.helper.width(400)
        },
        stop: function () {
            handleJsIds();
        }
    });
    //初始化文本编辑对话
    CKEDITOR.disableAutoInline = true;
    var contenthandle = CKEDITOR.replace('contenteditor', {
        language: 'en',

        allowedContent: true
    });
    $('body.edit .demo').on("click", "[data-target=#editorModal]", function (e) {
        e.preventDefault();
        currenteditor = $(this).parent().parent().find('.view');
        var eText = currenteditor.html();
        contenthandle.setData(eText);
    });
    $("#savecontent").click(function (e) {
        e.preventDefault();
        currenteditor.html(contenthandle.getData());
    });


    //初始化canvas编辑对话框
    $('body.edit .demo').on("click", "[data-target=#canvasModal]", function (e) {
        e.preventDefault();
        currentCanvas = $(this).parent().parent().find('.chartContent');
        var canvasId = currentCanvas.data("id");
        var canvasWidget = currentCanvas.data("widget");
        if (canvasId) {
            updateCanvasElement(canvasWidget, function () {
                $("#canvasType").val(canvasWidget);
                $("#canvasElement").val(canvasId);
            });
        } else {
            updateCanvasElement("line", function () {
                $("#canvasType").val("line");
                $("#canvasElement").val("");
            });
        }

    });

    $("#saveCanvas").click(function (e) {
        e.preventDefault();
        var canvasId = $("#canvasElement").children('option:selected').val();
        var canvasWidget = $("#canvasType").children('option:selected').val();
        currentCanvas.attr("data-id", canvasId);
        currentCanvas.attr("data-widget", canvasWidget);
        updateChart();
    });





    $("#downloadhtml").click(function () {
        downloadHtmlLayout();
        return false
    });
    $("[data-target=#downloadModal]").click(function (e) {
        e.preventDefault();
        downloadLayoutSrc()
    });
    $("[data-target=#shareModal]").click(function (e) {
        e.preventDefault();
        saveGraphTemplate();
    });

    $("[data-target=#controlModal]").click(function (e) {
        e.preventDefault();
        updateGraphTemplateList();
    });


    $("#download").click(function () {
        downloadLayout();
        return false
    });
    $("#edit").click(function () {
        $("body").removeClass("devpreview sourcepreview");
        $("body").addClass("edit");
        removeMenuClasses();
        $(this).addClass("active");
        return false
    });
    $("#clear").click(function (e) {
        e.preventDefault();
        clearDemo()
    });
    $("#devpreview").click(function () {
        $("body").removeClass("edit sourcepreview");
        $("body").addClass("devpreview");
        removeMenuClasses();
        $(this).addClass("active");
        return false
    });
    $("#sourcepreview").click(function () {
        $("body").removeClass("edit");
        $("body").addClass("devpreview sourcepreview");
        removeMenuClasses();
        $(this).addClass("active");
        return false
    });
    $(".nav-header").click(function () {
        $(".sidebar-nav .boxes, .sidebar-nav .rows").hide();
        $(this).next().slideDown()
    });
    removeElm();
    configurationElm();
    gridSystemGenerator();
    setInterval(function () {
        handleSaveLayout()
    }, timerSave)
})
