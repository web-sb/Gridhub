var templet = {
    _number: function (t) {
        var temp =
            '<div class="box box-solid">' +
            '<div class="box-body">' +
            '<div class="row">';

        for (d in t) {
            temp +=
                '<div class="col-sm-3 col-xs-6">' +
                '<div data-source="' + t[d].source + '" class="analog description-block border-right">' +
                '<h5 class="value description-header">0</h5>' +
                '<span class="description-text">' + t[d].name + '</span>' +
                '</div>' +
                '</div>';
        }

        temp +=
            '</div>' +
            '</div>' +
            '</div>';
        return temp;
    },
    _bool: function (t) {
        var temp =
            '<div class="box box-solid">' +
            '<div class="box-body no-padding">' +
            '<ul id="digitlist" class="nav nav-pills nav-stacked">';

        for (d in t) {
            temp +=
                '<li>' +
                '<a data-source="' + t[d].source + '" data-true="' + t[d].tInfo + '" data-false="' + t[d].fInfo + '" data-type="' + t[d].type + '" class="digit" href="#">' + t[d].name +
                '<span class="value label label-default pull-right">刷新中</span>' +
                '</a>' +
                '</li>';
        }

        temp +=
            '</ul>' +
            '</div>' +
            '</div>';
        return temp;
    },
    _bar: function (t) {
        var temp =
            '<div class="box box-solid">' +
            '<div class="box-body">' +
            '<div class="row">';

        for (d in t) {
            temp +=
                '<div class="col-md-12">' +
                '<div data-source="' + t[d].source + '" data-max="' + t[d].max + '" class="bar progress-group">' +
                '<span class="progress-text">' + t[d].name + '</span>' +
                '<span class="progress-number"><b class="value">0</b>/' + t[d].max + '</span>' +
                '<div class="progress sm">' +
                '<div class="cvalue progress-bar progress-bar-' + t[d].color + '" style="width: 0%"></div>' +
                '</div>' +
                '</div>' +
                '</div>';
        }

        temp +=
            '</div>' +
            '</div>' +
            '</div>';
        return temp;
    },
    _info: function (t) {

        var temp =
            '<div class="box box-solid">' +
            '<div class="box-header with-border">' +
            '<i class="fa fa-file-text-o"></i>' +
            '<h3 class="box-title">描述</h3>' +
            '</div>' +
            '<div class="box-body">' +
            '<dl id="infolist" class="dl-horizontal">';



        for (d in t) {
            temp += '<dt>' + t[d].name + '</dt><dd>' + t[d].content + '</dd>';
        }

        temp +=
            '</div>' +
            '</div>' +
            '</div>';
        return temp;
    }
}
