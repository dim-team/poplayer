/**
 * 应用于dim(develop in modularization)框架的弹出层组件
 * @author 铁拐李
 * @email JerroldLi@163.com
 * @update 2015.07.14
 */
var AlertTpl = __inline('poplayer-alert.handlebars');
var ConfirmTpl = __inline('poplayer-confirm.handlebars');

var $ = require('$');
var touchType = 'click';

var createAlertTpl = AlertTpl();
var createConfirmTpl = ConfirmTpl();

var Poplayer = {
    showAlert: function(conf) {
        var defaultConf = {
            autoHide: true,
            timeout: 3000,
            isClickHide: true,
            msg: '',
            callback: null
        };

        this.hideAlert();
        var conf = $.extend(defaultConf, conf);
        var html = createAlertTpl(conf);
        var dom = $(html);
        if ($('.notice').length) {
            $('.notice_alert').show();
        } else {
            $('body').append(dom).show().removeAttr('style');
            $('body').find('.notice_alert').show();

        }

        if (conf.isClickHide) {
            $(document).on(touchType, '.notice_alert', function() {
                $('.notice').hide();
                conf.callback && conf.callback();
            });
        }


        if (conf.autoHide) {
            setTimeout(function() {
                $('.notice').hide();
                conf.callback && conf.callback();
            }, conf.timeout);
        }
    },
    hideAlert: function() {
        $('.notice_alert').remove();
    },

    showConfirm: function(conf) {
        var buttons = conf.buttons;
        var creatButtonTpl = '<a href="javascript:void(0);" class="notice_button <%=style%>"><%=text%></a>';

        if (!conf.msg) {
            alert('请输入msg!');
            return false;
        }

        var confirm = $(createConfirmTpl(conf));
        var opera = confirm.find('.notice_opera');

        for (var i = 0, len = buttons.length; i < len; i++) {
            var btnConf = buttons[i];
            var btnTpl = creatButtonTpl(btnConf);
            console.log(btnTpl);
            var btnObj = $(btnTpl);
            btnConf.fun && btnObj.on('click', btnConf.fun);
            opera.append(btnObj);
        }

        $('body').append(confirm);
    },
    hideConfirm: function() {
        $('.notice_confirm').remove();
    },
    destory: function() {
        $('.notice_alert').remove();
        $('.notice_confirm').remove();
    }
};

module.exports = Poplayer;