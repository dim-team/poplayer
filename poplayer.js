/**
 * 应用于dim(develop in modularization)框架的弹出层组件
 * @author 铁拐李
 * @email JerroldLi@163.com
 * @update 2015.07.14
 */

/*1.显示弹出层提示框
Poplayer.showAlert({msg: '收藏成功'})*/

/*2.显示弹出层确认框
Poplayer.showConfirm({
    msg: '你确定要删除此信息？',
    buttons: [
      {text: '确定',style: 'poplayer-confirm',fun:function(){alert('确定')}},
      {text: '取消',style: 'poplayer-cancel',fun:function(){alert('取消')}}
    ]
});*/

/*3.显示弹出层交互框
Poplayer.showInteract({
    contentHtml: $contentHtml
});*/

var AlertTpl = __inline('poplayer-alert.handlebars');
var ConfirmTpl = __inline('poplayer-confirm.handlebars');
var ButtonTpl = __inline('poplayer-button.handlebars');

var touchType = 'click';

var Poplayer = {
    showAlert: function(conf) {
        var defaultConf = {
            autoHide: true,
            timeout: 3000,
            isClickHide: false,
            msg: '',
            callback: null
        };

        var conf = $.extend(defaultConf, conf);
        var html = AlertTpl(conf);
        var dom = $(html);
        if ($('.poplayer-alert').length) {
            $('.poplayer-alert').show();
        } else {
            $('body').append(dom).show().removeAttr('style');
            $('body').find('.poplayer-alert').show();

        }

        if (conf.isClickHide) {
            $(document).on(touchType, '.poplayer-alert', function() {
                $('.poplayer-alert').fadeOut().remove();
                conf.callback && conf.callback();
            });
        }

        if (conf.autoHide) {
            setTimeout(function() {
                $('.poplayer-alert').fadeOut().remove();
                conf.callback && conf.callback();
            }, conf.timeout);
        }

        this.bindEvents();
    },
    showConfirm: function(conf) {
        var buttons = conf.buttons;

        if (!conf.msg) {
            alert('请输入msg!');
            return false;
        }

        var $confirm = $(ConfirmTpl(conf));
        var opera = $confirm.find('.poplayer-opera');

        for (var i = 0, len = buttons.length; i < len; i++) {
            var btnConf = buttons[i];
            var btnTpl = ButtonTpl(btnConf);
            var btnObj = $(btnTpl);
            btnConf.fun && btnObj.on('click', btnConf.fun);
            opera.append(btnObj);
        }
        $('body').append($confirm);
        $confirm.show();

        this.fixPosition(conf);
        this.bindEvents();
    },
    showInteract: function(conf) {
        var $confirm = $(ConfirmTpl());
        $('body').append($confirm);

        var $contentHtml = $(conf.contentHtml);
        $('.poplayer-content', $confirm).html($contentHtml);

        $confirm.show();
        this.fixPosition(conf);
        this.bindEvents();
    },
    fixPosition: function(conf) {
        var $confirmWrap = $('.confirm-wrap');
        var width = $confirmWrap.width();
        var height = $confirmWrap.height();
        $confirmWrap.css({
            'width': width,
            'height': height,
            'margin-top': - height / 2,
            'margin-left': - width / 2
        });
    },
    destory: function() {
        $('.poplayer').remove();
    },
    bindEvents: function() {
        var _this = this;
        $('.J-poplayer-close').on(touchType, function() {
            _this.destory();
        });
    }
};

module.exports = Poplayer;